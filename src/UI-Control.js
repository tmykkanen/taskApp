/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */

import { obsAddProjectBtn, observeTodoListUpdate } from "./Observers";
import { DATA } from "./TodoList";
import Project from "./Project";

export default class Control {
  static handleAddProject(e) {
    e.preventDefault();
    console.log('handleAddProject');
    const modalForm = document.querySelector('.add-project-modal form');
    let formData = Array.from(modalForm.getElementsByClassName('input'));
    let formDataParsed = formData.reduce((obj, item) => ({ ...obj, [item.name]: item.value }), {});
    console.log(formDataParsed);
    DATA.addProject(new Project(formDataParsed));
    // BUG When clicked multiple times, fires exponentially more instances
    observeTodoListUpdate.notify([]);
    console.log(DATA);
  }
}

// // bindEvents
// addBookButton.addEventListener('click', () => {
//   formModal.showModal();
// });

// submit.addEventListener('click', (e) => {
//   // e.preventDefault();

//   if (bookshelf.find((book) => book.title === formTitle.value)) {
//     e.preventDefault();
//     if (warningHTML) return;
//     warningHTML = document.createElement('p');
//     warningHTML.textContent = 'This book is already in your library.';
//     warningHTML.classList.add('form-warning');
//     form.insertBefore(warningHTML, formAuthor);
//     return;
//   }

//   if (form.checkValidity()) {
//     e.preventDefault();
//     const { checked } = formReadStatus;
//     const status = checked === true ? 'read' : 'unread';

//     addBookToShelf(
//       formTitle.value,
//       formAuthor.value,
//       formPages.value,
//       status,
//     );
//     // eslint-disable-next-line no-use-before-define
//     render();
//     resetForm();
//   }
// });

// cancel.addEventListener('click', resetForm);
