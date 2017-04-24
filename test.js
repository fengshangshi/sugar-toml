var assert = require('assert');
var toml = require('./index.js');

var data = toml.load('./example.toml');
var expected = {
    is_intercept_error: true,
    error_page: {
        404: '/404.html',
        500: '/500.html'
    },
    server: {
        name: 'sugar 2.0',
        port: '8080'
    },
    monitor: {
        enabled: true,
        port: 2013,
        host: 'qmon-beta.corp.qunar.com',
        prefix: 's.sp.fore.market'
    },
    log: {
        enabled: true,
        level: 1,
        log_name: 'app_yyyy-MM-dd.log',
        root: '/logs/app'
    },
    ral: {
        ral_config_name_1: {
            type: 'http',
            method: 'GET',
            timeout: 10,
            retry: 2
        },
        ral_config_name_2: {
            type: 'http',
            method: 'GET',
            timeout: 10,
            retry: 2
        },
    },
    view: {
        root: '/view',
        engine: 'ejs'
    },
    static: {
        root: '/static'
    },
    database: {}
};

assert.deepEqual(data, expected);
