// [ ] create task trash bin
export default class Project {
  constructor({
    projectName,
    projectDescription,
    projectDueDate,
    projectActive,
    projectDefault = false,
  } = {}) {
    this.projectName = projectName;
    this.projectDescription = projectDescription;
    this.projectDueDate = projectDueDate;
    this.projectActive = projectActive;
    this.projectDefault = projectDefault;
    this.projectTasks = [];
    this.projectTaskArchive = [];
    this.projectTaskTrash = [];
    this.projectUUID = crypto.randomUUID();
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

  get default() {
    return this.projectDefault;
  }

  get uuid() {
    return this.projectUUID;
  }

  addTask(newTask) {
    this.projectTasks.unshift(newTask);
  }

  getTask(name) {
    if (this.projectTasks.some((x) => x.name === name)) {
      return this.projectTasks.find((task) => task.name === name);
    }
    if (this.projectTaskArchive.some((x) => x.name === name)) {
      return this.projectTaskArchive.find((task) => task.name === name);
    }
    return this.projectTaskTrash.find((task) => task.name === name);
  }

  getTaskByUUID(uuid) {
    return this.projectTasks.find((task) => task.uuid === uuid);
  }

  deleteTask(name) {
    const targetTask = this.getTask(name);

    this.projectTasks = this.projectTasks.filter((task) => task.name !== name);
    this.projectTaskArchive = this.projectTaskArchive.filter((task) => task.name !== name);

    this.projectTaskTrash.push(targetTask);
    targetTask.status = 'deleted';
  }

  undeleteTask(name) {
    const targetTask = this.projectTaskTrash.find((task) => task.name === name);
    this.projectTaskTrash = this.projectTaskTrash.filter((task) => task.name !== name);

    targetTask.status = undefined;
    this.addTask(targetTask);
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
    this.projectTasks = this.projectTasks.filter((task) => task.name !== name);
  }

  unarchiveTask(name) {
    const targetTask = this.projectTaskArchive.find((task) => task.name === name);

    this.projectTaskArchive = this.projectTaskArchive.filter((task) => task.name !== name);

    this.addTask(targetTask);
  }

  getProjectTaskArchive() {
    return this.projectTaskArchive;
  }

  setProjectTaskArchive(archive) {
    this.projectTaskArchive = archive;
  }
}
