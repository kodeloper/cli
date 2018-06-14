import axios from 'axios';
import flatCache from 'flat-cache';
import path from 'path';
const queryString = require('query-string');
const request = require('request-promise');
require('dotenv').config();

const BASE_URL = 'https://api.bitbucket.org/2.0';
const OAUTH2_URL = 'https://bitbucket.org/site/oauth2/access_token';

console.log(path.join(__dirname,'./../../app_cache'));
const cache = flatCache.load('bitbucket', path.join(__dirname,'./../app_cache'));

class BitbucketClient {
    constructor(data = {}) {
        this.owner = data.owner || process.env.BITBUCKET_TEAM;
    }
    getAccessToken(username = null, password = null) {
        this.access_token = cache.getKey('access_token');
        const token_gone = cache.getKey('access_token');
        if (!this.access_token || ( token_gone && token_gone < ( + new Date()))) {
            return this.requestNewToken(username, password);
        } else
            return Promise.resolve(this.access_token);
    }
    requestNewToken(username = null, password = null){
        console.log('new token');
        const key = username || process.env.BITBUCKET_KEY;
        const secret = password || process.env.BITBUCKET_SECRET;
        const buff = new Buffer(`${key}:${secret}`);  
        return request({ 
            method: 'POST',
            url: OAUTH2_URL,
            headers: { 
                authorization: `Basic ${buff.toString('base64')}`,
                'content-type': 'application/x-www-form-urlencoded' 
            },
            form: { 
                grant_type: 'client_credentials' 
            } 
        })
        .then(function (body) {
           cache.removeKey('access_token');
           cache.setKey('access_token', body);
           cache.removeKey('token_gone');
           cache.setKey('token_gone',( + new Date()) + 7200);
           cache.save();
           return body;
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });
    }
    requestGet(url) {
        return this.getAccessToken().then( access_token => {
            const token = JSON.parse(access_token).access_token;
            return axios.get(
                url,
                {
                    headers: {'Authorization': `Bearer ${token}`}
                })
                .then(function (response) {
                    return response;
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }
    getAllRepos(options = {}) {
        const query = `?${queryString.stringify(options)}`;
        return this.requestGet(allReposUrl(this.owner) + query);
    }
    getRepoBranches(repoSlug, options = {}) {
        const query = `?${queryString.stringify(options)}`;
        return this.requestGet(repoBranchesUrl(this.owner, repoSlug) + query);
    }
   
}

const allReposUrl = (owner) => `${BASE_URL}/repositories/${owner}`;
const repoUrl = (owner, repoSlug) => `${allReposUrl(owner)}/${repoSlug}`;
const repoBranchesUrl = (owner, repoSlug) => `${repoUrl(owner, repoSlug)}/refs/branches`;
export default BitbucketClient;