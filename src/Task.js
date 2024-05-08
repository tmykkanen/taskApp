export default class Task {
  constructor({ name, description = false, dueDate = false }) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
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
}
