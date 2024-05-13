export default class Task {
  constructor({ taskName = false, taskDescription = false, taskDueDate = false }) {
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.taskDueDate = taskDueDate;
    this.taskComplete = false;
  }

  get name() {
    return this.taskName;
  }

  set name(name) {
    this.taskName = name;
  }

  get description() {
    return this.taskDescription;
  }

  set description(description) {
    this.taskDescription = description;
  }

  get dueDate() {
    return this.taskDueDate;
  }

  set dueDate(dueDate) {
    this.taskDueDate = dueDate;
  }

  get status() {
    return this.taskComplete;
  }

  set status(status) {
    this.taskComplete = status;
  }
}
