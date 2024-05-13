/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { describe, expect, test } from 'vitest';
import Project from '../src/Project';
import TodoList from '../src/TodoList';

// SETUP
const projParams1 = {
  projectName: 'Project 1',
  description: 'Project 1 Desc',
  dueDate: '5/12/24',
};

describe('Basic Functions', () => {
  test('addProject + getProject + getAllProjects + deleteProject', () => {
    const todoList = new TodoList();

    expect(todoList.getAllProjects().length).toBe(0);

    todoList.addProject(new Project(projParams1));
    expect(todoList.getAllProjects().length).toBe(1);

    expect(todoList.getProject(projParams1.projectName).name).toBe(projParams1.projectName);

    todoList.deleteProject(projParams1.projectName);
    expect(todoList.getAllProjects().length).toBe(0);
  });
});
