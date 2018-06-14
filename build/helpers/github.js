'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Github = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BASE_URL = 'https://api.github.com/repos';

var Github = exports.Github = function () {
    function Github(owner, repo) {
        _classCallCheck(this, Github);

        this.owner = owner;
        this.repo = repo;
    }

    _createClass(Github, [{
        key: 'getRepoAPIUrl',
        value: function getRepoAPIUrl() {
            return BASE_URL + '/' + this.owner + '/' + this.repo;
        }
    }, {
        key: 'getBranchs',
        value: function getBranchs() {
            return _axios2.default.get(this.getRepoAPIUrl() + '/branches').then(function (response) {
                return response;
            }).catch(function (error) {
                console.log(error);
            });
        }
    }]);

    return Github;
}();