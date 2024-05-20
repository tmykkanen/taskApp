/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import * as chrono from 'chrono-node';
import { DATA } from './TodoList';
import Task from './Task';
import UI from './UI-View';

// ===== UTIL ========== //
// ===================== //
export function parseDateInput(dateInput) {
  const parsedDate = chrono.parseDate(dateInput, Date.now(), { forwardDate: true });
  if (parsedDate === null) return;
  // eslint-disable-next-line consistent-return
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

// === CHECKBOX == //
// ===================== //
export function handleCheckboxAlt(e) {
  const { uuid } = e.target.parentNode.dataset;
  const itemToEdit = DATA.getItemByUUID(DATA, uuid);

  // alt-click a task marked deleted => uncheck and undelete
  if (itemToEdit.status === 'deleted') {
    DATA.getActiveProject().undeleteTask(itemToEdit.name);
    return;
  }

  // alt-click a task checked completed => recheck it, then delete
  if (itemToEdit.status === 'completed') {
    e.target.checked = !e.target.checked;
  }

  // alt-click an unmarked task => check and delete
  DATA.getActiveProject().deleteTask(itemToEdit.name);
}

export function handleCheckbox(e) {
  // get item to edit
  const { uuid } = e.target.parentNode.dataset;
  const itemToEdit = DATA.getItemByUUID(DATA, uuid);

  // undelete
  if (itemToEdit.status === 'deleted') {
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
  // [BUG] add check and handler for parsing date input
  // [BUG] Fix keep previous value when no input in input box

  const { uuid } = e.target.parentNode.dataset;
  const itemToEdit = DATA.getItemByUUID(DATA, uuid);

  Object.assign(itemToEdit, { [e.target.dataset.name]: e.target.value });

  UI.loadProjectsSidebar();
  UI.loadTasks(uuid);
}

// [x] Refactor task inputs to use input when editing,
//  then replace with other element when cleared
// [x] working - replace regular functions with ALT functions and implement
export function handleDblClickBeginEditing(e) {
  const { target } = e;

  let type = 'input';
  if (target.nodeName === 'P') type = 'textarea';

  const input = document.createElement(type);
  input.classList.add('text-input');
  // input.type = 'text';
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
  UI.loadProjectsSidebar();
  UI.loadActiveProject();
  UI.loadTasks();
}
