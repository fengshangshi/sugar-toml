/**
 * @file sugar-toml
 * @author ss.feng
 */
'use strict'

const strftime = require('strftime');
const type = require('sugar-type');
const toml = require('toml');
const fs = require('fs');

// 读写文件的选项
const options = {
    encoding: 'utf8'
};

// 读取toml文件并转换成json
// callback传入为异步版本
exports.file2json = function(file, callback) {
    // 异步版本
    if (type.isFunction(callback)) {
        return fs.readFile(file, options, (err, source) => {
            callback(err, source);
        });
    }

    // 同步版本
    let source = fs.readFileSync(file, options);
    return exports.toml2json(source);
}

// 将toml格式字符串转成json
exports.toml2json = function(source) {
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

// 把json对象转换成toml格式字符串
exports.json2toml = function(source) {
    var tomlAsString = '';

    // 漫游
    function roam(hash, prefix) {
        let nestedPairs = [];
        let simplePairs = [];

        prefix = prefix || '';

        Object.keys(hash).sort().forEach((key) => {
            let value = hash[key];
            (type.isObject(value) ? nestedPairs : simplePairs).push([key, value]);
        });

        if (!(type.isEmpty(prefix) || type.isEmpty(simplePairs))) {
            tomlAsString += '[' + prefix + ']\n';
        }

        simplePairs.forEach((array) => {
            var key = array[0];
            var value = array[1];

            tomlAsString += key + ' = ' + format(value) + '\n';
        });

        nestedPairs.forEach((array) => {
            var key = array[0];
            var value = array[1];

            roam(value, type.isEmpty(prefix) ? key.toString() : [prefix, key].join('.'));
        });


    }

    roam(source);

    return tomlAsString;
};

// 把json对象转换成toml格式字符串并写入到文件中
// callback传入为异步版本
exports.json2file = function(source, file, callback) {
    let tomlAsString = exports.json2toml(source);

    // 异步版本
    if (type.isFunction(callback)) {
        return fs.writeFile(file, tomlAsString, options, (err) => {
            callback(err);
        });
    }

    // 同步版本
    fs.writeFileSync(file, tomlAsString, options);
};

function format(source) {
    return type.isDate(source) ? strftime('%FT%TZ', source) : JSON.stringify(source);
}
