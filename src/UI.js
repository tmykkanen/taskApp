/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import TodoList from './TodoList';
import Project from './Project';
import Task from './Task';

// Utility function
function createHTML(el, cls, txt) {
  const html = document.createElement(el);
  if (cls) html.classList.add(cls);
  html.textContent = txt;
  return html;
}

export default function assembleTodos(todoList) {

}

// [ ] event listener to complete todo
// [ ] when completed, cross off todo. Wait for keyboard shortcut to update render (a la things).
//      Move todo to 'Project Archive'?
