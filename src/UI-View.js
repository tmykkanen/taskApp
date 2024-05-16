/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { obsAddProjectBtn, obsAddTaskBtn } from './Observers';
import { DATA } from './TodoList';
import {
  handleAddProjectModal,
  handleAddTaskModal,
  handleCompleteTaskCheckbox,
  handleEditOnDblClick,
  handleEditTask,
  handleSetDueDateBtn,
} from './UI-Control';

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
  }

  static loadActiveProject() {
    const activeProject = DATA.getActiveProject();
    const headerHTML = UI.createActiveProjectHeader(activeProject);
    const addTaskBtn = UI.initAddTaskBtn();
    UI.renderElements([headerHTML, addTaskBtn], taskListHeaderContainer);
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
    li.textContent = projectName;

    return li;
  }

  static createActiveProjectHeader(activeProject) {
    const { projectName } = activeProject;

    const h2 = document.createElement('h2');
    h2.textContent = projectName;

    return h2;
  }

  static createTaskItem(task) {
    const {
      taskName,
      taskDescription,
      taskDueDate,
      taskComplete,
      taskUUID,
    } = task;
    const li = document.createElement('li');
    li.classList.add('task-list-item', 'collapsed');
    li.dataset.uuid = taskUUID;

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

    // [ ] Rename variable for input
    const pDue = document.createElement('input');
    pDue.classList.add('due-date', 'task-data');
    pDue.textContent = taskDueDate;
    pDue.type = 'text';
    pDue.value = taskDueDate;
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
    // UI.initSetDueDateBtn();
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
      // const pDue = taskItem.querySelector("p[data-name='taskDueDate']");
      UI.initEditOnDblClick(taskItem, [h3, pDesc]);
    });
  }

  static initEditOnDblClick(container, editableElements) {
    container.addEventListener('click', (e) => {
      if (container.dataset.editingActivated === 'true') return;
      handleEditOnDblClick(e, container, editableElements);
    });
  }

  // static initSetDueDateBtn() {
  //   const buttons = document.querySelectorAll('.task-list-item .set-due-date');
  //   buttons.forEach((btn) => {
  //     btn.addEventListener('click', () => handleSetDueDateBtn());
  //   });
  // }

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

  // static addSelfDestructingEventListener(element, currentEl, eventType, callback) {
  //   const handler = (e) => {
  //     if (!currentEl.contains(e.target)) {
  //       callback();
  //       element.removeEventListener(eventType, handler);
  //     }
  //   };
  //   element.addEventListener(eventType, handler);
  // }
  // ===== UTIL END ====== //
}

obsAddProjectBtn.subcribe(UI.loadProjectsSidebar);
obsAddTaskBtn.subcribe(UI.loadTasks);
