/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/**
 * @vitest-environment jsdom
 */
import {
  assert,
  describe,
  expect,
  test,
} from 'vitest';
import TodoList from '../src/TodoList';
import Project from '../src/Project';
import Task from '../src/Task';
import Storage from '../src/Storage';

describe.todo('Basic Functions', () => {
  // [ ] Set up local storage testing following guide
  // https://runthatline.com/vitest-mock-localstorage/
});
