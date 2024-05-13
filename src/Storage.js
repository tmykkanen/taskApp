/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import Project from './Project';
import Task from './Task';
import TodoList from './TodoList';

export default class Storage {
  static saveTodoList(data) {
    localStorage.setItem('todoList', JSON.stringify(data));
  }

  // Repopulate TodoList Object
  static getTodoList() {
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem('todoList')),
    );

    // Reinstantiate Projects
    todoList.setAllProjects(
      todoList.getAllProjects()
        .map((proj) => Object.assign(new Project({}), proj)),
    );

    // Reinstantiate Task List & Archive on Projects
    todoList.getAllProjects()
      .forEach((proj) => {
        proj.setAllTasks(
          proj.getAllTasks()
            .map((task) => Object.assign(new Task({}), task)),
        );
        proj.setProjectTaskArchive(
          proj.getProjectTaskArchive()
            .map((task) => Object.assign(new Task({}), task)),
        );
      });

    return todoList;
  }
}
