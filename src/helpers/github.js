import axios from 'axios';

const BASE_URL = 'https://api.github.com/repos';

export class Github {
    constructor(owner, repo){
        this.owner = owner;
        this.repo = repo;
    }
    getRepoAPIUrl() {
        return `${BASE_URL}/${this.owner}/${this.repo}`;
    } 
    getBranchs() {
        return axios.get(this.getRepoAPIUrl() + '/branches')
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}