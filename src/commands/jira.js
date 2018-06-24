import JiraApi from 'jira-client';
import inquirer from "inquirer";
require('dotenv').config();

const jiraClient = new JiraApi({
    protocol: 'https',
    host: process.env.JIRA_HOST,
    username: process.env.ATLASSIAN_USER,
    password: process.env.ATLASSIAN_TOKEN,
    apiVersion: '2',
    strictSSL: true
});

const JIRA_PROJECT_TYPE = process.env.JIRA_PROJECT_TYPE || 'software';
export default class JiraCommand {
    constructor(cmd) {
        this.answer = {};
    };
    start() {
        this.getProjects();
    }
    getProjects(){
        jiraClient.listProjects()
        .then(
            res => {
                this.projects = res
                .filter(project => project.projectTypeKey === JIRA_PROJECT_TYPE);
                this.askChooseProject();
            }
        );
    }
    getBoards(){
        jiraClient.doRequest(jiraClient.makeRequestHeader(jiraClient.makeAgileUri({
            pathname: '/board',
            query: {
              startAt: 0,
              maxResults: 100,
            }
        }))).then(
            res => {
                console.log(res);
            }
        );
    }
    findRapidView() {
        console.log(this.project.name);
        jiraClient.findRapidView(this.project.name)
            .then(
                res => {
                    console.log(res);
                }
            );
    }
    getAllProjectIssues() {
        jiraClient.searchJira(`project = ${this.project.name}`, {maxResults: 500})
            .then(
                res => {
                    console.log(res.issues.map(issue => issue.fields));
                    res.issues.map(issue => console.log(
                        {   
                            id: issue.id,
                            code: issue.fields.customfield_10008,
                            title: issue.fields.summary,
                            assigne: issue.fields.assigne,
                            priority: issue.fields.priority,
                            status: issue.fields.status,
                            type: issue.fields.type,
                            creator: issue.fields.creator,
                            key: issue.key,
                            created_at: issue.fields.created,
                            updated_at: issue.fields.updated,      
                        }
                    ));
                    this.getBoards();
                }
            );
    }
    askChooseProject() {
        inquirer
        .prompt([
            {
            type: "list",
            name: "project",
            message: "Choose a project",
            choices: this.projects
                .map(project => ({ name: project.name, value: project.id })),
            },
        ])
        .then(answers => {
            this.answer = Object.assign({}, this.answer, answers);
            console.log(this.answer);
            jiraClient.getProject(this.answer.project)
                .then( res => {
                    this.project = res;
                    this.getAllProjectIssues();
                });
            
        });
    };

    
}