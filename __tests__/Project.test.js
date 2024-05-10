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

    expect(proj.getName).toBe(projParams.name);
    expect(proj.getDescription).toBe(false);
    expect(proj.getDueDate).toBe(false);
  });

  test('Project setters', () => {
    const proj = new Project(projParams.name);

    proj.setName = newProjParams.name;
    proj.setDescription = newProjParams.description;
    proj.setDueDate = newProjParams.dueDate;

    expect(proj.getName).toBe(newProjParams.name);
    expect(proj.getDescription).toBe(newProjParams.description);
    expect(proj.getDueDate).toBe(newProjParams.dueDate);
  });

  test('create Task in Project + getTask + getAllTasks', () => {
    const proj = new Project(projParams.name);

    proj.addTask(new Task(taskParams1.name));
    proj.addTask(new Task(taskParams2.name));

    const allTasks = proj.getAllTasks;
    const targetTask = proj.getTask(taskParams1.name);
    expect(targetTask.getName).toBe(taskParams1.name);
    assert.lengthOf(allTasks, 2, 'Two tasks in array');
  });

  test('delete task', () => {
    const proj = new Project(projParams.name);

    proj.addTask(new Task(taskParams1.name));
    proj.addTask(new Task(taskParams2.name));

    proj.deleteTask(taskParams1.name);

    const allTasks = proj.getAllTasks;
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

    assert.lengthOf(proj.getAllTasks, 0, 'No task in array');
    assert.lengthOf(proj.taskArchive, 1, 'One task in archive');

    expect(proj.getTaskArchive[0].name).toBe(taskParams1.name);
  });
});
