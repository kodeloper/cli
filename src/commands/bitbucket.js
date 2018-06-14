import BitbucketClient from "../helpers/bitbucket";
import inquirer from "inquirer";
const bitbucketClient = new BitbucketClient();


const PAGE_LEN = 50;

export default class BitbucketCommand {
    constructor(cmd) {
        this.answer = {};
    };
    start() {
        this.getAllRepos();
    }
    getAllRepos(options = { pagelen: PAGE_LEN }) {
        bitbucketClient.getAllRepos(options).then(res => {
            const meta = Object.assign({}, res.data, { values: undefined });
            this.projects = uniqueElements(res.data.values.map(repo => repo.project), 'uuid');
            this.repos = groupBy(res.data.values, (repo) => repo.project.uuid);
            if (meta.next) 
                console.error('too much repos');
            return this.askChooseProject();
        });
    };
    getRepoBranches(options = { pagelen: PAGE_LEN }) {
        const repoSlug = this.repos[this.answer.project].find(repo => repo.uuid === this.answer.repo).slug;
        bitbucketClient.getRepoBranches(repoSlug, options).then(res => {
            const meta = Object.assign({}, res.data, { values: undefined });
            this.branches = res.data.values;
            if (meta.next) 
                console.error('too much branches');
            return this.askChooseBranch();
        });
    };
    askChooseProject() {
        inquirer
        .prompt([
            {
            type: "list",
            name: "project",
            message: "Choose a project",
            choices: this.projects
                .map(project => ({ name: project.name, value: project.uuid })),
            },
        ])
        .then(answers => {
            this.answer = Object.assign({}, this.answer, answers);
            this.askChooseRepo();
        });
    };

    askChooseRepo() {
        inquirer
        .prompt([
            {
            type: "list",
            name: "repo",
            message: "Choose a repository",
            choices: this.repos[this.answer.project].map(repo => ({ name: repo.name, value: repo.uuid })),
            },
        ])
        .then(answers => {
            this.answer = Object.assign({}, this.answer, answers);
            this.getRepoBranches();
        });
    };

    askChooseBranch() {
        inquirer
        .prompt([
            {
            type: "list",
            name: "branch",
            message: "Choose a branch",
            choices: this.branches
                .map(branch => branch.name),
            },
        ])
        .then(answers => {
            this.answer = Object.assign({}, this.answer, answers);
            console.log(this.answer);
        });
    };
};

const groupBy = (items , f) => {
    return items.reduce((l, e, o, n, x = f(e)) => ((l[x] || (l[x] = [])).push(e), l), {});
};

const uniqueElements = (items, prop) => {
    return items.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
};
