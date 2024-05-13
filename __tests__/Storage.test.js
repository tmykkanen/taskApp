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
import Project from '../src/Project';
import Task from '../src/Task';
import TodoList from '../src/TodoList';
import Storage from '../src/Storage';

// SETUP
const todoList = new TodoList();

const projParams1 = {
  projectName: 'Project 1',
  projectDescription: 'Project 1 Desc',
  projectDueDate: '5/12/24',
};
todoList.addProject(new Project(projParams1));
const proj1 = todoList.getProject(projParams1.projectName);

const taskParams1 = {
  taskName: 'Task 1',
  taskDescription: 'Task 1 Desc',
  taskDueDate: '5/12/24',
};
proj1.addTask(new Task(taskParams1));

const getItemSpy = vi.spyOn(localStorage, 'getItem');
const setItemSpy = vi.spyOn(localStorage, 'setItem');

describe('Basic Functions', () => {
  afterEach(() => {
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    localStorage.clear();
  });

  test('saveTodoList', () => {
    Storage.saveTodoList(todoList);
    expect(localStorage.getItem('todoList')).toBe(JSON.stringify(todoList));
    expect(setItemSpy).toHaveBeenCalledWith('todoList', JSON.stringify(todoList));
  });

  test('getTodoList', () => {
    Storage.saveTodoList(todoList);
    const todoList2 = Storage.getTodoList();
    expect(todoList2).toStrictEqual(todoList);
    expect(getItemSpy).toHaveBeenCalledWith('todoList');
  });
});
