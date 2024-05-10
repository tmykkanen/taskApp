/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import {
  assert,
  describe,
  expect,
  test,
} from 'vitest';
import TodoList from '../src/TodoList';
import Project from '../src/Project';
import Task from '../src/Task';

describe('Basic functions', () => {
  const ProjParams1 = {
    name: 'Proj 1',
    description: 'Proj 1 description',
    dueDate: Date.now(),
  };

  test('add project', () => {
    const list = new TodoList();
    list.addProject(new Project(ProjParams1.name));
    assert.lengthOf(list.projects, 1, 'array is 1');
  });

  test('get project', () => {
    const list = new TodoList();
    list.addProject(new Project(ProjParams1.name));

    expect(list.getProject(ProjParams1.name).name).toBe(ProjParams1.name);
  });
});

describe('Advanced Function', () => {
  const ProjParams1 = {
    name: 'Proj 1',
    description: 'Proj 1 description',
    dueDate: Date.now(),
  };
  const ProjParams2 = { name: 'Proj 2' };
  const TaskParams1 = { name: 'Task 1' };
  const TaskParams2 = { name: 'Task 2' };

  test('Get Task From All Projects', () => {
    const data = new TodoList();

    data.addProject(new Project(ProjParams1.name));
    data.addProject(new Project(ProjParams2.name));
    const proj1 = data.getProject(ProjParams1.name);

    proj1.addTask(new Task(TaskParams1.name));
    proj1.addTask(new Task(TaskParams2.name));

    expect(data.getTaskFromAllProjects(TaskParams1.name).task.name).toBe(TaskParams1.name);
  });

  test('GetTaskParentProject', () => {
    const data = new TodoList();

    data.addProject(new Project(ProjParams1.name));
    data.addProject(new Project(ProjParams2.name));
    const proj1 = data.getProject(ProjParams1.name);
    const proj2 = data.getProject(ProjParams2.name);

    proj1.addTask(new Task(TaskParams1.name));
    proj2.addTask(new Task(TaskParams2.name));

    expect(data.getTaskParentProject(TaskParams2.name)).toBe(proj2);
  });

  test('Move Task from one project to another', () => {
    const data = new TodoList();

    data.addProject(new Project(ProjParams1.name));
    data.addProject(new Project(ProjParams2.name));

    const proj1 = data.getProject(ProjParams1.name);
    const proj2 = data.getProject(ProjParams2.name);

    proj1.addTask(new Task(TaskParams1.name));
    proj1.addTask(new Task(TaskParams2.name));

    data.moveTask(TaskParams1.name, ProjParams2.name);

    expect(proj2.getTask(TaskParams1.name).name).toBe(TaskParams1.name);
    expect(proj1.getTask(TaskParams1.name)).toBe(undefined);
  });
});
