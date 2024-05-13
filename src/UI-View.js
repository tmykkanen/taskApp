/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
export default class UIView {
  static createTaskList(projectGetAllTasks) {
    return projectGetAllTasks.map((task) => {
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

  static createProjectList(todoListGetAllProjects) {
    return todoListGetAllProjects.map((project) => {
      const { projectName } = project;

      const li = document.createElement('li');
      li.classList.add('project-list-item');
      li.textContent = projectName;

      return li;
    });
  }

  static renderList(list, container) {
    // Empty container
    let child = container.lastElementChild;
    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }

    // Populate container
    list.forEach((li) => {
      container.append(li);
    });
  }
}

// let e = document.querySelector("ul");

//         //e.firstElementChild can be used.
//         let child = e.lastElementChild;
//         while (child) {
//             e.removeChild(child);
//             child = e.lastElementChild;
//         }
