const distribution = require('../../distribution');

// Method to aggregate status from all nodes in a group
const get = (groupName, callback) => {
    this.distribution.groups.comm.send(groupName, { service: 'status', method: 'get' }, (err, results) => {
    if (err) {
        callback(err, null);
    } else {
        // Aggregate results
        const aggregated = { count: 0, heapTotal: 0, heapUsed: 0 };
        Object.values(results).forEach(nodeResult => {
        if (nodeResult && !nodeResult.error) {
            aggregated.count += nodeResult.count;
            aggregated.heapTotal += nodeResult.heapTotal;
            aggregated.heapUsed += nodeResult.heapUsed;
        }
        });
        callback(null, aggregated);
    }
    });
}

// Method to stop all nodes in a group and then stop itself
const stop = (groupName, callback) => {
    distribution.groups.comm.send(groupName, { service: 'status', method: 'stop' }, (err, results) => {
    // Optionally handle the response from stopping nodes
    // Then stop itself
    // Assuming there's a method in `distribution` to stop the current node
    // distribution.stopSelf((stopErr) => {
    //     callback(stopErr, { stopped: true, results });
    // });
    });
}

// Method to spawn a new node and add it to the group
const spawn = (nodeConfig, groupName, callback) => {
    // Assuming there's a method in `distribution` to spawn a new node
    distribution.spawnNode(nodeConfig, (err, newNode) => {
    if (err) {
        callback(err, null);
    } else {
        // Add the new node to the group
        distribution.groups.add(groupName, newNode, (addError, addResult) => {
        callback(addError, { newNode, addResult });
        });
    }
    });
}

module.exports = {spawn, get, stop}
