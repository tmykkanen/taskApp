/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { DATA } from './TodoList';
import {
  handleAddProjectModal,
  handleAddTaskModal,
  handleDblClickBeginEditing,
  handleDblClickEndEditing,
  handleActiveProjectSelection,
  handleEdits,
  handleDragAndDropEnd,
  handleCheckbox,
  handleCheckboxAlt,
  handleCheckboxAfter,
} from './UI-Control';

// [TODOS]
// [ ] Add error handling for modals
// [ ] Add error handling for task editing
// [?] implement task project picker
// [ ] add logic for expanding / collapsing todo list items
// [ ] add task sorting
// [ ] add set date button hover
// [ ] Fix sidebar container too many divs
// [ ] Add controls to delete task
// [ ] Add rendering for filters for Today and Upcoming (this week?)
// [x] Write handling for moving completed todos to archive

const defaultProjectContainer = document.querySelector('.default-projects-container ul');
const customProjectContainer = document.querySelector('.custom-projects-container ul');
const taskListHeaderContainer = document.querySelector('.task-list-header');
const tasksContainer = document.querySelector('.main-container ul');
const addProjectModal = document.querySelector('.add-project-modal');
const addProjectForm = document.querySelector('.add-project-modal form');
const addProjectSubmit = document.querySelector('.add-project-modal .submit');
const addProjectCancel = document.querySelector('.add-project-modal .cancel');
const addTaskModal = document.querySelector('.add-task-modal');
const addTaskForm = document.querySelector('.add-task-modal form');
const addTaskSubmit = document.querySelector('.add-task-modal .submit');
const addTaskCancel = document.querySelector('.add-task-modal .cancel');

// UTIL
function getObjectKeyByValue(object, value) {
  return Object.keys(object)
    .find((key) => object[key] === value);
}

export default class UI {
  // ===== LOAD PAGE ===== //
  // ===================== //
  static loadHomepage() {
    UI.loadProjectsSidebar();
    UI.loadActiveProject();
    UI.loadTasks();
    UI.loadModals();
  }

  static loadProjectsSidebar() {
    function getProjectHTML(defaultBol) {
      return DATA
        .getAllProjects()
        // Check if looking for default projects or custom projects using boolean
        .filter((project) => project.default === defaultBol)
        .map((project) => UI.createProjectItem(project));
    }

    // Render default projects
    const defaultProjectHtml = getProjectHTML(true);
    UI.renderElements(defaultProjectHtml, defaultProjectContainer);

    // Render custom projects
    const customProjectHTLM = getProjectHTML(false);
    UI.renderElements(customProjectHTLM, customProjectContainer);

    // Initiate interactivity
    UI.initAddProjectButton();
    UI.initActiveProjectSelection();
    UI.initDragAndDropReceivers();
  }

  static loadActiveProject() {
    const headerHTML = UI.createActiveProjectHeader();
    const addTaskBtn = UI.initAddTaskBtn();
    UI.renderElements([headerHTML, addTaskBtn], taskListHeaderContainer);

    UI.initEditActiveProject();
  }

  static loadTasks() {
    const taskHTML = DATA
      .getActiveProject()
      .getAllTasks()
      .map((task) => UI.createTaskItem(task));
    UI.renderElements(taskHTML, tasksContainer);

    UI.initCompleteTaskCheckbox();
    UI.initEditTask();
    UI.initDragAndDropDraggable();
  }

  static loadModals() {
    UI.initAddProjectModal();
    UI.initAddTaskModal();
  }
  // ===== LOAD END ====== //

  // ===== CREATE ======== //
  // ===================== //
  static createProjectItem(project) {
    const li = document.createElement('li');
    li.classList.add('project-list-item');
    if (project.active) li.classList.add('active');
    li.dataset.uuid = project.uuid;
    li.textContent = project.name;

    return li;
  }

  static createActiveProjectHeader() {
    const project = DATA.getActiveProject();

    const div = document.querySelector('.task-list-header');
    div.dataset.uuid = project.uuid;

    const h2 = document.createElement('h2');
    h2.classList.add('name', 'project-data');
    h2.textContent = project.name;
    h2.dataset.name = getObjectKeyByValue(project, project.name);

    const pDesc = document.createElement('p');
    pDesc.classList.add('description', 'project-data');
    pDesc.textContent = project.description || 'Add a description...';
    pDesc.dataset.name = getObjectKeyByValue(project, project.description);

    const pDue = document.createElement('p');
    pDue.classList.add('due-date', 'project-data');
    pDue.textContent = project.dueDate || 'Add a due date...';
    pDue.dataset.name = getObjectKeyByValue(project, project.dueDate);

    return [h2, pDesc, pDue];
  }

