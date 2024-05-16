/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { obsAddProjectBtn, obsAddTaskBtn } from './Observers';
import { DATA } from './TodoList';
import {
  handleAddProjectModal,
  handleAddTaskModal,
  handleCompleteTaskCheckbox,
  handleDblClickBeginEditing,
  handleDblClickEndEditing,
  handleActiveProjectSelection,
} from './UI-Control';

// [TODOS]
// [x] Add ability to select active project
// [x] Add display of project description / due date
// [x] double click to edit project title in main container
// [x] Add chronos nlp to project and task modals
// [ ] Add error handling for modals
// [ ] Add error handling for task editing
// [x] Add project editing
// [ ] Add finalize task edit on "enter" keypress
// [ ] Add conditional rendering to project and task metadata (i.e. date: false, etc)
// eslint-disable-next-line max-len
// [ ] Consider refactoring to accomodate for double-click to edit code for both proj + task using conditionals
// [ ] implement drag-and-drop to change task project
// [?] implement task project picker

const projectContainer = document.querySelector('.default-projects-container ul');
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
    const allProjects = DATA.getAllProjects();
    const projectHTML = allProjects.map((project) => UI.createProjectItem(project));
    const addProjectBtn = UI.initAddProjectButton();
    UI.renderElements([projectHTML, addProjectBtn], projectContainer);
    UI.initActiveProjectSelection();
  }

  static loadActiveProject() {
    const activeProject = DATA.getActiveProject();
    const headerHTML = UI.createActiveProjectHeader(activeProject);
    const addTaskBtn = UI.initAddTaskBtn();
    UI.renderElements([headerHTML, addTaskBtn], taskListHeaderContainer);
    UI.initEditActiveProject();
  }

  static loadTasks() {
    const activeProject = DATA.getActiveProject();
    const activeProjectTasks = activeProject.getAllTasks();
    const taskHTML = activeProjectTasks.map((task) => UI.createTaskItem(task));
    UI.renderElements(taskHTML, tasksContainer);
    UI.initTaskItemInteraction();
  }

  static loadModals() {
    UI.initAddProjectModal();
    UI.initAddTaskModal();
  }

  // ===== LOAD END ====== //

  // ===== CREATE ======== //
  // ===================== //
  static createProjectItem(project) {
    const { projectName } = project;

    const li = document.createElement('li');
    li.classList.add('project-list-item');
    if (project.active) li.classList.add('active');

    const a = document.createElement('a');
    a.href = '';
    a.textContent = projectName;

    li.append(a);

    return li;
  }

  static createActiveProjectHeader(activeProject) {
    const {
      projectName,
      projectDescription,
      projectDueDate,
    } = activeProject;

    const div = document.querySelector('.task-list-header');
    div.dataset.uuid = activeProject.uuid;

    const h2 = document.createElement('h2');
    h2.classList.add('name', 'project-data');
    h2.textContent = projectName;
    h2.dataset.name = 'projectName';

    const pDesc = document.createElement('p');
    pDesc.classList.add('description', 'project-data');
    pDesc.textContent = projectDescription;
    pDesc.dataset.name = 'projectDescription';

    const pDue = document.createElement('p');
    pDue.classList.add('due-date', 'project-data');
    pDue.textContent = projectDueDate;
    pDue.dataset.name = 'projectDueDate';

    return [h2, pDesc, pDue];
  }

  static createTaskItem(task) {
    const {
      taskName,
      taskDescription,
      taskDueDate,
      taskComplete,
    } = task;
    const li = document.createElement('li');
    li.classList.add('task-list-item', 'collapsed');
    li.dataset.uuid = task.uuid;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox', 'task-data');
    checkbox.id = taskName;
    checkbox.checked = taskComplete;
    checkbox.dataset.name = 'taskComplete';

    const h3 = document.createElement('h3');
    h3.classList.add('task-data');
    h3.textContent = taskName;
    h3.dataset.name = 'taskName';

    const pDesc = document.createElement('p');
    pDesc.classList.add('description', 'task-data');
    pDesc.textContent = taskDescription;
    pDesc.dataset.name = 'taskDescription';

    const pDue = document.createElement('p');
    pDue.classList.add('due-date', 'task-data');
    pDue.textContent = taskDueDate;
    pDue.dataset.name = 'taskDueDate';

    li.append(checkbox, h3, pDesc, pDue);

    return li;
  }

  // ===== CREATE END ==== //

  // ===== LISTENERS ===== //
  // ===================== //
  static initAddProjectButton() {
    const btn = UI.createBtn('add-project', '+ New Project');
    btn.addEventListener('click', () => addProjectModal.showModal());
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

  static initActiveProjectSelection() {
    const projectList = document.querySelectorAll('.project-list-item');
    projectList.forEach((item) => {
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        handleActiveProjectSelection(e);
      });
    });
  }

  static initEditActiveProject() {
    const projectListItems = document.querySelectorAll('.task-list-header .project-data');
    UI.initEditOnDblClick(projectListItems);
  }

  static initAddTaskBtn() {
    const btn = UI.createBtn('add-task', '+ New Task');
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

  static initTaskItemInteraction() {
    UI.initCompleteTaskCheckbox();
    UI.initEditTask();
    // [ ] add logic for expanding / collapsing todo list items
  }

  static initCompleteTaskCheckbox() {
    const checkboxes = document.querySelectorAll('.task-list-item .checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        e.target.parentNode.classList.toggle('completed');
        handleCompleteTaskCheckbox(e);
      });
    });
  }

  static initEditTask() {
    const taskListItems = document.querySelectorAll('.task-list-item');
    taskListItems.forEach((taskItem) => {
      const h3 = taskItem.querySelector("h3[data-name='taskName']");
      const pDesc = taskItem.querySelector("p[data-name='taskDescription']");
      const pDue = taskItem.querySelector("p[data-name='taskDueDate']");
      UI.initEditOnDblClick([h3, pDesc, pDue]);
    });
  }

  static initEditOnDblClick(editableElements) {
    editableElements.forEach((element) => {
      element.addEventListener('click', (e) => {
        if (e.target.contentEditable === 'true') return;
        handleDblClickBeginEditing(e);
      });
      element.addEventListener('blur', (e) => {
        handleDblClickEndEditing(e);
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

  // ===== UTIL ========== //
  // ===================== //
  static createBtn(className, textContent) {
    const btn = document.createElement('button');
    btn.classList.add(className);
    btn.type = 'button';
    btn.textContent = textContent;
    return btn;
  }
  // ===== UTIL END ====== //
}

// [ ] Edit subscribers
obsAddProjectBtn.subcribe(UI.loadProjectsSidebar);
obsAddTaskBtn.subcribe(UI.loadTasks);
