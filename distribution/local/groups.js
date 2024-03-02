const id = require("../util/id");
const fs = require('fs');
const groupsTemplate = require('../all/groups')


const groups = {};

const get = (groupName, callback) => {
    const group = groups[groupName];
    if (group) {
        callback(null, group);
    } else {
        callback(new Error(`Group '${groupName}' not found`), null);
    }
};

const put = (groupName, nodes, callback) => {
    console.log("RUNNING PUT ALL")
    groups[groupName] = nodes;

    global.distribution[groupName] = { groups: groupsTemplate(groupName)}
    callback(null, groups[groupName]);
};

const add = (groupName, node, callback) => {
    if (!groups[groupName]) {
        groups[groupName] = {};
    }

    groups[groupName][id.getSID(node)] = node;
    if (callback) callback(null, `Node added to group '${groupName}'`);
};

const rem = (groupName, nodeSID, callback) => {
    if (groups[groupName] && groups[groupName][nodeSID]) {
        delete groups[groupName][nodeSID];
        if (callback) callback(null, `Node '${nodeSID}' removed from group '${groupName}'`);
    } else {
        if (callback) callback(new Error(`Node '${nodeSID}' not found in group '${groupName}'`), null);
    }
};

const del = (groupName, callback) => {
    if (groups[groupName]) {
        deletedGroup = groups[groupName];
        delete groups[groupName];
        callback(null, deletedGroup);
    } else {
        callback(new Error(`Group '${groupName}' not found`), null);
    }
};


module.exports = { get, put, add, rem, del };