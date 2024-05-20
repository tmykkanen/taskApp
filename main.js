/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import './style.css';
import UI from './src/UI-View';
import { obsUpdateDATA } from './src/Observers';
import Storage from './src/Storage';

export const DATA = Storage.getTodoList();

document.addEventListener('DOMContentLoaded', () => {
  UI.loadHomepage();
});

function notice(data) {
  console.log('data updated');
  console.log(data);
}

obsUpdateDATA.subcribe(notice);
