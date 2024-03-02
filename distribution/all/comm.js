const distribution = require('../../distribution');
  
const send = (nodeIds, remote, callback) => {
    console.log("RUNNING COMM SEND ALL ***********", callback, remote)
    let responses = { values: {}, errors: {} };
    let responseCount = 0;

    nodeIds.forEach(nodeId => {
        distribution.local.comm.send(nodeId, remote, (error, value) => {
        responseCount++;

        if (error) {
        responses.errors[nodeId] = error;
        } else {
        responses.values[nodeId] = value;
        }

        // Check if all responses have been collected
        if (responseCount === Object.keys.nodeIds.length) {
            handleAllResponses(responses, callback);
        }
    });
    });
};

function handleAllResponses(responses, callback) {
    // Here, you can aggregate responses as needed. The current implementation
    // simply passes the collected values and errors to the callback.
    callback(responses.errors, responses.values);
};

module.exports = { send };
  