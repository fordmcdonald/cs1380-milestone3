const distribution = require('../../distribution');


// In-memory storage for group-to-nodes mapping
const groupNodesMapping = {
    // Example group with its nodes
    // 'mygroup': [{ id: 'node1', ip: '127.0.0.1', port: 8000 }, { id: 'node2', ip: '127.0.0.1', port: 8001 }]
};

// Function to add nodes to a group
function addToGroup(groupName, node) {
    if (!groupNodesMapping[groupName]) {
        groupNodesMapping[groupName] = [];
    }
    groupNodesMapping[groupName].push(node);
}

// Function to remove a node from a group
function removeFromGroup(groupName, nodeId) {
    if (groupNodesMapping[groupName]) {
        groupNodesMapping[groupName] = groupNodesMapping[groupName].filter(node => node.id !== nodeId);
    }
}


// Updated createGroupOperations to manage groupNodesMapping
function createGroupOperations(groupName) {
    return {
        // Method to get group information from all nodes in the group
        get(callback) {
            _sendToGroup(groupName, 'get', null, callback);
        },

        // Method to update group information on all nodes in the group
        put(groupData, callback) {
            // Iterate over groupData object and add each node to the group
            Object.keys(groupData).forEach(nodeID => {
                const nodeData = groupData[nodeID];
                addToGroup(groupName, nodeID, nodeData);
            });
            _sendToGroup(groupName, 'put', groupData, callback);
        },

        // Method to add a node to a group across all nodes in the system
        add(nodeData, callback) {
            console.log("CALLING FACTORY GROUP ADD");
            // Update groupNodesMapping to include the new node
            addToGroup(groupName, nodeData);
            _sendToGroup(groupName, 'add', nodeData, callback);
        },

        // Method to remove a node from a group across all nodes in the system
        rem(nodeId, callback) {
            console.log("CALLING FACTORY GROUP REM");
            // Update groupNodesMapping to remove the specified node
            removeFromGroup(groupName, nodeId);
            _sendToGroup(groupName, 'rem', nodeId, callback);
        },

        // Method to delete a group from all nodes in the system
        del(callback) {
            console.log("CALLING FACTORY GROUP DEL");
            // Remove the group from groupNodesMapping
            delete groupNodesMapping[groupName];
            _sendToGroup(groupName, 'del', null, callback);
        }
    };
}

// Private method to handle communication with the group nodes
function _sendToGroup(groupName, method, data, callback) {
    // Fetch the current list of nodes in the group
    console.log("_sendToGroup")
    const nodes = _fetchNodesInGroup(groupName);
    const results = {};
    let completed = 0;

    nodes.forEach(node => {
        console.log("Sending local comm data per node", node, nodes, distribution.local)
        distribution.local.comm.send({ service: 'groups', method: method, data: data }, node, (err, result) => {
            console.log("Sending local comm data per node", node) 
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
    return groupNodesMapping[groupName] || [];
}

module.exports = createGroupOperations;