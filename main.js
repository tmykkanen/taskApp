/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import './style.css';
import UI from './src/UI-View';
import { DATA } from './src/TodoList';
import Task from './src/Task';

document.addEventListener('DOMContentLoaded', () => {
  UI.loadHomepage();
});

// const proj = DATA.getActiveProject();

// console.log(proj);

// proj.deleteTask('Task 1');
// console.log(proj);

// proj.undeleteTask('Task 1');
