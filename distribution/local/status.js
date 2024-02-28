const http = require('http');
const { fork } = require('child_process');
const { createRPC, toAsync } = require('../util/wire');
const { serialize } = require('../util/serialization')
const id = require('../util/id');

const status = {};

let server; 

global.nodeConfig = global.nodeConfig || {}; 
global.moreStatus = {
  sid: id.getSID(global.nodeConfig),
  nid: id.getNID(global.nodeConfig),
  counts: 0, 
};

status.get = function(configuration, callback) {
  callback = callback || function() {};

  if (configuration in global.nodeConfig) {
    callback(null, global.nodeConfig[configuration]);
  } else if (configuration in global.moreStatus) {
    callback(null, global.moreStatus[configuration]);
  } else if (configuration === 'heapTotal' || configuration === 'heapUsed') {
    const memoryUsage = process.memoryUsage();
    callback(null, memoryUsage[configuration]);
  } else {
    callback(new Error('Status key not found'));
  }
};

// Stop the server
status.stop = function(callback) {
  if (server) {
    server.close(() => {
      console.log('Server stopped');
      if (typeof callback === 'function') {
        callback(null, 'Server stopped successfully');
      }
    });
  } else {
    if (typeof callback === 'function') {
      callback(new Error('Server is not running'));
    }
  }
};

status.spawn = function(conf, callback) {
  console.log("Status spawn")
  // Create an RPC from the callback
  let rpcCallback = toAsync(createRPC(callback));

  // Check if there is an existing onStart function
  if (conf.onStart) {
    console.log("On Start spawn")
      // Save the original onStart
      let originalOnStart = conf.onStart;
      // Create a new function that calls the original onStart and the RPC callback
      conf.onStart = function() {
          originalOnStart.apply(null, arguments);
          rpcCallback.apply(null, arguments);
      };
  } else {
    console.log("On Start spawn else")
      // If no onStart, use the RPC callback directly
      conf.onStart = rpcCallback;
  }

  // Serialize the conf object (simplified for demonstration)
  let serializedConf = serialize(JSON.stringify(conf));

  // Spawn the child process with the modified configuration
  const child = fork('../../distribution.js', [], {
      env: { ...process.env, NODE_CONFIG: serializedConf },
  });

  callback(null, 'Child node has booted.');

  // Listen for the child process to signal it has booted
  child.on('message', (msg) => {
      if (msg === 'booted') {
          console.log('Child node has booted.');
          // Call the original callback, if needed
          callback(null, 'Child node has booted.');
      }
  });

  child.on('error', (err) => {
      console.error('Error spawning child process:', err);
  });

  child.on('exit', (code) => {
      console.log(`Child process exited with code ${code}`);
  });
};

module.exports = status;