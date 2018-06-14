import axios from 'axios';
require('dotenv').config();

const BASE_URL = 'https://api.bitbucket.org/2.0';

class BitbucketClient {
    constructor(data = {}) {
        this.team = data.team || process.env.BITBUCKET_TEAM;
        this.authenticate(data.user, data.password);
    }
    authenticate(user = null, password = null) {
        this.user = user || process.env.ATLASSIAN_USER;
        this.password = password || process.env.BITBUCKET_APP_PASSWORD;
    }
    request(url, method = 'get') {
        return axios.get(
            url,
            {
                headers: {'Authorization': "Bearer " + process.env.BITBUCKET_BEARER}
            })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getRepos() {
        return this.request(reposUrl(this.team));
    }
    getProjects(){
        return this.request(reposUrl(this.team));
    }
   
}

const reposUrl = (owner) => `${BASE_URL}/repositories/${owner}`;

export default BitbucketClient;