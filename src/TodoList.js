/* eslint-disable no-console */
export default class TodoList {
  constructor() {
    this.projects = [];
  }

  addProject(newProject) {
    this.projects.push(newProject);
  }

  getProject(name) {
    return this.projects.find((project) => project.name === name);
  }

  deleteProject(name) {
    this.projects = this.projects.filter((project) => project.name !== name);
  }

  getAllProjects() {
    return this.projects;
  }

  setAllProjects(projects) {
    this.projects = projects;
  }

  // [ ] Do I need these functions, or should TodoList not interact with project tasks?
  // Consider using https://www.patterns.dev/vanilla/mediator-pattern
  // getTaskParentProject(taskName) {
  //   return this.projects
  //     .filter((project) => project.getAllTasks()
  //       .some((task) => task.name === taskName));
  //   // add .pop() to filter out empty projs?
  // }

  // getTaskFromAllProjects(taskName) {
  //   const parentProject = this.getTaskParentProject(taskName);
  //   const targetTask = parentProject.getAllTasks()
  //     .find((task) => task.name === taskName);
  //   return { targetTask, parentProject };
  // }

  // moveTask(taskName, targetProjectName) {
  //   const { task, parentProject } = this.getTaskFromAllProjects(taskName);
  //   const targetProject = this.getProject(targetProjectName);

  //   targetProject.addTask(task);
  //   parentProject.deleteTask(taskName);
  // }
}
