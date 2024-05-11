/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
// import TodoList from './TodoList';
// import Project from './Project';
// import Task from './Task';

export default class UI {
  // Util
  static addSelfDestEventListener(element, currentEl, eventType, callback) {
    const handler = (e) => {
      if (!currentEl.contains(e.target)) {
        callback();
        element.removeEventListener(eventType, handler);
      }
    };
    element.addEventListener(eventType, handler);
  }

  static assembleTaskList(currentProject) {
    const currentProjectTaskList = currentProject.getAllTasks;
    const taskList = currentProjectTaskList.map((task) => {
      const li = document.createElement('li');
      li.classList.add('task-list-item', 'collapsed');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = task.name;
      checkbox.checked = task.getStatus;

      const h3 = document.createElement('h3');
      h3.textContent = task.name;

      const pDesc = document.createElement('p');
      pDesc.classList.add('description');
      // pDesc.contentEditable = false
      pDesc.textContent = task.description;

      const pDue = document.createElement('p');
      pDue.classList.add('due-date');
      pDue.textContent = task.dueDate;

      const btnSetDue = document.createElement('button');
      btnSetDue.type = 'button';
      btnSetDue.textContent = 'Set Due Date';

      li.append(checkbox, h3, pDesc, pDue, btnSetDue);

      return li;
    });
    return taskList;
  }

  // [ ] Refector to better organize event listeners
  static bindTaskEventListeners(taskList) {
    const addSelfDestEventListener = (element, currentEl, eventType, callback) => {
      const handler = (e) => {
        if (!currentEl.contains(e.target)) {
          callback();
          element.removeEventListener(eventType, handler);
        }
      };
      element.addEventListener(eventType, handler);
    };

    const dblclickMakesEditable = (el) => {
      el.addEventListener('dblclick', () => {
        el.classList.add('expanded');
        el.children[1].contentEditable = true;
        el.children[2].contentEditable = true;
        addSelfDestEventListener(document, el, 'click', () => {
          el.children[1].contentEditable = false;
          el.children[2].contentEditable = false;
          el.classList.remove('expanded');
        });
      });
    };

    taskList.forEach((li) => {
      dblclickMakesEditable(li);
    });
  }

  static renderTaskList(taskList, taskContainer) {
    taskList.forEach((li) => {
      taskContainer.append(li);
    });
  }
}

// [ ] event listener to complete todo
// [ ] when completed, cross off todo. Wait for keyboard shortcut to update render (a la things).
//      Move todo to 'Project Archive'?
