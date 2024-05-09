/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import Project from './Project';

export default class TodoList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project('Inbox'));
  }

  addProject(newProject) {
    this.projects.push(newProject);
  }

  getProject(name) {
    return this.projects.find((proj) => proj.name === name);
  }

  get getAllProjects() {
    return this.projects;
  }

  deleteProject(name) {
    this.projects = this.projects.filter((proj) => proj.name !== name);
  }
}
