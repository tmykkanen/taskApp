/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import './style.css';

import TodoList from './src/TodoList';
import Project from './src/Project';
import Task from './src/Task';
import UIView from './src/UI-View';
// import Observable from './src/Observable';
import UIControl from './src/UI-Control';
import { observeNewTodos } from './src/Observers';

// NOTE TEST DATA
const todoList = new TodoList();

const projParams1 = { projectName: 'Project 1', description: 'Project 1 Desc', dueDate: '5/12/24' };
const projParams2 = { projectName: 'Project 2', description: 'Project 2 Desc', dueDate: '5/9/24' };
const projParams3 = { projectName: 'Project 3' };
todoList.addProject(new Project(projParams1));
todoList.addProject(new Project(projParams2));
todoList.addProject(new Project(projParams3));
const proj1 = todoList.getProject(projParams1.projectName);

const taskParams1 = { taskName: 'Task 1', taskDescription: 'Task 1 Desc', taskDueDate: '5/12/24' };
const taskParams2 = { taskName: 'Task 2', taskDescription: 'Task 2 Desc', taskDueDate: '7/12/24' };
const taskParams3 = { taskName: 'Task 3' };
proj1.addTask(new Task(taskParams1));
proj1.addTask(new Task(taskParams2));
proj1.addTask(new Task(taskParams3));

// NOTE BEGIN RENDER
const taskListHTML = UIView.createTaskList(proj1.getAllTasks());
const taskContainer = document.querySelector('.main-container ul');
UIView.renderList(taskListHTML, taskContainer);
const projectListHTML = UIView.createProjectList(todoList.getAllProjects());
const projectContainer = document.querySelector('.default-projects-container');
UIView.renderList(projectListHTML, projectContainer);

// BUG UIControl Helper
function handleAddTodo(data) {
  console.log(`Handler Notified: ${data}`);
  const task = data[0];
  console.log(task);
  const proj = data[1];
  const targetProject = todoList.getProject(proj);
  targetProject.addTask(new Task(task));
  console.log(todoList);
}

observeNewTodos.subcribe(handleAddTodo);
observeNewTodos.subcribe(UIView.receiveNotification);

UIControl.run();

console.log(todoList.getProject('Project 1'));
