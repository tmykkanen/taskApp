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

    // console.log('in func');
    // console.log(todoList.getAllProjects);
    // todoList.getAllProjects.map((proj) => console.log(proj));
    // console.log(todoList.setAllProjects = []);
    todoList.setAllProjects = todoList.getAllProjects
      .map((project) => {
        console.log(project);
        return todoList.addProject(Object.assign(new Project(), project));
        // return todoList.addProject(new Project({ project }));
      });

    // return new array with all projects as Project classes
    // set new array as projects array on todolist

    return todoList;
  }
}
