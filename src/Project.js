export default class Project {
  constructor({
    projectName,
    projectDescription = false,
    projectDueDate = false,
    projectActive = false,
    projectDefault = false,
  }) {
    this.projectName = projectName;
    this.projectDescription = projectDescription;
    this.projectDueDate = projectDueDate;
    this.projectActive = projectActive;
    this.projectDefault = projectDefault;
    this.projectTasks = [];
    this.projectTaskArchive = [];
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
    this.projectTasks.push(newTask);
  }

  getTask(name) {
    return this.projectTasks.find((task) => task.name === name);
  }

  getTaskByUUID(uuid) {
    return this.projectTasks.find((task) => task.uuid === uuid);
  }

  // [?] Move tasks and projects to use uuid rather than name
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

  unarchiveTask(name) {
    const taskArchive = this.getProjectTaskArchive();

    const targetTask = taskArchive.filter((task) => task.name === name);

    this.setProjectTaskArchive(
      taskArchive.filter((task) => task.name !== name),
    );

    // index necessary becasue targetTask is an array of one
    this.addTask(targetTask[0]);
  }

  getProjectTaskArchive() {
    return this.projectTaskArchive;
  }

  setProjectTaskArchive(archive) {
    this.projectTaskArchive = archive;
  }
}
