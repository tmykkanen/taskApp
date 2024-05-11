/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import {
  describe,
  expect,
  test,
  assert,
} from 'vitest';
import Task from '../src/Task';
import Project from '../src/Project';

describe('Basic Functionality', () => {
  const projParams = {
    name: 'Proj 1',
    description: 'Proj 1 description',
    dueDate: Date.now(),
  };

  const newProjParams = {
    name: 'Renamed',
    description: 'Redescribed',
    dueDate: 'New Date',
  };

  const taskParams1 = {
    name: 'Todo 1',
    description: 'Todo 1 Desc',
    dueDate: Date.now(),
  };
  const taskParams2 = {
    name: 'Todo 2',
    description: 'Todo 2 Desc',
    dueDate: Date.now(),
  };

  test('create Project', () => {
    const proj = new Project(projParams.name, projParams.description, projParams.dueDate);

    expect(proj.name).toBe(projParams.name);
    expect(proj.description).toBe(projParams.description);
    expect(proj.dueDate).toBe(projParams.dueDate);
  });

  test('Project getters + defaults', () => {
    const proj = new Project(projParams.name);

    expect(proj.name).toBe(projParams.name);
    expect(proj.description).toBe(false);
    expect(proj.dueDate).toBe(false);
  });

  test('Project setters', () => {
    const proj = new Project(projParams.name);

    proj.name = newProjParams.name;
    proj.description = newProjParams.description;
    proj.dueDate = newProjParams.dueDate;

    expect(proj.name).toBe(newProjParams.name);
    expect(proj.description).toBe(newProjParams.description);
    expect(proj.dueDate).toBe(newProjParams.dueDate);
  });

  test('create Task in Project + getTask + getAllTasks', () => {
    const proj = new Project(projParams.name);

    proj.addTask(new Task(taskParams1.name));
    proj.addTask(new Task(taskParams2.name));

    const allTasks = proj.tasks;
    const targetTask = proj.getTask(taskParams1.name);
    expect(targetTask.name).toBe(taskParams1.name);
    assert.lengthOf(allTasks, 2, 'Two tasks in array');
  });

  test('delete task', () => {
    const proj = new Project(projParams.name);

    proj.addTask(new Task(taskParams1.name));
    proj.addTask(new Task(taskParams2.name));

    proj.deleteTask(taskParams1.name);

    const allTasks = proj.tasks;
    assert.lengthOf(allTasks, 1, 'One task in array');
  });
});

describe('Advanced Functionailty', () => {
  const projParams = {
    name: 'Proj 1',
    description: 'Proj 1 description',
    dueDate: Date.now(),
  };

  const taskParams1 = {
    name: 'Todo 1',
    description: 'Todo 1 Desc',
    dueDate: Date.now(),
  };

  test('move completed task to project archive + read from archive', () => {
    const proj = new Project(projParams.name);

    proj.addTask(new Task(taskParams1.name));

    proj.archiveTask(taskParams1.name);

    assert.lengthOf(proj.tasks, 0, 'No task in array');
    assert.lengthOf(proj.taskArchive, 1, 'One task in archive');

    expect(proj.taskArchive[0].name).toBe(taskParams1.name);
  });
});
