/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import Project from './Project';

export default class TodoList {
  constructor() {
    this.projectsList = [];
    this.projectsList.push(new Project({ name: 'Inbox' }));
  }

  get projects() {
    return this.projectsList;
  }

  set projects(projectsArray) {
    this.projectsList = projectsArray;
  }

  addProject(newProject) {
    this.projects.push(newProject);
  }

  getProject(name) {
    return this.projects.find((proj) => proj.name === name);
  }

  deleteProject(name) {
    this.projects = this.projects.filter((proj) => proj.name !== name);
  }

  getTaskParentProject(taskName) {
    // const task = this.getTaskFromAllProjects(taskName);
    const project = this.projects
      .filter((proj) => proj.tasks
        .some((task) => task.name === taskName))
      .pop();

    return project;
  }

  getTaskFromAllProjects(taskName) {
    const parentProject = this.getTaskParentProject(taskName);
    const task = parentProject.tasks.find((x) => x.name === taskName);

    return { task, parentProject };
  }

  moveTask(taskName, targetProjectName) {
    // Find Task + Parent project
    const { task, parentProject } = this.getTaskFromAllProjects(taskName);
    const targetProject = this.getProject(targetProjectName);

    targetProject.addTask(task);
    parentProject.deleteTask(taskName);
  }
}
