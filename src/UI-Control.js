/* eslint-disable no-param-reassign */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import Observable from './Observable';

// [ ] Move consts to static property of class?
const input = document.querySelector('form.add-task input');
const btn = document.querySelector('form.add-task button');
export const observeNewTodos = new Observable();

export class UIControl {
  // BUG Spaghetti Code

  static run() {
    this.bindEvents();
  }

  static bindEvents() {
    btn.addEventListener('click', (e) => {
      this.addTaskClickHandler(e);
    });
  }

  static addTaskClickHandler() {
    observeNewTodos.notify(input.value);
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
