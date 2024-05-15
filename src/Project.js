export default class Project {
  constructor({
    projectName,
    projectDescription = false,
    projectDueDate = false,
    projectActive = false,
  }) {
    this.projectName = projectName;
    this.projectDescription = projectDescription;
    this.projectDueDate = projectDueDate;
    this.projectActive = projectActive;
    this.projectTasks = [];
    this.projectTaskArchive = [];
  }

  get name() {
    return this.projectName;
  }

  set name(name) {
    this.projectName = name;
  }

  get description() {
    return this.projectDescription;
  }

  set description(description) {
    this.projectDescription = description;
  }

  get dueDate() {
    return this.projectDueDate;
  }

  set dueDate(dueDate) {
    this.projectDueDate = dueDate;
  }

  get active() {
    return this.projectActive;
  }

  set active(bol) {
    this.projectActive = bol;
  }

  addTask(newTask) {
    this.projectTasks.push(newTask);
  }

  getTask(name) {
    return this.projectTasks.find((task) => task.name === name);
  }

  getTaskByUUID(uuid) {
    return this.projectTasks.find((task) => task.uuid === uuid);
  }

  deleteTask(name) {
    this.projectTasks = this.projectTasks.filter((task) => task.name !== name);
  }

  getAllTasks() {
    return this.projectTasks;
  }

  setAllTasks(tasks) {
    this.projectTasks = tasks;
  }

  archiveTask(name) {
    this.projectTaskArchive.push(
      this.getTask(name),
    );
    this.deleteTask(name);
  }

  getProjectTaskArchive() {
    return this.projectTaskArchive;
  }

  setProjectTaskArchive(archive) {
    this.projectTaskArchive = archive;
  }
}
