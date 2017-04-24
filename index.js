/**
 * @file sugar-toml
 * @author ss.feng
 */
'use strict'

const semver = require('semver');
const toml = require('toml');
const fs = require('fs');

exports.load = function(file) {
    let options = semver.lt(process.versions.node, '0.10.0') ? 'utf8' : {
        encoding: 'utf8'
    };

    // 同步读取
    let source = fs.readFileSync(file, options);
    return exports.parse(source);
}

exports.parse = function(source) {
    try {
        return toml.parse(source);
    } catch (e) {
        if (e.line && e.column) {
            throw new Error(
                'Toml compiling error at line ' + e.line +
                ', column ' + e.column + ':' + e.message
            );
        }
        throw e;
    }
}
