/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import * as chrono from 'chrono-node';
import { obsAddProjectBtn, obsAddTaskBtn } from './Observers';
import { DATA } from './TodoList';
import Project from './Project';
import Task from './Task';
import UI from './UI-View';

export function handleEdits(sourceEvent) {
  // get item to edit
  console.log(sourceEvent.target.parentNode.dataset.uuid);
  // [-] Write getItemByUUID method on TodoList
  const uuid = sourceEvent.target.parentNode.dataset.uuid
  const itemToEdit = DATA.getItemByUUID(uuid);
  // const targetTaskToEdit = DATA.getActiveProject()
  //   .getTaskByUUID(sourceEvent.target.parentNode.dataset.uuid);

  // const targetProjectToEdit = DATA
  //   .getProjectByUUID(sourceEvent.target.parentNode.dataset.uuid);

  // get data from Dom

  // parse data into object

  // update task/project object
  // Object.assign(itemToEdit, parsedData);

  console.log(itemToEdit);
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

function handleEditProject(sourceEvent) {
  // get target task

  // get task data / parse task data

  // update task data

  const targetProjectToEdit = DATA.getProjectByUUID(sourceEvent.target.parentNode.dataset.uuid);

  // Get task data for edit
  const projectData = Array.from(sourceEvent.target.parentNode.getElementsByClassName('project-data'));
  const projectDataParsed = projectData
    .reduce((obj, item) => {
      let value = item.textContent;
      // [!] Superfulous code
      if (item.type === 'checkbox') value = item.checked;
      if (item.type === 'input') value = item.value;
      return ({ ...obj, [item.dataset.name]: value });
    }, {});

  // Assign edits
  Object.assign(targetProjectToEdit, projectDataParsed);

  console.log(targetProjectToEdit);

  UI.loadProjectsSidebar();
}

function parseDateInput(dateInput) {
  const parsedDate = chrono.parseDate(dateInput, Date.now(), { forwardDate: true });
  if (parsedDate === null) return 'Add a due date...';
  return new Date(parsedDate).toLocaleDateString('en', { month: 'numeric', day: 'numeric', year: '2-digit' });
}

// [x] Capture enter
function pressEnterToFinish(targetElement) {
  targetElement.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') targetElement.blur();
  });
}

// input.addEventListener("keydown", logKey);

// function logKey(e) {
//   log.textContent += ` ${e.code}`;
// }

export function handleActiveProjectSelection(e) {
  const newActiveProjectName = e.target.textContent;
  DATA.getActiveProject().active = false;
  DATA.getProject(newActiveProjectName).active = true;
  UI.loadProjectsSidebar();
  UI.loadActiveProject();
  UI.loadTasks();
}

export function handleDblClickBeginEditing(e) {
  e.target.contentEditable = true;
  pressEnterToFinish(e.target);
}

export function handleDblClickEndEditing(e, priorContent) {
  console.log(`prior: ${priorContent}`);
  // [ ] Add "add description" ect to newly blank
  if (e.target.textContent === '') {
    e.target.textContent = priorContent;
    return;
  }
  if (e.target.dataset.name === 'taskDueDate' || e.target.dataset.name === 'projectDueDate') {
    e.target.textContent = parseDateInput(e.target.textContent);
  }
  e.target.contentEditable = false;
 // [-] Almost ready
  handleEdits(e);
  if (e.target.classList.contains('task-data')) handleEditTask(e);
  if (e.target.classList.contains('project-data')) handleEditProject(e);
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

// [ ] Refactor to combine handlers for addProject and add Task?
export function handleAddProjectModal(e) {
  e.preventDefault();
  const addProjectForm = document.querySelector('.add-project-modal form');
  const formData = Array.from(addProjectForm.getElementsByClassName('input'));
  const formDataParsed = formData
    .reduce((obj, item) => {
      if (item.dataset.name === 'projectDueDate') {
        // eslint-disable-next-line no-param-reassign
        item.value = parseDateInput(item.value);
      }
      return ({ ...obj, [item.dataset.name]: item.value });
    }, {});

  DATA.addProject(new Project(formDataParsed));

  obsAddProjectBtn.notify();
}

export function handleAddTaskModal(e) {
  e.preventDefault();
  const addTaskForm = document.querySelector('.add-task-modal form');
  const formData = Array.from(addTaskForm.getElementsByClassName('input'));
  const formDataParsed = formData
    .reduce((obj, item) => {
      if (item.dataset.name === 'taskDueDate') {
        // eslint-disable-next-line no-param-reassign
        item.value = parseDateInput(item.value);
      }
      return ({ ...obj, [item.dataset.name]: item.value });
    }, {});

  DATA.getActiveProject().addTask(new Task(formDataParsed));

  obsAddTaskBtn.notify();
}
