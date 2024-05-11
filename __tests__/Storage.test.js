/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/**
 * @vitest-environment happy-dom
 */
import {
  describe,
  expect,
  test,
  vi,
  afterEach,
} from 'vitest';
import TodoList from '../src/TodoList';
import Project from '../src/Project';
import Task from '../src/Task';
import Storage from '../src/Storage';

// Guide for testing local storage
// https://runthatline.com/vitest-mock-localstorage/

describe('Basic Functions', () => {
  // SETUP
  const todoList = new TodoList();
  const ProjParams1 = { name: 'Proj 1' };
  const ProjParams2 = { name: 'Proj 2' };
  const TaskParams1 = { name: 'Task 1' };
  const TaskParams2 = { name: 'Task 2' };

  todoList.addProject(new Project(ProjParams1.name));
  todoList.addProject(new Project(ProjParams2.name));
  const proj1 = todoList.getProject(ProjParams1.name);

  proj1.addTask(new Task(TaskParams1.name));
  proj1.addTask(new Task(TaskParams2.name));

  const getItemSpy = vi.spyOn(localStorage, 'getItem');
  const setItemSpy = vi.spyOn(localStorage, 'setItem');

  afterEach(() => {
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    localStorage.clear();
  });

  test('saveTodoList', () => {
    Storage.saveTodoList(todoList);
    expect(setItemSpy).toHaveBeenCalledWith('todoList', JSON.stringify(todoList));
  });

  test('Test saveTodoList + getTodoList', () => {
    Storage.saveTodoList(todoList);
    expect(Storage.getTodoList()).toStrictEqual(todoList);
    expect(getItemSpy).toHaveBeenCalledWith('todoList');
  });
});
