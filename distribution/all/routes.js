const distribution = require('../../distribution');

// Method to add a route to all nodes in a group
const put = (groupName, routePath, routeHandler, callback) => {
    // Define the payload for the route addition
    const payload = {
    service: 'routes',
    method: 'put',
    args: [routePath, routeHandler]
    };

    // Send the payload to all nodes in the group to add the route
    distribution.groups.comm.send(groupName, payload, (err, results) => {
    if (err) {
        callback(err, null);
    } else {
        // Aggregate results or simply return a success indicator
        callback(null, results);
    }
    });
}

module.exports = { put }
  