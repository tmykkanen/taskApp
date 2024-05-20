/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import * as chrono from 'chrono-node';
import { DATA } from './TodoList';
import Project from './Project';
import Task from './Task';
import UI from './UI-View';

// ===== UTIL ========== //
// ===================== //
export function parseDateInput(dateInput) {
  const parsedDate = chrono.parseDate(dateInput, Date.now(), { forwardDate: true });
  if (parsedDate === null) return;
  return new Date(parsedDate).toLocaleDateString('en', { month: 'numeric', day: 'numeric', year: '2-digit' });
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
  targetProject.addTask(new Task({ ...sourceTask }));

  // remove source task from old project
  DATA.getActiveProject().deleteTask(sourceTask.name);
}

// === DBL CLICK EDIT == //
// ===================== //
export function handleCheckboxAlt(e) {
  const { uuid } = e.target.parentNode.dataset;
  const itemToEdit = DATA.getItemByUUID(DATA, uuid);

  if (itemToEdit.status === 'deleted') {
    DATA.getActiveProject().undeleteTask(itemToEdit.name);
    return;
  }

  if (itemToEdit.status === 'completed') {
    e.target.checked = !e.target.checked;
    // e.target.parentNode.classList.toggle('completed');
  }

  DATA.getActiveProject().deleteTask(itemToEdit.name);
}

export function handleCheckbox(e) {
  // get item to edit
  const { uuid } = e.target.parentNode.dataset;
  const itemToEdit = DATA.getItemByUUID(DATA, uuid);

  // undelete
  if (itemToEdit.status === 'deleted') {
    // e.target.parentNode.classList.toggle('deleted');
    DATA.getActiveProject().undeleteTask(itemToEdit.name);
    return;
  }

  // uncomplete task
  if (itemToEdit.status === 'completed') {
    itemToEdit.status = undefined;
    DATA.getActiveProject().unarchiveTask(itemToEdit.name);
    return;
  }

  // complete task
  itemToEdit.status = 'completed';
  DATA.getActiveProject().archiveTask(itemToEdit.name);
}

export function handleCheckboxAfter(e) {
  // get item to edit
  const { dataset, classList } = e.target.parentNode;
  const { status } = DATA.getItemByUUID(DATA, dataset.uuid);

  if (status === 'deleted') {
    classList.add('deleted', 'completed');
    return;
  }

  if (status === undefined) {
    classList.remove('deleted', 'completed');
    return;
  }

  classList.add('completed');
}

export function handleEdits(e) {
  // get item to edit
  const { uuid } = e.target.parentNode.dataset;
  const itemToEdit = DATA.getItemByUUID(DATA, uuid);

  // Get edits
  let value = e.target.textContent;

  // update task/project object
  Object.assign(itemToEdit, { [e.target.dataset.name]: value });

  console.log(itemToEdit);
  // [?] Relocate load proj sidebar - necessary to update names
  //  when renaming projects
  UI.loadProjectsSidebar();
  // arg to preserve active task
  UI.loadTasks(uuid);
}

export function handleDblClickBeginEditing(e) {
  const { target } = e;
  target.contentEditable = true;

  target.addEventListener('keydown', () => {
    target.textContent = '';
    if (target.classList.contains('undefined')) {
      target.classList.remove('undefined');
    }
  }, { once: true });

  target.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') target.blur();
  });

  target.focus();
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
  const newActiveProjectUUID = e.target.dataset.uuid;
  DATA.getActiveProject().active = false;
  DATA.getProjectByUUID(newActiveProjectUUID).active = true;
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
