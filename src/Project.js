export default class Project {
  constructor(name, description = false, dueDate = false) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.tasks = [];
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

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  getTask(name) {
    return this.tasks.find((task) => task.name === name);
  }

  get getAllTasks() {
    return this.tasks;
  }
}
