import JiraApi from 'jira-client';
require('dotenv').config();

const jiraClient = new JiraApi({
    protocol: 'https',
    host: process.env.JIRA_HOST,
    username: process.env.ATLASSIAN_USER,
    password: process.env.ATLASSIAN_TOKEN,
    apiVersion: '2',
    strictSSL: true
});

const jira = ( cmd ) => {
    jiraClient.listProjects().then(
        res => console.log(res)
    );
    
}

export default jira;