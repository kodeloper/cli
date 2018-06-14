'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var BASE_URL = 'https://api.bitbucket.org/2.0';

var BitbucketClient = function () {
    function BitbucketClient() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, BitbucketClient);

        this.team = data.team || process.env.BITBUCKET_TEAM;
        this.authenticate(data.user, data.password);
    }

    _createClass(BitbucketClient, [{
        key: 'authenticate',
        value: function authenticate() {
            var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            this.user = user || process.env.ATLASSIAN_USER;
            this.password = password || process.env.BITBUCKET_APP_PASSWORD;
        }
    }, {
        key: 'request',
        value: function request(url) {
            var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';

            return _axios2.default.get(url, {
                headers: { 'Authorization': "Bearer " + process.env.BITBUCKET_BEARER }
            }).then(function (response) {
                return response;
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'getRepos',
        value: function getRepos() {
            return this.request(reposUrl(this.team));
        }
    }, {
        key: 'getProjects',
        value: function getProjects() {
            return this.request(reposUrl(this.team));
        }
    }]);

    return BitbucketClient;
}();

var reposUrl = function reposUrl(owner) {
    return BASE_URL + '/repositories/' + owner;
};

exports.default = BitbucketClient;