/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import './style.css';
import UI from './src/UI-View';
import { DATA } from './src/TodoList';

document.addEventListener('DOMContentLoaded', () => {
  UI.loadHomepage();
});

// // use name as temp id for testing
// function getItemByUUIDRecursive(obj, name) {
//   // Get flattened object
//   const flatObj = Object.values(obj).flat();

//   const checkforTarget = flatObj.filter((value) => value === name);

//   if (checkforTarget.length === 1) {
//     return obj;
//   }

//   return flatObj.reduce((acc, val) => {
//     if (acc !== undefined) return acc;
//     if (typeof val === 'object') return objectNesting(val, name);
//   }, undefined);
// }

// console.log(getItemByUUIDRecursive(DATA, 'Project 1'));