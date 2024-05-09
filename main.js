/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import Project from './src/Project';
import TodoList from './src/TodoList';
import Task from './src/Task';

import './style.css';

const data = new TodoList();

// BUG Test code for working on moveTask
data.addProject(new Project({ name: 'test' }));
const proj = data.getProject('test');
proj.addTask(new Task({name: 'Task 1'}));
proj.addTask(new Task({name: 'Task 2'}));
proj.addTask(new Task({name: 'Task 3'}));

const projects = data.getAllProjects;
projects.forEach((proj) => console.log(proj.getAllTasks));

projects.forEach((proj) => {
  proj.getAllTasks
    .forEach((task) => {
      console.log(task);
      console.log(task.name === 'Task 2');
    });
});

const targetTask = projects
  .map((proj) => proj.getAllTasks.find((task) => task.name === 'Task 2'))
  .filter((x) => {
    if (x) return x;
  });

data.moveTask('Task 3', 'Inbox');

console.log('this');
console.log(data);
