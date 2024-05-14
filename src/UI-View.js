/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { obsAddProjectBtn } from './Observers';
import { DATA } from './TodoList';
import Control from './UI-Control';

const projectContainer = document.querySelector('.default-projects-container ul');
const taskListHeaderContainer = document.querySelector('.task-list-header');
const tasksContainer = document.querySelector('.main-container ul');
const addProjectModal = document.querySelector('.add-project-modal');
const addProjectSubmit = document.querySelector('.add-project-modal .submit');
const addProjectCancel = document.querySelector('.add-project-modal .cancel');

export default class UI {
  // ===== LOAD PAGE ===== //
  // ===================== //
  static loadHomepage() {
    const projects = DATA.getAllProjects();
    const activeProject = DATA.getActiveProject();
    UI.loadProjects(projects);
    UI.loadActiveProject(activeProject);
  }

  static loadProjects(projects) {
    const projectHTML = projects.map((project) => UI.createProjectItem(project));
    UI.renderElements(projectHTML, projectContainer);
    UI.initButtonAddProject();
  }

  static loadActiveProject(project) {
    const headerHTML = UI.createActiveProjectHeader(project);
    UI.renderElements(headerHTML, taskListHeaderContainer);

    UI.loadTasks(project);
  }

  static loadTasks(project) {
    const tasks = project.getAllTasks();
    const taskHTML = tasks.map((task) => UI.createTaskItem(task));
    UI.renderElements(taskHTML, tasksContainer);
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

  static createActiveProjectHeader(project) {
    const { projectName } = project;

    const h2 = document.createElement('h2');
    h2.textContent = projectName;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('add-project');
    btn.textContent = '+ New Project';

    return [h2, btn];
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

    li.append(checkbox, h3, pDesc, pDue, btnSetDue);

    return li;
  }
  // ===== CREATE END ==== //

  // ===== LISTENERS ===== //
  // ===================== //
  static initButtonAddProject() {
    const btn = document.createElement('button');
    btn.classList.add('add-project');
    btn.type = 'button';
    btn.textContent = '+ New Project';

    projectContainer.append(btn);

    btn.addEventListener('click', () => addProjectModal.showModal());

    addProjectCancel.addEventListener('click', () => addProjectModal.close());

    addProjectSubmit.addEventListener('click', (e) => {
      Control.handleAddProject(e);
    });
  }
  // ===== LISTENER END == //

  // ===== RENDER ======== //
  // ===================== //
  static renderElements(elements, container) {
    // Empty container
    let child = container.lastElementChild;
    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }

    // Populate container
    elements.forEach((el) => {
      container.append(el);
    });
  }
  // ===== RENDER END ==== //
}
