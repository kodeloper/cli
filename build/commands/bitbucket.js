"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitbucket = require("../helpers/bitbucket");

var _bitbucket2 = _interopRequireDefault(_bitbucket);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bitbucketClient = new _bitbucket2.default();

var PAGE_LEN = 50;

var BitbucketCommand = function () {
    function BitbucketCommand(cmd) {
        _classCallCheck(this, BitbucketCommand);

        this.answer = {};
    }

    _createClass(BitbucketCommand, [{
        key: "start",
        value: function start() {
            this.getAllRepos();
        }
    }, {
        key: "getAllRepos",
        value: function getAllRepos() {
            var _this = this;

            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { pagelen: PAGE_LEN };

            bitbucketClient.getAllRepos(options).then(function (res) {
                var meta = Object.assign({}, res.data, { values: undefined });
                _this.projects = uniqueElements(res.data.values.map(function (repo) {
                    return repo.project;
                }), 'uuid');
                _this.repos = groupBy(res.data.values, function (repo) {
                    return repo.project.uuid;
                });
                if (meta.next) console.error('too much repos');
                return _this.askChooseProject();
            });
        }
    }, {
        key: "getRepoBranches",
        value: function getRepoBranches() {
            var _this2 = this;

            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { pagelen: PAGE_LEN };

            var repoSlug = this.repos[this.answer.project].find(function (repo) {
                return repo.uuid === _this2.answer.repo;
            }).slug;
            bitbucketClient.getRepoBranches(repoSlug, options).then(function (res) {
                var meta = Object.assign({}, res.data, { values: undefined });
                _this2.branches = res.data.values;
                if (meta.next) console.error('too much branches');
                return _this2.askChooseBranch();
            });
        }
    }, {
        key: "askChooseProject",
        value: function askChooseProject() {
            var _this3 = this;

            _inquirer2.default.prompt([{
                type: "list",
                name: "project",
                message: "Choose a project",
                choices: this.projects.map(function (project) {
                    return { name: project.name, value: project.uuid };
                })
            }]).then(function (answers) {
                _this3.answer = Object.assign({}, _this3.answer, answers);
                _this3.askChooseRepo();
            });
        }
    }, {
        key: "askChooseRepo",
        value: function askChooseRepo() {
            var _this4 = this;

            _inquirer2.default.prompt([{
                type: "list",
                name: "repo",
                message: "Choose a repository",
                choices: this.repos[this.answer.project].map(function (repo) {
                    return { name: repo.name, value: repo.uuid };
                })
            }]).then(function (answers) {
                _this4.answer = Object.assign({}, _this4.answer, answers);
                _this4.getRepoBranches();
            });
        }
    }, {
        key: "askChooseBranch",
        value: function askChooseBranch() {
            var _this5 = this;

            _inquirer2.default.prompt([{
                type: "list",
                name: "branch",
                message: "Choose a branch",
                choices: this.branches.map(function (branch) {
                    return branch.name;
                })
            }]).then(function (answers) {
                _this5.answer = Object.assign({}, _this5.answer, answers);
                console.log(_this5.answer);
            });
        }
    }]);

    return BitbucketCommand;
}();

exports.default = BitbucketCommand;
;

var groupBy = function groupBy(items, f) {
    return items.reduce(function (l, e, o, n) {
        var x = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : f(e);
        return (l[x] || (l[x] = [])).push(e), l;
    }, {});
};

var uniqueElements = function uniqueElements(items, prop) {
    return items.filter(function (obj, pos, arr) {
        return arr.map(function (mapObj) {
            return mapObj[prop];
        }).indexOf(obj[prop]) === pos;
    });
};