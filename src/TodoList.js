export default class TodoList {
  constructor() {
    this.projects = [];
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
