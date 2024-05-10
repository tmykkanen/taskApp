/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import Project from './src/Project';
import TodoList from './src/TodoList';
import Task from './src/Task';
import Storage from './src/Storage';

import './style.css';

// BUG Test Data
const todoList = new TodoList();

const ProjParams1 = { name: 'Proj 1' };
const ProjParams2 = { name: 'Proj 2' };
const TaskParams1 = { name: 'Task 1' };
const TaskParams2 = { name: 'Task 2' };

todoList.addProject(new Project(ProjParams1.name));
todoList.addProject(new Project(ProjParams2.name));

const proj1 = todoList.getProject(ProjParams1.name);

proj1.addTask(new Task(TaskParams1.name));
proj1.addTask(new Task(TaskParams2.name));
proj1.addTask(new Task('Third Task', 'This is a description'));

console.log(
  'TodoList Sent to Storage:\n',
  todoList,
);

Storage.saveTodoList(todoList);

const reconstructedTodoList = Storage.getTodoList();

console.log(
  'Reconstructed TodoList:\n',
  reconstructedTodoList,
);

// Utility function
function createHTML(el, cls, txt) {
  const html = document.createElement(el);
  if (cls) html.classList.add(cls);
  html.textContent = txt;
  return html;
}

function assembleTaskList(currentProject, taskContainer) {
  console.log(currentProject);
  const taskList = currentProject.getAllTasks;
  console.log(taskList);
  taskList.forEach((task) => {
    const taskHTML = document.createElement('li');
    taskHTML.classList.add('task-list-item', 'collapsed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = task.name;

    const h3 = document.createElement('h3');
    h3.textContent = task.name;

    // [ ] Add rendering for description

    taskHTML.append(checkbox, h3);

    taskContainer.append(taskHTML);
  });
}
const container = document.querySelector('.main-container ul');
assembleTaskList(proj1, container);

// document.querySelector('.main-container ul')
//   .appendChild(assembledTaskList);
