/* eslint-disable no-param-reassign */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { observeNewTodos } from './Observers';

// [ ] Move consts to static property of class?
const input = document.querySelector('form.add-task input');
const btn = document.querySelector('form.add-task button');

export default class UIControl {
  // BUG Spaghetti Code

  static run() {
    this.bindEvents();
  }

  static bindEvents() {
    btn.addEventListener('click', (e) => {
      this.addTaskClickHandler(e);
    });
  }

  static bindOnCheck() {
    const checkboxes = document.querySelectorAll('.task-list-item .checkbox');
    checkboxes.forEach((el) => {
      el.addEventListener('change', () => {
        // [ ] left off here
        console.log('check - modify to notify TodoList of change');
      });
    });
  }

  static addTaskClickHandler() {
    const data = [{ taskName: input.value }, 'Project 1'];
    observeNewTodos.notify(data);
  }

  // =================//
  // [ ] Move to UIControl?
  // [ ] event listener to complete todo
  // [ ] when completed, cross off todo. Wait for keyboard shortcut to update render (a la things).
  //      Move todo to 'Project Archive'?
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
}
