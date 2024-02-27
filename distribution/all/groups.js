const distribution = require('../../distribution');

// Method to get group information from all nodes in the group
const get = (groupName, callback) => {
    _sendToGroup(groupName, 'get', null, callback);
}

// Method to update group information on all nodes in the group
// const put = (groupName, groupData, callback) => {
//     console.log("Entering PUT method"); // Debug log
//     console.log("CALLING GROUP PUT");
//     _sendToGroup(groupName, 'put', groupData, callback);
// }

const put = (groupName, groupData, callback) => {
    console.log("Entering PUT method");
    callback(null, { message: "PUT method executed with simplified logic" });
}

// Method to add a node to a group across all nodes in the system
const add = (groupName, nodeData, callback) => {
    _sendToGroup(groupName, 'add', nodeData, callback);
};

// Method to remove a node from a group across all nodes in the system
const rem = (groupName, nodeId, callback) => {
    _sendToGroup(groupName, 'rem', nodeId, callback);
};

// Method to delete a group from all nodes in the system
const del = (groupName, callback) => {
    _sendToGroup(groupName, 'del', null, callback);
};
// Private method to handle communication with the group nodes
function _sendToGroup(groupName, method, data, callback) {
    // Fetch the current list of nodes in the group
    const nodes = _fetchNodesInGroup(groupName);
    const results = {};
    let completed = 0;

    nodes.forEach(node => {
    // Assuming `distribution.local.groups[method]` is the way to call the method locally
    // on a node. Adjust this to your system's method of node communication.
    distribution.local.comm.send(node, { service: 'groups', method: method, data: data }, (err, result) => {
        results[node.id] = err ? { error: err } : result;
        completed++;
        if (completed === nodes.length) {
        callback(null, results);
        }
    });
    });
}

// Helper method to fetch nodes for a given group name
function _fetchNodesInGroup(groupName) {
    // Implement logic to retrieve the list of nodes belonging to 'groupName'
    // This might involve querying a local or central repository of group information
    // For simplicity, this could return an array of node identifiers or addresses
    return []; // Placeholder, replace with actual logic
}


module.exports = { get, put, add, rem, del};