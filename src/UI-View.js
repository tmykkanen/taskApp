/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { DATA } from './TodoList';
import Task from './Task';
import Project from './Project';
import {
  handleActiveProjectSelection,
  handleDragAndDropEnd,
  handleCheckbox,
  handleCheckboxAlt,
  handleCheckboxAfter,
  handleDblClickBeginEditing,
  handleProjectDelete,
} from './UI-Control';
import { obsUpdateDATA, obsUpdateUI } from './Observers';

// [TODOS]
// [ ] Add error handling for modals
// [ ] Add error handling for task editing
// [ ] add task sorting
// [ ] add set date button hover
// [ ] Add rendering for filters for Today and Upcoming (this week?)
// [ ] Add ability to delete projects - alt-click on list?
// [ ] Create defaults for project data / initialization
// [ ] Create project reset button

const sidebarContainer = document.querySelector('.sidebar-container');
const taskListHeaderContainer = document.querySelector('.task-list-header');
const tasksContainer = document.querySelector('.main-container ul');

export default class UI {
  // ===== LOAD PAGE ===== //
  // ===================== //
  static loadHomepage(data) {
    UI.loadProjectsSidebar();
    UI.loadActiveProject();
    UI.loadTasks(data);
  }

  static loadProjectsSidebar() {
    const defaultProjectHTML = UI.createSidebarProjectListHTML({ defaultBol: true });
    const customProjectHTML = UI.createSidebarProjectListHTML({ defaultBol: false });
    const addProjectButtonHTML = UI.initAddProjectButton();

    UI.renderElements(
      [defaultProjectHTML, customProjectHTML, addProjectButtonHTML],
      sidebarContainer,
    );

    // Initiate interactivity
    UI.initProjectSidebar();
    UI.initDragAndDropReceivers();
  }

  static loadActiveProject() {
    const headerHTML = UI.createActiveProjectHeader();
    const addTaskBtn = UI.initAddTaskBtn();
    UI.renderElements([headerHTML, addTaskBtn], taskListHeaderContainer);

    UI.initEditActiveProject();
  }

  static loadTasks(activeTaskUUID) {
    const taskHTML = DATA.getActiveProject().getAllTasks()
      .map((task) => UI.createTaskItem(task));
    UI.renderElements(taskHTML, tasksContainer);

    UI.initCollapsingTodos(taskHTML, activeTaskUUID);
    UI.initCompleteTaskCheckbox();
    UI.initEditTask();
    UI.initDragAndDropDraggable();
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

  static createSidebarProjectListHTML({ defaultBol }) {
    const projectItemHTML = DATA.getAllProjects()
      .filter((project) => project.default === defaultBol)
      .map((project) => UI.createProjectItem(project));

    const div = document.createElement('div');
    if (defaultBol) div.classList.add('default-projects-container');
    if (!defaultBol) div.classList.add('custom-projects-container');

    const ul = document.createElement('ul');

    projectItemHTML.forEach((element) => ul.append(element));
    div.append(ul);

    return div;
  }

  static createActiveProjectHeader() {
    const project = DATA.getActiveProject();

    const div = document.querySelector('.task-list-header');
    div.dataset.uuid = project.uuid;

    const h2 = document.createElement('h2');
    h2.classList.add('name', 'project-data');
    if (!project.name) h2.classList.add('undefined');
    h2.textContent = project.name || 'add title...';
    h2.dataset.name = 'projectName';

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
    checkbox.dataset.name = 'taskStatus';

    const h3 = document.createElement('h3');
    h3.classList.add('task-data');
    if (!task.name) h3.classList.add('undefined');
    h3.textContent = task.name || 'add title...';
    h3.dataset.name = 'taskName';

    const pDesc = document.createElement('p');
    pDesc.classList.add('description', 'task-data');
    if (!task.description) pDesc.classList.add('undefined');
    pDesc.textContent = task.description || 'add description...';
    pDesc.dataset.name = 'taskDescription';

    const pDue = document.createElement('p');
    pDue.classList.add('due-date', 'task-data');
    if (!task.dueDate) pDue.classList.add('undefined');
    pDue.textContent = task.dueDate || 'add due date...';
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
  static initAddProjectButton() {
    const btn = UI.createBtn('add-project-btn', '+ Add Project');
    btn.addEventListener('click', () => {
      DATA.addProject(new Project());
      obsUpdateDATA.notify();
      obsUpdateUI.notify();
    });
    return btn;
  }

  // **** Select Active Project **** //
  static initProjectSidebar() {
    const projectItemList = document.querySelectorAll('.project-list-item');
    projectItemList.forEach((item) => {
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (e.altKey) {
          handleProjectDelete(e);
          return;
        }
        handleActiveProjectSelection(e);
      });
    });
  }

  // **** Add Task **** //
  static initAddTaskBtn() {
    const btn = UI.createBtn('add-task-btn', '+ Add Task');
    btn.addEventListener('click', () => {
      DATA.getActiveProject().addTask(new Task());
      obsUpdateDATA.notify();
      obsUpdateUI.notify();
    });
    return btn;
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
        handleDblClickBeginEditing(e);
      });
    });
  }

  static initCompleteTaskCheckbox() {
    const checkboxes = document.querySelectorAll('.task-list-item .checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('mousedown', (e) => {
        e.target.parentNode.classList.add('mouse-down');
        if (e.altKey) {
          handleCheckboxAlt(e);
          return;
        }
        handleCheckbox(e);
      });
      checkbox.addEventListener('mouseup', (e) => {
        e.target.parentNode.classList.remove('mouse-down');
        handleCheckboxAfter(e);
      });
    });
  }

  static initCollapsingTodos(taskHTML, activeTaskUUID) {
    if (activeTaskUUID) {
      const activeTask = document.querySelector(`[data-uuid="${activeTaskUUID}"]`);
      if (activeTask) activeTask.classList.add('expanded');
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
  static renderElements(elements, container) {
    // eslint-disable-next-line no-param-reassign
    container.innerHTML = '';

    Array.from(elements).flat().forEach((el) => {
      container.append(el);
    });
  }
  // ===== RENDER END ==== //
}

obsUpdateUI.subcribe(UI.loadHomepage);
