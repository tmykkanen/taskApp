/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */

import { obsAddProjectBtn, obsAddTaskBtn } from './Observers';
import { DATA } from './TodoList';
import Project from './Project';
import Task from './Task';

export function handleCompleteTaskCheckbox(e) {
  // [ ] Merge checkbox handler with edit task handler
  // NOTE Accidentally wrote handler for whole task edit
  handleEditTask(e);
}

export function handleEditTask(e) {
  // [ ] Hook up to handle edit on double click

  const targetTaskToEdit = DATA.getActiveProject()
    .getTaskByUUID(e.target.parentNode.dataset.uuid);

  // Get task data for edit
  const taskData = Array.from(e.target.parentNode.getElementsByClassName('task-data'));
  const taskDataParsed = taskData
    .reduce((obj, item) => {
      const value = item.type === 'checkbox' ? item.checked : item.textContent;
      return ({ ...obj, [item.dataset.name]: value });
    }, {});

  // Assign edits
  Object.assign(targetTaskToEdit, taskDataParsed);

  console.log(targetTaskToEdit);

  // [ ] notify observer for checkbox css class
  //    [ ] Write checkbox css class toggle function in UI View
  // [ ] rerender task item
}

export function handleSetDueDateBtn() {
  // [ ] Write handler
  console.log('set due date button handler needed');
}

export function handleAddProjectModal(e) {
  e.preventDefault();
  const addProjectForm = document.querySelector('.add-project-modal form');
  const formData = Array.from(addProjectForm.getElementsByClassName('input'));
  const formDataParsed = formData
    .reduce((obj, item) => ({ ...obj, [item.dataset.name]: item.value }), {});

  DATA.addProject(new Project(formDataParsed));

  obsAddProjectBtn.notify();
}

export function handleAddTaskModal(e) {
  e.preventDefault();
  const addTaskForm = document.querySelector('.add-task-modal form');
  const formData = Array.from(addTaskForm.getElementsByClassName('input'));
  const formDataParsed = formData
    .reduce((obj, item) => ({ ...obj, [item.dataset.name]: item.value }), {});

  DATA.getActiveProject().addTask(new Task(formDataParsed));

  obsAddTaskBtn.notify();
}
