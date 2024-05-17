/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import * as chrono from 'chrono-node';
import { DATA } from './TodoList';
import Project from './Project';
import Task from './Task';
import UI from './UI-View';

export function handleEdits(sourceEvent) {
  // get item to edit
  const { uuid } = sourceEvent.target.parentNode.dataset;
  const itemToEdit = DATA.getItemByUUID(uuid);

  // get data from Dom
  const editsData = Array.from(sourceEvent.target.parentNode.children)
    .filter((item) => item.type !== 'button');

  // parse data into object
  const editsDataParsed = editsData
    .reduce((obj, item) => {
      let value = item.textContent;
      if (item.type === 'checkbox') value = item.checked;
      return ({ ...obj, [item.dataset.name]: value });
    }, {});

  // update task/project object
  Object.assign(itemToEdit, editsDataParsed);

  console.log(itemToEdit);
  // [?] Relocate load proj sidebar - necessary to update names
  //  when renaming projects
  UI.loadProjectsSidebar();
}

function parseDateInput(dateInput) {
  const parsedDate = chrono.parseDate(dateInput, Date.now(), { forwardDate: true });
  if (parsedDate === null) return 'Add a due date...';
  return new Date(parsedDate).toLocaleDateString('en', { month: 'numeric', day: 'numeric', year: '2-digit' });
}

function pressEnterToFinish(targetElement) {
  targetElement.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') targetElement.blur();
  });
}

export function handleDblClickBeginEditing(e) {
  e.target.contentEditable = true;
  // e.target.textContent = '';
  e.target.focus();
  pressEnterToFinish(e.target);
}

export function handleDblClickEndEditing(e, priorContent) {
  // [ ] Add "add description" ect to newly blank
  if (e.target.textContent === '') {
    e.target.textContent = priorContent;
    return;
  }
  if (e.target.dataset.name === 'taskDueDate' || e.target.dataset.name === 'projectDueDate') {
    e.target.textContent = parseDateInput(e.target.textContent);
  }
  e.target.contentEditable = false;
  handleEdits(e);
}

export function handleActiveProjectSelection(e) {
  const newActiveProjectName = e.target.textContent;
  DATA.getActiveProject().active = false;
  DATA.getProject(newActiveProjectName).active = true;
  UI.loadProjectsSidebar();
  UI.loadActiveProject();
  UI.loadTasks();
}

// [?] Refactor to combine handlers for addProject and add Task?
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

  UI.loadProjectsSidebar();
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

  UI.loadTasks();
}
