/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import TodoList from './TodoList';
import Project from './Project';
import Task from './Task';

export default class Storage {
  static saveTodoList(data) {
    localStorage.setItem('todoList', JSON.stringify(data));
  }

  static getTodoList() {
    // New TodoList from localstorage
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem('todoList')),
    );

    todoList.projects = todoList.projects
      .map((proj) => Object.assign(new Project(), proj));

    todoList.projects.forEach((proj) => {
      // eslint-disable-next-line no-param-reassign
      proj.tasks = proj.tasks
        .map((task) => Object.assign(new Task(), task));
    });
    return todoList;
  }

  static init() {
    if (localStorage.length !== 0) {
      return this.getTodoList();
    }

    const todoList = new TodoList();
    todoList.addProject(new Project('Inbox'));
    this.saveTodoList(todoList);
    return todoList;
  }
}
