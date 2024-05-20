/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import * as chrono from 'chrono-node';
import { DATA } from './TodoList';
import Task from './Task';
import { obsUpdateDATA, obsUpdateUI } from './Observers';

// ===== UTIL ========== //
// ===================== //
export function parseDateInput(dateInput) {
  const parsedDate = chrono.parseDate(dateInput, Date.now(), { forwardDate: true });
  if (parsedDate === null) return '';
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
  obsUpdateDATA.notify();
}

// === CHECKBOX == //
// ===================== //
export function handleCheckboxAlt(e) {
  const { uuid } = e.target.parentNode.dataset;
  const itemToEdit = DATA.getItemByUUID(DATA, uuid);

  // alt-click a task marked deleted => uncheck and undelete
  if (itemToEdit.status === 'deleted') {
    DATA.getActiveProject().undeleteTask(itemToEdit.name);
    obsUpdateDATA.notify();
    return;
  }

  // alt-click a task checked completed => recheck it, then delete
  if (itemToEdit.status === 'completed') {
    e.target.checked = !e.target.checked;
  }

  // alt-click an unmarked task => check and delete
  DATA.getActiveProject().deleteTask(itemToEdit.name);
  obsUpdateDATA.notify();
}

export function handleCheckbox(e) {
  // get item to edit
  const { uuid } = e.target.parentNode.dataset;
  const itemToEdit = DATA.getItemByUUID(DATA, uuid);

  // undelete
  if (itemToEdit.status === 'deleted') {
    DATA.getActiveProject().undeleteTask(itemToEdit.name);
    obsUpdateDATA.notify();
    return;
  }

  // uncomplete task
  if (itemToEdit.status === 'completed') {
    itemToEdit.status = undefined;
    DATA.getActiveProject().unarchiveTask(itemToEdit.name);
    obsUpdateDATA.notify();
    return;
  }

  // complete task
  itemToEdit.status = 'completed';
  DATA.getActiveProject().archiveTask(itemToEdit.name);
  obsUpdateDATA.notify();
}

export function handleCheckboxAfter(e) {
  // needs to fire after checkbox regular behavior registers
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

// === DBL CLICK EDIT == //
// ===================== //
function handleDblClickEndEditing(e) {
  const { uuid } = e.target.parentNode.dataset;
  const { name } = e.target.dataset;
  let { value } = e.target;
  const itemToEdit = DATA.getItemByUUID(DATA, uuid);

  // guards against just spaces triggering value reassignment
  value = value.trim();

  if (name === 'taskDueDate' || name === 'projectDueDate') {
    value = parseDateInput(value);
  }

  if (value !== '') Object.assign(itemToEdit, { [e.target.dataset.name]: value });
  obsUpdateDATA.notify();
  obsUpdateUI.notify(uuid);
}

export function handleDblClickBeginEditing(e) {
  const { target } = e;

  let type = 'input';
  if (target.nodeName === 'P') type = 'textarea';

  const input = document.createElement(type);
  input.classList.add('text-input');
  input.dataset.name = target.dataset.name;
  input.placeholder = target.textContent;

  target.replaceWith(input);
  input.focus();

  input.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') input.blur();
  });
  input.addEventListener('blur', (event) => {
    handleDblClickEndEditing(event);
  });
}

// ===== ACTIVE PROJ === //
// ===================== //
export function handleActiveProjectSelection(e) {
  const newActiveProjectUUID = e.target.dataset.uuid;
  DATA.getActiveProject().active = false;
  DATA.getProjectByUUID(newActiveProjectUUID).active = true;
  obsUpdateDATA.notify();
  obsUpdateUI.notify();
}
