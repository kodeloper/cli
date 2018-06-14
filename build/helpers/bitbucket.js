'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _flatCache = require('flat-cache');

var _flatCache2 = _interopRequireDefault(_flatCache);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var queryString = require('query-string');
var request = require('request-promise');
require('dotenv').config();

var BASE_URL = 'https://api.bitbucket.org/2.0';
var OAUTH2_URL = 'https://bitbucket.org/site/oauth2/access_token';

console.log(_path2.default.join(__dirname, './../../app_cache'));
var cache = _flatCache2.default.load('bitbucket', _path2.default.join(__dirname, './../app_cache'));

var BitbucketClient = function () {
    function BitbucketClient() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, BitbucketClient);

        this.owner = data.owner || process.env.BITBUCKET_TEAM;
    }

    _createClass(BitbucketClient, [{
        key: 'getAccessToken',
        value: function getAccessToken() {
            var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            this.access_token = cache.getKey('access_token');
            var token_gone = cache.getKey('access_token');
            if (!this.access_token || token_gone && token_gone < +new Date()) {
                return this.requestNewToken(username, password);
            } else return Promise.resolve(this.access_token);
        }
    }, {
        key: 'requestNewToken',
        value: function requestNewToken() {
            var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            console.log('new token');
            var key = username || process.env.BITBUCKET_KEY;
            var secret = password || process.env.BITBUCKET_SECRET;
            var buff = new Buffer(key + ':' + secret);
            return request({
                method: 'POST',
                url: OAUTH2_URL,
                headers: {
                    authorization: 'Basic ' + buff.toString('base64'),
                    'content-type': 'application/x-www-form-urlencoded'
                },
                form: {
                    grant_type: 'client_credentials'
                }
            }).then(function (body) {
                cache.removeKey('access_token');
                cache.setKey('access_token', body);
                cache.removeKey('token_gone');
                cache.setKey('token_gone', +new Date() + 7200);
                cache.save();
                return body;
            }).catch(function (err) {
                console.log(err);
                return err;
            });
        }
    }, {
        key: 'requestGet',
        value: function requestGet(url) {
            return this.getAccessToken().then(function (access_token) {
                var token = JSON.parse(access_token).access_token;
                return _axios2.default.get(url, {
                    headers: { 'Authorization': 'Bearer ' + token }
                }).then(function (response) {
                    return response;
                }).catch(function (error) {
                    console.log(error);
                });
            });
        }
    }, {
        key: 'getAllRepos',
        value: function getAllRepos() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var query = '?' + queryString.stringify(options);
            return this.requestGet(allReposUrl(this.owner) + query);
        }
    }, {
        key: 'getRepoBranches',
        value: function getRepoBranches(repoSlug) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var query = '?' + queryString.stringify(options);
            return this.requestGet(repoBranchesUrl(this.owner, repoSlug) + query);
        }
    }]);

    return BitbucketClient;
}();

var allReposUrl = function allReposUrl(owner) {
    return BASE_URL + '/repositories/' + owner;
};
var repoUrl = function repoUrl(owner, repoSlug) {
    return allReposUrl(owner) + '/' + repoSlug;
};
var repoBranchesUrl = function repoBranchesUrl(owner, repoSlug) {
    return repoUrl(owner, repoSlug) + '/refs/branches';
};
exports.default = BitbucketClient;