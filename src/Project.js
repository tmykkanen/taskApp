export default class Project {
  constructor(
    name,
    description = false,
    dueDate = false,
  ) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.tasks = [];
    this.taskArchive = [];
  }

  get getName() {
    return this.name;
  }

  set setName(name) {
    this.name = name;
  }

  get getDescription() {
    return this.description;
  }

  set setDescription(description) {
    this.description = description;
  }

  get getDueDate() {
    return this.dueDate;
  }

  set setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  get getAllTasks() {
    return this.tasks;
  }

  set setAllTasks(taskArray) {
    this.tasks = taskArray;
  }

  get getTaskArchive() {
    return this.taskArchive;
  }

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  getTask(name) {
    return this.tasks.find((task) => task.getName === name);
  }

  deleteTask(name) {
    this.setAllTasks = this.tasks.filter((task) => task.getName !== name);
  }

  archiveTask(name) {
    this.taskArchive.push(this.getTask(name));
    this.deleteTask(name);
  }
}
