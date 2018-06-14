'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jiraClient = require('jira-client');

var _jiraClient2 = _interopRequireDefault(_jiraClient);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var jiraClient = new _jiraClient2.default({
    protocol: 'https',
    host: process.env.JIRA_HOST,
    username: process.env.ATLASSIAN_USER,
    password: process.env.ATLASSIAN_TOKEN,
    apiVersion: '2',
    strictSSL: true
});

var JIRA_PROJECT_TYPE = process.env.JIRA_PROJECT_TYPE || 'software';

var JiraCommand = function () {
    function JiraCommand(cmd) {
        _classCallCheck(this, JiraCommand);

        this.answer = {};
    }

    _createClass(JiraCommand, [{
        key: 'start',
        value: function start() {
            this.getProjects();
        }
    }, {
        key: 'getProjects',
        value: function getProjects() {
            var _this = this;

            jiraClient.listProjects().then(function (res) {
                _this.projects = res.filter(function (project) {
                    return project.projectTypeKey === JIRA_PROJECT_TYPE;
                });
                _this.askChooseProject();
            });
        }
    }, {
        key: 'findRapidView',
        value: function findRapidView() {
            console.log(this.project.name);
            jiraClient.findRapidView(this.project.name).then(function (res) {
                console.log(res);
            });
        }
    }, {
        key: 'getAllProjectIssues',
        value: function getAllProjectIssues() {
            jiraClient.searchJira('project = ' + this.project.name, { maxResults: 500 }).then(function (res) {
                console.log(res.issues.map(function (issue) {
                    return issue.fields;
                }));
            });
        }
    }, {
        key: 'askChooseProject',
        value: function askChooseProject() {
            var _this2 = this;

            _inquirer2.default.prompt([{
                type: "list",
                name: "project",
                message: "Choose a project",
                choices: this.projects.map(function (project) {
                    return { name: project.name, value: project.id };
                })
            }]).then(function (answers) {
                _this2.answer = Object.assign({}, _this2.answer, answers);
                console.log(_this2.answer);
                jiraClient.getProject(_this2.answer.project).then(function (res) {
                    _this2.project = res;
                    _this2.getAllProjectIssues();
                });
            });
        }
    }]);

    return JiraCommand;
}();

exports.default = JiraCommand;