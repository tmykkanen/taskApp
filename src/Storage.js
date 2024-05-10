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

    todoList.setAllProjects = todoList.getAllProjects
      .map((proj) => Object.assign(new Project(), proj));

    todoList.getAllProjects.forEach((proj) => {
      // eslint-disable-next-line no-param-reassign
      proj.setAllTasks = proj.getAllTasks
        .map((task) => Object.assign(new Task(), task));
    });
    return todoList;
  }
}
