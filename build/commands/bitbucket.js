'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bitbucket = require('../helpers/bitbucket');

var _bitbucket2 = _interopRequireDefault(_bitbucket);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bitbucketClient = new _bitbucket2.default();

var bitbucket = function bitbucket(cmd) {
    var choices = void 0;
    var meta = void 0;
    var repos = void 0;
    bitbucketClient.getRepos().then(function (res) {
        meta = Object.assign({}, res.data, { values: undefined });
        repos = res.data.values;
        console.log({ repos: repos });
        choices = repos.map(function (repo) {
            return { name: repo.name };
        });
    });
};

exports.default = bitbucket;