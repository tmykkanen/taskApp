/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */

const todoListMock = {
  projects: [
    {
      projectName: 'Inbox',
      projectDescription: 'Inbox Description',
      projectDueDate: false,
      projectTasks: [
        {
          taskName: 'Task 1 - Inbox',
          taskDescription: 'Task 1 - Inbox description',
          taskDueDate: '4/1/23',
          taskComplete: false,
        },
        {
          taskName: 'Task 2 - Inbox',
          taskDescription: 'Task 2 - Inbox description',
          taskDueDate: '3/1/23',
          taskComplete: false,
        },
      ],
      projectTaskArchive: [],
    },
    {
      projectName: 'Project 1',
      projectDescription: 'Project 1 Description',
      projectDueDate: '5/12/24',
      projectTasks: [
        {
          taskName: 'Task 1 - Proj',
          taskDescription: 'Task 1 description',
          taskDueDate: '5/1/23',
          taskComplete: false,
        },
        {
          taskName: 'Task 2 - Proj',
          taskDescription: 'Task 2 description',
          taskDueDate: '6/1/23',
          taskComplete: false,
        },
        {
          taskName: 'Task 4 - Proj',
          taskDescription: 'Task 4 description',
          taskDueDate: '7/1/23',
          taskComplete: true,
        },
      ],
      projectTaskArchive: [
        {
          taskName: 'Task 3 - Proj',
          taskDescription: 'Task 3 description',
          taskDueDate: '4/1/23',
          taskComplete: true,
        },
      ],
    },
  ],
};

export default class UIView {
  // DEV HELPER FUNCTION
  static run() {
    // console.log('===RUNNING UI===');
    // console.log(todoListMock.projects[0].projectTasks);
    const taskListHTML = this.createTaskList(todoListMock.projects[0].projectTasks);
    const taskContainer = document.querySelector('.main-container ul');
    this.renderList(taskListHTML, taskContainer);
    const projectListHTML = this.createProjectList(todoListMock.projects);
    const projectContainer = document.querySelector('.default-projects-container');
    this.renderList(projectListHTML, projectContainer);
  }

  static createTaskList(taskList) {
    return taskList.map((task) => {
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
      checkbox.id = taskName;
      checkbox.checked = taskComplete;

      const h3 = document.createElement('h3');
      h3.textContent = taskName;

      const pDesc = document.createElement('p');
      pDesc.classList.add('description');
      // pDesc.contentEditable = false
      pDesc.textContent = taskDescription;

      const pDue = document.createElement('p');
      pDue.classList.add('due-date');
      pDue.textContent = taskDueDate;

      const btnSetDue = document.createElement('button');
      btnSetDue.type = 'button';
      btnSetDue.textContent = 'Set Due Date';

      li.append(checkbox, h3, pDesc, pDue, btnSetDue);

      return li;
    });
  }

  static createProjectList(projectList) {
    return projectList.map((project) => {
      const { projectName } = project;

      const li = document.createElement('li');
      li.classList.add('project-list-item');
      li.textContent = projectName;

      return li;
    });
  }

  static renderList(list, container) {
    list.forEach((li) => {
      container.append(li);
    });
  }
}
