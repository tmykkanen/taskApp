import Storage from "./Storage";

export default class Task {
  constructor(name, description = false, dueDate = false) {
    this.taskName = name;
    this.taskDescription = description;
    this.taskDueDate = dueDate;
    this.taskComplete = false;
  }

  // [ ] Rename getters and setters
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
