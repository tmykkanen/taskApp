/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import * as chrono from 'chrono-node';
import { DATA } from './TodoList';
import Project from './Project';
import Task from './Task';
import UI from './UI-View';

// ===== UTIL ========== //
// ===================== //
function parseDateInput(dateInput) {
  const parsedDate = chrono.parseDate(dateInput, Date.now(), { forwardDate: true });
  if (parsedDate === null) return;
  return new Date(parsedDate).toLocaleDateString('en', { month: 'numeric', day: 'numeric', year: '2-digit' });
}

function pressEnterToFinish(targetElement) {
  targetElement.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') targetElement.blur();
  });
}

// ===== DRAG N DROP === //
// ===================== //
export function handleDragAndDropEnd(e) {
  const sourceUUID = e.dataTransfer.getData('text');
  const targetUUID = e.target.dataset.uuid;

  // Cancel if dragged to current project
  if (DATA.getActiveProject().uuid === targetUUID) return;

  const sourceTask = DATA.getItemByUUID(DATA, sourceUUID);
  const targetProject = DATA.getItemByUUID(DATA, targetUUID);

  // remove sourceTask from DOM
  document.querySelector(`[data-uuid="${sourceUUID}"]`).remove();

  // add source task to target project
  targetProject.addTask(sourceTask);
  // remove source task from old project
  DATA.getActiveProject().deleteTask(sourceTask.name);
}

// === DBL CLICK EDIT == //
// ===================== //
export function handleEdits(e) {
  // get item to edit
  const { uuid } = e.target.parentNode.dataset;
  const itemToEdit = DATA.getItemByUUID(DATA, uuid);

  // Get edits
  let value = e.target.textContent;
  if (e.target.type === 'checkbox') {
    value = e.target.checked;
    if (e.target.checked) {
      DATA.getActiveProject().archiveTask(itemToEdit.name);
      console.log(DATA.getActiveProject());
    }
    if (!e.target.checked) {
      console.log(DATA.getActiveProject().getProjectTaskArchive());
      const task = DATA.getItemByUUID(DATA, uuid);
      DATA.getActiveProject().unarchiveTask(task.name);
      console.log(DATA.getActiveProject().getProjectTaskArchive());
      console.log(DATA.getActiveProject());
      // [-] Write handling for moving completed todos to archive
    }
  }

  // update task/project object
  Object.assign(itemToEdit, { [e.target.dataset.name]: value });

  console.log(itemToEdit);
  // [?] Relocate load proj sidebar - necessary to update names
  //  when renaming projects
  UI.loadProjectsSidebar();
}

export function handleDblClickBeginEditing(e) {
  e.target.contentEditable = true;
  e.target.focus();
  pressEnterToFinish(e.target);
}

export function handleDblClickEndEditing(e) {
  // [ ] Add "add description" ect to newly blank
  const { uuid } = e.target.parentNode.dataset;
  const itemToEdit = DATA.getItemByUUID(DATA, uuid);

  if (e.target.dataset.name === 'taskDueDate' || e.target.dataset.name === 'projectDueDate') {
    e.target.textContent = parseDateInput(e.target.textContent);
  }
  if (e.target.textContent === '' || e.target.textContent === null) {
    e.target.textContent = itemToEdit[e.target.dataset.name];
    return;
  }
  e.target.contentEditable = false;
  handleEdits(e);
}

// ===== ACTIVE PROJ === //
// ===================== //
export function handleActiveProjectSelection(e) {
  const newActiveProjectName = e.target.textContent;
  DATA.getActiveProject().active = false;
  DATA.getProject(newActiveProjectName).active = true;
  UI.loadProjectsSidebar();
  UI.loadActiveProject();
  UI.loadTasks();
}

// ===== MODALS ======== //
// ===================== //
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
