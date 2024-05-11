export default class Project {
  constructor(
    name,
    description = false,
    dueDate = false,
  ) {
    this.projectName = name;
    this.projectDescription = description;
    this.projectDueDate = dueDate;
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

  get tasks() {
    return this.projectTasks;
  }

  set tasks(taskArray) {
    this.projectTasks = taskArray;
  }

  get taskArchive() {
    return this.projectTaskArchive;
  }

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  getTask(name) {
    return this.tasks.find((task) => task.name === name);
  }

  deleteTask(name) {
    this.tasks = this.tasks.filter((task) => task.name !== name);
  }

  archiveTask(name) {
    this.taskArchive.push(this.getTask(name));
    this.deleteTask(name);
  }
}
