/* eslint-disable */

/*
ATTENTION: This is an obfuscated file. You do not need to understand it.
Do NOT edit this file directly. Use it as a black box.

If you notice any issues with using this file, please contact the TAs.
*/
const _0x273b6d = _0x4938;
(function (_0x31d0b2, _0x23b4e8) {
    const _0x1b1786 = _0x4938, _0x309299 = _0x31d0b2();
    while (!![]) {
        try {
            const _0x4eb85b = parseInt(_0x1b1786(0xeb)) / 0x1 + -parseInt(_0x1b1786(0xe5)) / 0x2 * (-parseInt(_0x1b1786(0xea)) / 0x3) + -parseInt(_0x1b1786(0xe2)) / 0x4 + parseInt(_0x1b1786(0xe6)) / 0x5 * (-parseInt(_0x1b1786(0xed)) / 0x6) + -parseInt(_0x1b1786(0xe9)) / 0x7 * (parseInt(_0x1b1786(0xde)) / 0x8) + parseInt(_0x1b1786(0xe1)) / 0x9 + -parseInt(_0x1b1786(0xe8)) / 0xa * (-parseInt(_0x1b1786(0xe0)) / 0xb);
            if (_0x4eb85b === _0x23b4e8)
                break;
            else
                _0x309299['push'](_0x309299['shift']());
        } catch (_0x3a1530) {
            _0x309299['push'](_0x309299['shift']());
        }
    }
}(_0x5b3f, 0x28647));
const id = require('../util/id');
global[_0x273b6d(0xec)] = new Map();
function _0x5b3f() {
    const _0x15e8f1 = [
        '260848DUvsDB',
        '12QkDTDL',
        '191686xpDIhR',
        'toLocal',
        '306ayVDrB',
        '\x27,\x20method:\x20\x27call\x27};\x0a\x20\x20\x20\x20let\x20message\x20=\x20args;\x0a\x0a\x20\x20\x20\x20distribution.local.comm.send(message,\x20remote,\x20(error,\x20response)\x20=>\x20{\x0a\x20\x20\x20\x20\x20\x20if\x20(error)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20callback(error);\x0a\x20\x20\x20\x20\x20\x20}\x20else\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20callback(null,\x20response);\x0a\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20});\x0a\x20\x20',
        'stringify',
        '64EcjXpt',
        'JQjqB',
        '2028477mxfqQN',
        '334044ssOfaZ',
        '1171312NcoNEr',
        'getID',
        '\x0a\x20\x20\x20\x20const\x20callback\x20=\x20args.pop()\x20||\x20function()\x20{};\x0a\x0a\x20\x20\x20\x20let\x20remote\x20=\x20{node:\x20',
        '40354bifLEM',
        '28505djdMab',
        'exports',
        '40CrsZmw'
    ];
    _0x5b3f = function () {
        return _0x15e8f1;
    };
    return _0x5b3f();
}
function createRPC(_0x5ac5fe) {
    const _0x55c3b4 = _0x273b6d;
    let _0x232849 = id[_0x55c3b4(0xe3)](_0x5ac5fe);
    global['toLocal']['set'](_0x232849, _0x5ac5fe);
    let _0x340c7c = _0x55c3b4(0xe4) + JSON[_0x55c3b4(0xdd)](global['nodeConfig']) + ',\x20service:\x20\x27' + _0x232849 + _0x55c3b4(0xdc);
    return new Function('...args', _0x340c7c);
}
function toAsync(_0x98b960) {
    const _0xa36cc6 = {
        'JQjqB': function (_0x563ae1, _0x5a23, _0x47cd4f) {
            return _0x563ae1(_0x5a23, _0x47cd4f);
        }
    };
    return function (..._0x58bcab) {
        const _0x4ca7bc = _0x4938, _0x36ae81 = _0x58bcab['pop']() || function () {
            };
        try {
            const _0x5e495b = _0x98b960(..._0x58bcab);
            _0xa36cc6[_0x4ca7bc(0xdf)](_0x36ae81, null, _0x5e495b);
        } catch (_0x16e15a) {
            _0x36ae81(_0x16e15a);
        }
    };
}
function _0x4938(_0x146b9d, _0x42fbca) {
    const _0x5b3f49 = _0x5b3f();
    return _0x4938 = function (_0x49389c, _0x159cf2) {
        _0x49389c = _0x49389c - 0xdc;
        let _0x5db2d2 = _0x5b3f49[_0x49389c];
        return _0x5db2d2;
    }, _0x4938(_0x146b9d, _0x42fbca);
}
module[_0x273b6d(0xe7)] = {
    'createRPC': createRPC,
    'toAsync': toAsync
};/* eslint-enable */
