'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jiraClient = require('jira-client');

var _jiraClient2 = _interopRequireDefault(_jiraClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var jiraClient = new _jiraClient2.default({
    protocol: 'https',
    host: process.env.JIRA_HOST,
    username: process.env.ATLASSIAN_USER,
    password: process.env.ATLASSIAN_TOKEN,
    apiVersion: '2',
    strictSSL: true
});

var jira = function jira(cmd) {
    jiraClient.listProjects().then(function (res) {
        return console.log(res);
    });
};

exports.default = jira;