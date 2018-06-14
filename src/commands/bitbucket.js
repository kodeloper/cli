import BitbucketClient from '../helpers/bitbucket';
import inquirer from'inquirer';
const bitbucketClient = new BitbucketClient();


const bitbucket = ( cmd ) => {
    let choices;
    let meta;
    let repos;
    bitbucketClient.getRepos().then(
        res => {
            meta = Object.assign({}, res.data, { values:undefined });
            repos = res.data.values;
            console.log({repos});
            choices = repos.map( repo => ({name: repo.name, value: repo.uuid}));
        }
    );  
}


export default bitbucket;