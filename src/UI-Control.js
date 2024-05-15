/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */

import { obsAddProjectBtn, obsAddTaskBtn } from './Observers';
import { DATA } from './TodoList';
import Project from './Project';
import Task from './Task';

export function handleAddProjectModal(e) {
  e.preventDefault();
  const addProjectForm = document.querySelector('.add-project-modal form');
  const formData = Array.from(addProjectForm.getElementsByClassName('input'));
  const formDataParsed = formData.reduce((obj, item) => ({ ...obj, [item.name]: item.value }), {});

  DATA.addProject(new Project(formDataParsed));

  obsAddProjectBtn.notify();
}

export function handleAddTaskModal(e) {
  e.preventDefault();
  const addTaskForm = document.querySelector('.add-task-modal form');
  const formData = Array.from(addTaskForm.getElementsByClassName('input'));
  const formDataParsed = formData.reduce((obj, item) => ({ ...obj, [item.name]: item.value }), {});

  DATA.getActiveProject().addTask(new Task(formDataParsed));

  obsAddTaskBtn.notify();
}
