/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import Storage from './Storage';
import Project from './Project';
import Task from './Task';

/* eslint-disable no-console */
export class TodoList {
  constructor() {
    this.projects = [];
  }

  addProject(newProject) {
    this.projects.push(newProject);
  }

  getProject(name) {
    return this.projects.find((project) => project.name === name);
  }

  getProjectByUUID(uuid) {
    return this.projects.find((project) => project.uuid === uuid);
  }

  deleteProject(name) {
    this.projects = this.projects.filter((project) => project.name !== name);
  }

  getAllProjects() {
    return this.projects;
  }

  setAllProjects(projects) {
    this.projects = projects;
  }

  getActiveProject() {
    return this.projects.find((project) => project.active === true);
  }

  getItemByUUID(obj, uuid) {
    // Get flattened object
    const flatObj = Object.values(obj).flat();

    const checkforTarget = flatObj.filter((value) => value === uuid);

    if (checkforTarget.length === 1) {
      return obj;
    }

    return flatObj.reduce((acc, val) => {
      if (acc !== undefined) return acc;
      if (typeof val === 'object') return this.getItemByUUID(val, uuid);
      return undefined;
    }, undefined);
  }

  // [?] Do I need these functions, or should TodoList not interact with project tasks?
  // Consider using https://www.patterns.dev/vanilla/mediator-pattern
  // getTaskParentProject(taskName) {
  //   return this.projects
  //     .filter((project) => project.getAllTasks()
  //       .some((task) => task.name === taskName));
  //   // add .pop() to filter out empty projs?
  // }

  // getTaskFromAllProjects(taskName) {
  //   const parentProject = this.getTaskParentProject(taskName);
  //   const targetTask = parentProject.getAllTasks()
  //     .find((task) => task.name === taskName);
  //   return { targetTask, parentProject };
  // }

  // moveTask(taskName, targetProjectName) {
  //   const { task, parentProject } = this.getTaskFromAllProjects(taskName);
  //   const targetProject = this.getProject(targetProjectName);

  //   targetProject.addTask(task);
  //   parentProject.deleteTask(taskName);
  // }
}

// DATA
export const DATA = Storage.getTodoList();
// export const DATA = new TodoList();
// const projParams1 = { projectName: 'Project 1', projectDescription: 'Project 1 Desc', projectDueDate: '5/12/24' };
// const projParams2 = { projectName: 'Project 2', projectDescription: 'Project 2 Desc', projectDueDate: '5/9/24' };
// const projParams3 = { projectName: 'Project 3' };
// const inboxParams = { projectName: 'Inbox', projectDefault: true };
// DATA.addProject(new Project(projParams1));
// DATA.addProject(new Project(projParams2));
// DATA.addProject(new Project(projParams3));
// DATA.addProject(new Project(inboxParams));
// const proj1 = DATA.getProject(projParams1.projectName);
// proj1.active = true;

// const taskParams1 = { taskName: 'Task 1', taskDescription: 'Task 1 Desc', taskDueDate: '5/12/24' };
// const taskParams2 = { taskName: 'Task 2', taskDescription: 'Task 2 Desc', taskDueDate: '7/12/24' };
// const taskParams3 = { taskName: 'Task 3' };
// proj1.addTask(new Task(taskParams1));
// proj1.addTask(new Task(taskParams2));
// proj1.addTask(new Task(taskParams3));

// SUBSCRIPTIONS
