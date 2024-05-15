/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { obsAddProjectBtn, obsAddTaskBtn } from './Observers';
import { DATA } from './TodoList';
import { handleAddProjectModal, handleAddTaskModal } from './UI-Control';

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
    } = task;
    const li = document.createElement('li');
    li.classList.add('task-list-item', 'collapsed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.id = taskName;
    checkbox.checked = taskComplete;

    const h3 = document.createElement('h3');
    h3.textContent = taskName;

    const pDesc = document.createElement('p');
    pDesc.classList.add('description');
    pDesc.textContent = taskDescription;

    const pDue = document.createElement('p');
    pDue.classList.add('due-date');
    pDue.textContent = taskDueDate;

    const btnSetDue = document.createElement('button');
    btnSetDue.type = 'button';
    btnSetDue.textContent = 'Set Due Date';

    UI.initSetDueDateBtn(btnSetDue);

    li.append(checkbox, h3, pDesc, pDue, btnSetDue);

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
  static initAddProjectButton() {
    // [ ] Refactor into simple function with parameters to combine addTask + addProject creation
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
      // [X] reset form
      addProjectForm.reset();
      // [X] close form
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

  }

  static initSetDueDateBtn(btn) {
    btn.addEventListener('click', () => console.log('set due'));
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

obsAddProjectBtn.subcribe(UI.loadProjectsSidebar);
obsAddTaskBtn.subcribe(UI.loadTasks);
