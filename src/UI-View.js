/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { DATA } from './TodoList';
import Task from './Task';
import Project from './Project';
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
  handleDblClickBeginEditingALT,
} from './UI-Control';

// [TODOS]
// [-] Comment out modals
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

const sidebarContainer = document.querySelector('.sidebar-container');
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
// [ ] unused function
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
    const defaultProjectHTML = getProjectHTML(true);
    // UI.renderElements(defaultProjectHtml, defaultProjectContainer);

    // // Render custom projects
    const customProjectHTML = getProjectHTML(false);
    // UI.renderElements(customProjectHTLM, customProjectContainer);
    const addProjectButton = UI.initAddProjectButton();

    UI.renderSidebar(defaultProjectHTML, customProjectHTML, addProjectButton);

    // Initiate interactivity
    sidebarContainer.append(addProjectButton);
    UI.initActiveProjectSelection();
    UI.initDragAndDropReceivers();
  }

  static renderSidebar(defaultProjectHTML, customProjectHTML, addProjectButton) {
    // clear sidebar
    let child = sidebarContainer.lastElementChild;
    while (child) {
      sidebarContainer.removeChild(child);
      child = sidebarContainer.lastElementChild;
    }

    // default projects
    const divDefault = document.createElement('div');
    divDefault.classList.add('default-projects-container');

    const defaultUL = document.createElement('ul');
    defaultProjectHTML.forEach((element) => defaultUL.append(element));
    // defaultUL.append(defaultProjectHTML);
    divDefault.append(defaultUL);

    // custom projects
    const divCustom = document.createElement('div');
    divCustom.classList.add('custom-projects-container');

    const customUL = document.createElement('ul');
    customProjectHTML.forEach((element) => customUL.append(element));
    // customUL.append(customProjectHTML);
    divCustom.append(customUL);

    sidebarContainer.append(divDefault, divCustom, addProjectButton);

    // Populate container
    // if (!Array.isArray(elements)) return sidebarContainer.append(elements);
    // elements
    //   .flat()
    //   .forEach((el) => {
    //     sidebarContainer.append(el);
    //   });
  }

  static loadActiveProject() {
    const headerHTML = UI.createActiveProjectHeader();
    const addTaskBtn = UI.initAddTaskBtn();
    UI.renderElements([headerHTML, addTaskBtn], taskListHeaderContainer);

    UI.initEditActiveProject();
  }

  static loadTasks(activeTaskUUID) {
    const taskHTML = DATA
      .getActiveProject()
      .getAllTasks()
      .map((task) => UI.createTaskItem(task));
    UI.renderElements(taskHTML, tasksContainer);

    UI.initCollapsingTodos(taskHTML, activeTaskUUID);
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
    if (!project.name) li.classList.add('undefined');
    li.dataset.uuid = project.uuid;
    li.textContent = project.name || 'add title...';

    return li;
  }

  static createActiveProjectHeader() {
    const project = DATA.getActiveProject();

    const div = document.querySelector('.task-list-header');
    div.dataset.uuid = project.uuid;

    const h2 = document.createElement('h2');
    h2.classList.add('name', 'project-data');
    // [BUG] Add handling for dbl click edit - clear contents and corretly keep undefined
    h2.textContent = project.name || 'add title...';
    if (!project.name) h2.classList.add('undefined');
    h2.dataset.name = 'projectName';

    // [-] Refactor task inputs to use input when editing,
    //  then replace with other element when cleared
    const pDesc = document.createElement('p');
    pDesc.classList.add('description', 'project-data');
    if (!project.description) pDesc.classList.add('undefined');
    pDesc.textContent = project.description || 'add description...';
    pDesc.dataset.name = 'projectDescription';

    const pDue = document.createElement('p');
    pDue.classList.add('due-date', 'project-data');
    if (!project.dueDate) pDue.classList.add('undefined');
    pDue.textContent = project.dueDate || 'add due date...';
    pDue.dataset.name = 'projectDueDate';

    return [h2, pDesc, pDue];
  }

  // [x] Add handling for blank name - use css to style with box border for input
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
    // checkbox.dataset.name = getObjectKeyByValue(task, task.status);
    checkbox.dataset.name = 'taskStatus';

    const h3 = document.createElement('h3');
    h3.classList.add('task-data');
    h3.textContent = task.name || 'add title...';
    if (!task.name) h3.classList.add('undefined');
    h3.dataset.name = 'taskName';

    const pDesc = document.createElement('p');
    pDesc.classList.add('description', 'task-data');
    pDesc.textContent = task.description || 'add description...';
    if (!task.description) pDesc.classList.add('undefined');
    pDesc.dataset.name = 'taskDescription';

    const pDue = document.createElement('p');
    pDue.classList.add('due-date', 'task-data');
    pDue.textContent = task.dueDate || 'add due date...';
    if (!task.dueDate) pDue.classList.add('undefined');
    pDue.dataset.name = 'taskDueDate';

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
  // [-] modify to add project directly
  static initAddProjectButton() {
    const btn = UI.createBtn('add-project-btn', '+ Add Project');
    // const btn = document.querySelector('.sidebar-container .add-project-btn');
    // btn.addEventListener('click', () => addProjectModal.showModal());
    btn.addEventListener('click', () => {
      DATA.addProject(new Project());
      UI.loadProjectsSidebar();
    });
    return btn;
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
  // [x] Refactoring to add task directly
  static initAddTaskBtn() {
    const btn = UI.createBtn('add-task-btn', '+ Add Task');
    // btn.addEventListener('click', () => addTaskModal.showModal());
    btn.addEventListener('click', () => {
      DATA.getActiveProject().addTask(new Task());
      // [?] Move to add task action or separate place for all re-renders?
      UI.loadTasks();
    });
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
        if (e.target.parentNode.classList.contains('deleted')) return;
        if (e.target.parentNode.classList.contains('completed')) return;
        // handleDblClickBeginEditing(e);
        handleDblClickBeginEditingALT(e);

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

  static initCollapsingTodos(taskHTML, activeTaskUUID) {
    if (activeTaskUUID) {
      const activeTask = document.querySelector(`[data-uuid="${activeTaskUUID}"]`);
      activeTask.classList.add('expanded');
    }
    taskHTML.forEach((element) => {
      element.addEventListener('click', () => {
        if (element.classList.contains('expanded')) return;

        const taskItems = document.querySelectorAll('.task-list-item');
        taskItems.forEach((item) => item.classList.remove('expanded'));

        element.classList.add('expanded');
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
