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
} from './UI-Control';

// [TODOS]
// [ ] Add error handling for modals
// [ ] Add error handling for task editing
// [x] implement drag-and-drop to change task project
// [?] implement task project picker
// [ ] add logic for expanding / collapsing todo list items
// [ ] add task sorting
// [ ] add set date button hover
// [ ] Fix sidebar container too many divs
// [ ] Add controls to delete task

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
    const defaultProjectHtml = allProjects
      .filter((project) => project.default === true)
      .map((project) => UI.createProjectItem(project));
    const customProjectHTLM = allProjects
      .filter((project) => project.default === false)
      .map((project) => UI.createProjectItem(project));
    // allProjects.map((project) => UI.createProjectItem(project));

    UI.renderElements(defaultProjectHtml, defaultProjectContainer);
    UI.renderElements(customProjectHTLM, customProjectContainer);

    UI.initAddProjectButton();
    UI.initActiveProjectSelection();
    UI.initDragAndDropReceivers();
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
    const { projectName } = project;

    const li = document.createElement('li');
    li.classList.add('project-list-item');
    li.dataset.uuid = project.uuid;
    if (project.active) li.classList.add('active');
    li.textContent = projectName;

    // const a = document.createElement('a');
    // a.href = '';
    // a.textContent = projectName;

    // li.append(a);

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
    pDesc.dataset.name = 'projectDescription';
    pDesc.textContent = projectDescription || 'Add a description...';

    const pDue = document.createElement('p');
    pDue.classList.add('due-date', 'project-data');
    pDue.dataset.name = 'projectDueDate';
    pDue.textContent = projectDueDate || 'Add a due date...';

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
    li.draggable = true;

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
    pDesc.dataset.name = 'taskDescription';
    pDesc.textContent = taskDescription || 'add a description...';

    const pDue = document.createElement('p');
    pDue.classList.add('due-date', 'task-data');
    pDue.dataset.name = 'taskDueDate';
    pDue.textContent = taskDueDate || 'add a due date...';

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
        const priorContent = e.target.textContent;
        handleDblClickBeginEditing(e);
        element.addEventListener('blur', () => {
          handleDblClickEndEditing(e, priorContent);
        });
      });
    });
  }

  static initCompleteTaskCheckbox() {
    const checkboxes = document.querySelectorAll('.task-list-item .checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        e.target.parentNode.classList.toggle('completed');
        handleEdits(e);
      });
      checkbox.addEventListener('mousedown', (e) => {
        e.target.parentNode.classList.add('mouse-down');
      });
      checkbox.addEventListener('mouseup', (e) => {
        e.target.parentNode.classList.remove('mouse-down');
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
      element.addEventListener('dragenter', (event) => {
        event.preventDefault();
        event.target.classList.add('drop-target');
      });

      element.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      element.addEventListener('dragleave', (event) => {
        event.preventDefault();
        event.target.classList.remove('drop-target');
      });

      // element.addEventListener('dragleave', (event) => {
      //   event.preventDefault();
      //   event.target.classList.remove('drop-target');
      // });

      element.addEventListener('drop', (event) => {
        event.preventDefault();
        event.target.classList.remove('drop-target');

        const sourceUUID = event.dataTransfer.getData('text');
        const targetUUID = event.target.dataset.uuid;
        if (DATA.getActiveProject().uuid === targetUUID) return;

        const sourceTask = DATA.getItemByUUID(sourceUUID);
        const targetProject = DATA.getItemByUUID(targetUUID);

        // remove sourceTask from DOM
        document.querySelector(`[data-uuid="${sourceUUID}"]`).remove();

        // add source task to target project
        targetProject.addTask(sourceTask);
        // remove source task from old project
        DATA.getActiveProject().deleteTask(sourceTask.name);
        // console.log(event.target.parentNode.classList);
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
