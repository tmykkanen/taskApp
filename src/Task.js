// [ ] Update class constructors to use undefined rather than false
export default class Task {
  constructor({ taskName = false, taskDescription = false, taskDueDate = false }) {
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.taskDueDate = taskDueDate;
    this.taskStatus = undefined;
    this.taskUUID = crypto.randomUUID();
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
    return this.taskStatus;
  }

  set status(status) {
    this.taskStatus = status;
  }

  get uuid() {
    return this.taskUUID;
  }
}
