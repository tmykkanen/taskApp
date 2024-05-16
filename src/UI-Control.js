/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import * as chrono from 'chrono-node';
import { obsAddProjectBtn, obsAddTaskBtn } from './Observers';
import { DATA } from './TodoList';
import Project from './Project';
import Task from './Task';

// SAVE TASK
function handleEditTask(sourceEvent) {
  // get target task

  // get task data / parse task data

  // update task data

  const targetTaskToEdit = DATA.getActiveProject()
    .getTaskByUUID(sourceEvent.target.parentNode.dataset.uuid);

  // Get task data for edit
  const taskData = Array.from(sourceEvent.target.parentNode.getElementsByClassName('task-data'));
  const taskDataParsed = taskData
    .reduce((obj, item) => {
      let value = item.textContent;
      if (item.type === 'checkbox') value = item.checked;
      if (item.type === 'input') value = item.value;
      console.log(value);
      return ({ ...obj, [item.dataset.name]: value });
    }, {});

  // Assign edits
  Object.assign(targetTaskToEdit, taskDataParsed);

  console.log(targetTaskToEdit);
}

function parseDateInput(dateInput) {
  console.log(dateInput);
  const parsedDate = chrono.parseDate(dateInput);
  console.log(chrono.parseDate('tomorrow'));
  return new Date(parsedDate).toLocaleDateString('en', { month: 'numeric', day: 'numeric', year: '2-digit' });
}

export function handleDblClickBeginEditing(e) {
  e.target.contentEditable = true;
}

export function handleDblClickEndEditing(e) {
  if (e.target.dataset.name === 'taskDueDate') {
    e.target.textContent = parseDateInput(e.target.textContent);
  }
  e.target.contentEditable = false;
  handleEditTask(e);
}

export function handleCompleteTaskCheckbox(e) {
  handleEditTask(e);
}

// UTIL
// function addSelfDestructingEventListener(element, currentEl, eventType, callback) {
//   const handler = (e) => {
//     if (!currentEl.contains(e.target)) {
//       callback();
//       element.removeEventListener(eventType, handler);
//       currentEl.dataset.editingActivated = false;
//     }
//   };
//   currentEl.dataset.editingActivated = true;
//   element.addEventListener(eventType, handler);
// }

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
