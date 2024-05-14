/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import './style.css';

import { todoList } from './src/TodoList';
import Project from './src/Project';
import Task from './src/Task';
import UIView from './src/UI-View';
// import Observable from './src/Observable';
import UIControl from './src/UI-Control';
import { observeNewTodos, observeTodoListUpdate } from './src/Observers';

// NOTE BEGIN RENDER


function handleTodoUpdate(data) {
  console.log(data);
  // Refresh view
  UIViewWrapper();
  UIControl.bindOnCheck();
}

observeTodoListUpdate.subcribe(handleTodoUpdate);


// BUG UIControl Helper
function handleAddTodo(data) {
  const task = data[0];
  const proj = data[1];
  const targetProject = todoList.getProject(proj);
  targetProject.addTask(new Task(task));
  // notify todoList updated
  todoList.notify();
}
// [ ] Find home for handlers

observeNewTodos.subcribe(handleAddTodo);

UIControl.run();
UIControl.bindOnCheck();
