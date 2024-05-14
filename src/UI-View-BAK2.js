/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */

import { DATA } from './TodoList';

const projectContainer = document.querySelector('.default-projects-container ul');
const taskListHeaderContainer = document.querySelector('.task-list-header');
const tasksContainer = document.querySelector('.main-container ul');
const addProjectModal = document.querySelector('.add-project-modal');
const addProjectSubmit = document.querySelector('.add-project-modal .submit');
const addProjectCancel = document.querySelector('.add-project-modal .cancel');
const projects = DATA.getAllProjects();

// ===== LOAD PAGE ===== //
// ===================== //
export default function loadHomepage() {
  loadProjectSidebar();
}

function loadProjectSidebar() {
  const projectHTML = projects.map((project) => createProjectItem(project));
  renderElements(projectHTML, projectContainer);
  initAddProjectButton();
  initAddProjectModal();
}
// ===== LOAD END ====== //

// ===== CREATE ======== //
// ===================== //
function createProjectItem(project) {
  const { projectName } = project;

  const li = document.createElement('li');
  li.classList.add('project-list-item');
  li.textContent = projectName;

  return li;
}

function createBtn(className, textContent) {
  const btn = document.createElement('button');
  btn.classList.add(className);
  btn.type = 'button';
  btn.textContent = textContent;
  return btn;
}

// ===== CREATE END ==== //

// ===== INIT ========== //
// ===================== //

function initAddProjectButton() {
  const btn = createBtn('add-project', '+ New Project');
  projectContainer.append(btn);

  btn.addEventListener('click', () => addProjectModal.showModal());
}

function initAddProjectModal() {
  addProjectCancel.addEventListener('click', () => addProjectModal.close());

  addProjectSubmit.addEventListener('click', () => {
    // [ ] Add addProject Handler
    console.log('handler needed');
  });
}

// ===== LISTENER END == //

// ===== RENDER ======== //
// ===================== //
function renderElements(elements, container) {
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

// const projectHTML = projects.map((project) => UI.createProjectItem(project));
// const taskHTML = tasks.map((task) => UI.createTaskItem(task));

// ****** APP FLOW ******* //
// MASTER - LoadHomepage
// 1. Load Project Sidebar
//  1.1 - Create Project Sidebar HTML
//  1.2 - Append Project Sidebar HTML to container element
//  1.3 - Initiate Project Sidebar Button
