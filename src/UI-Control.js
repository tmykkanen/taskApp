/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import * as chrono from 'chrono-node';
import { obsAddProjectBtn, obsAddTaskBtn } from './Observers';
import { DATA } from './TodoList';
import Project from './Project';
import Task from './Task';

// [ ] Test Case - Use Chrono to parse natural language input in date input.
// [ ] hide input box with css
const parsedText = chrono.parseDate('This Sunday');
console.log(parsedText);
const dateParsed = new Date(parsedText).toLocaleDateString();
console.log(dateParsed);

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
      currentEl.dataset.editingActivated = false;
    }
  };
  currentEl.dataset.editingActivated = true;
  element.addEventListener(eventType, handler);
}

// SAVE TASK
export function handleEditTask(sourceEvent) {
  // get target task

  // get task data / parse task data

  // update task data

  const targetTaskToEdit = DATA.getActiveProject()
    .getTaskByUUID(sourceEvent.target.parentNode.dataset.uuid);

  // Get task data for edit
  const taskData = Array.from(sourceEvent.target.parentNode.getElementsByClassName('task-data'));
  console.log(taskData);
  // BUG Calendar Not updating date input - need to retreive data at separate time
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

  // [ ] rerender task item
}

export function handleCompleteTaskCheckbox(e) {
  handleEditTask(e);
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