  static createTaskItem(task) {
    const li = document.createElement('li');
    li.classList.add('task-list-item', 'collapsed');
    li.dataset.uuid = task.uuid;
    li.draggable = true;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox', 'task-data');
    checkbox.id = task.name;
    if (task.status !== undefined) checkbox.checked = true;
    checkbox.dataset.name = getObjectKeyByValue(task, task.status);

    const h3 = document.createElement('h3');
    h3.classList.add('task-data');
    h3.textContent = task.name;
    h3.dataset.name = getObjectKeyByValue(task, task.name);

    const pDesc = document.createElement('p');
    pDesc.classList.add('description', 'task-data');
    pDesc.textContent = task.description || 'add a description...';
    pDesc.dataset.name = getObjectKeyByValue(task, task.description);

    const pDue = document.createElement('p');
    pDue.classList.add('due-date', 'task-data');
    pDue.textContent = task.dueDate || 'add a due date...';
    pDue.dataset.name = getObjectKeyByValue(task, task.dueDate);

    li.append(checkbox, h3, pDesc, pDue);

    return li;
  }

  static createBtn(className, textContent) {
    const btn = document.createElement('button');
    btn.classList.add(className);
    btn.type = 'button';
    btn.textContent = textContent;
    return btn;
  }

  // ===== CREATE END ==== //

  // ===== LISTENERS ===== //
  // ===================== //
  // **** AddProject **** //
  static initAddProjectButton() {
    const btn = document.querySelector('.sidebar-container .add-project-btn');
    btn.addEventListener('click', () => addProjectModal.showModal());
  }

  static initAddProjectModal() {
    addProjectCancel.addEventListener('click', () => {
      addProjectForm.reset();
      addProjectModal.close();
    });

    addProjectSubmit.addEventListener('click', (e) => {
      handleAddProjectModal(e);
      addProjectForm.reset();
      addProjectModal.close();
    });
  }

  // **** Select Active Project **** //
  static initActiveProjectSelection() {
    const projectList = document.querySelectorAll('.project-list-item');
    projectList.forEach((item) => {
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        handleActiveProjectSelection(e);
      });
    });
  }

  // **** Add Task **** //
  static initAddTaskBtn() {
    const btn = UI.createBtn('add-task-btn', '+ Add Task');
    btn.addEventListener('click', () => addTaskModal.showModal());
    return btn;
  }

  static initAddTaskModal() {
    addTaskCancel.addEventListener('click', () => {
      addTaskForm.reset();
      addTaskModal.close();
    });

    addTaskSubmit.addEventListener('click', (e) => {
      handleAddTaskModal(e);
      addTaskForm.reset();
      addTaskModal.close();
    });
  }

  // **** Task/Project Editing **** //
  static initEditActiveProject() {
    const projectListItems = document.querySelectorAll('.task-list-header .project-data');
    UI.initEditOnDblClick(projectListItems);
  }

  static initEditTask() {
    const taskListItems = Array.from(document.querySelectorAll('.task-list-item .task-data'))
      .filter((item) => item.type !== 'checkbox');
    UI.initEditOnDblClick(taskListItems);
  }

  static initEditOnDblClick(editableElements) {
    editableElements.forEach((element) => {
      element.addEventListener('dblclick', (e) => {
        if (e.target.contentEditable === 'true') return;
        handleDblClickBeginEditing(e);

        element.addEventListener('blur', () => {
          handleDblClickEndEditing(e);
        });
      });
    });
  }

  static initCompleteTaskCheckbox() {
    const checkboxes = document.querySelectorAll('.task-list-item .checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('mousedown', (e) => {
        e.target.parentNode.classList.add('mouse-down');
        if (e.altKey) return handleCheckboxAlt(e);
        handleCheckbox(e);
      });
      checkbox.addEventListener('mouseup', (e) => {
        e.target.parentNode.classList.remove('mouse-down');
        handleCheckboxAfter(e);
        // e.target.parentNode.classList.toggle('completed');
        // if (e.altKey) e.target.parentNode.classList.toggle('deleted');
      });
    });
  }

  // **** Drag and Drop **** //

  static initDragAndDropDraggable() {
    const dragabbleElements = Array.from(document.querySelectorAll('[draggable="true"]'));
    dragabbleElements.forEach((element) => {
      element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.dataset.uuid);
        e.target.classList.add('dragging');
      });
      element.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
      });
    });
  }

  static initDragAndDropReceivers() {
    const dropElements = document.querySelectorAll('.project-list-item');
    dropElements.forEach((element) => {
      element.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.target.classList.add('drop-target');
      });

      element.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      element.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.target.classList.remove('drop-target');
      });

      element.addEventListener('drop', (e) => {
        e.preventDefault();
        e.target.classList.remove('drop-target');

        handleDragAndDropEnd(e);
      });
    });
  }
  // ===== LISTENER END == //

  // ===== RENDER ======== //
  // ===================== //
  // eslint-disable-next-line consistent-return
  static renderElements(elements, container) {
    // Empty container
    let child = container.lastElementChild;
    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }
    // Populate container
    if (!Array.isArray(elements)) return container.append(elements);
    elements
      .flat()
      .forEach((el) => {
        container.append(el);
      });
  }
  // ===== RENDER END ==== //
}
