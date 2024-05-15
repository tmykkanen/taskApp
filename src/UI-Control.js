/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */

import { obsAddProjectBtn, obsAddTaskBtn } from './Observers';
import { DATA } from './TodoList';
import Project from './Project';
import Task from './Task';

export function handleEditOnDblClick(sourceEvent, container, editableElements) {
  const enableEditable = () => {
    container.classList.add('expanded');
    // eslint-disable-next-line no-return-assign, no-param-reassign
    editableElements.forEach((element) => element.contentEditable = true);
  };

  const disableEditable = () => {
    container.classList.remove('expanded');
    // eslint-disable-next-line no-return-assign, no-param-reassign
    editableElements.forEach((element) => element.contentEditable = false);
  };

  const clickAwayCallback = () => {
    disableEditable();
    // call handler to save task
    // eslint-disable-next-line no-use-before-define
    handleEditTask(sourceEvent);
  };

  enableEditable();
  // eslint-disable-next-line no-use-before-define
  addSelfDestructingEventListener(document, container, 'click', clickAwayCallback);
}

// UTIL
function addSelfDestructingEventListener(element, currentEl, eventType, callback) {
  const handler = (e) => {
    if (!currentEl.contains(e.target)) {
      callback();
      element.removeEventListener(eventType, handler);
    }
  };
  element.addEventListener(eventType, handler);
}

// SAVE TASK
export function handleEditTask(sourceEvent) {
  // get target task
  console.log(sourceEvent);

  // get task data / parse task data

  // update task data

  const targetTaskToEdit = DATA.getActiveProject()
    .getTaskByUUID(sourceEvent.target.parentNode.dataset.uuid);

  // Get task data for edit
  const taskData = Array.from(sourceEvent.target.parentNode.getElementsByClassName('task-data'));
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

export function handleCompleteTaskCheckbox(e) {
  handleEditTask(e);

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
