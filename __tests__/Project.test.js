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
  test('create Project', () => {
    const params = {
      name: 'Inbox',
      description: 'First proj desc',
      dueDate: Date.now(),
    };
    const proj = new Task(params);

    expect(proj.name).toBe(params.name);
    expect(proj.description).toBe(params.description);
    expect(proj.dueDate).toBe(params.dueDate);
  });

  test('Project getters', () => {
    const params = {
      name: 'Inbox',
      description: 'First proj desc',
      dueDate: Date.now(),
    };
    const proj = new Task(params);

    expect(proj.getName).toBe(params.name);
    expect(proj.getDescription).toBe(params.description);
    expect(proj.getDueDate).toBe(params.dueDate);
  });

  test('Project setters', () => {
    const params = {
      name: 'Inbox',
      description: 'First proj desc',
      dueDate: Date.now(),
    };
    const proj = new Task(params);

    const newParams = {
      name: 'Renamed',
      description: 'Redescribed',
      dueDate: 'New Date',
    };
    proj.setName = newParams.name;
    proj.setDescription = newParams.description;
    proj.setDueDate = newParams.dueDate;

    expect(proj.getName).toBe(newParams.name);
    expect(proj.getDescription).toBe(newParams.description);
    expect(proj.getDueDate).toBe(newParams.dueDate);
  });

  test('create Task in Project + getTask + getAllTasks', () => {
    const ProjectParams = {
      name: 'Inbox',
      description: 'First proj desc',
      dueDate: Date.now(),
    };
    const proj = new Project(ProjectParams);

    const TaskParams = {
      name: 'First Todo',
      description: 'First todo desc',
      dueDate: Date.now(),
    };

    const TaskParams2 = {
      name: 'Second Todo',
      description: 'Second todo desc',
      dueDate: Date.now(),
    };

    proj.addTask(new Task(TaskParams));
    proj.addTask(new Task(TaskParams2));
    const allTasks = proj.getAllTasks;
    const task = proj.getTask(TaskParams.name);
    expect(task.getName).toBe(TaskParams.name);
    assert.lengthOf(allTasks, 2, 'Two tasks in array');
  });

  test('delete task', () => {
    const ProjectParams = {
      name: 'Inbox',
      description: 'First proj desc',
      dueDate: Date.now(),
    };
    const proj = new Project(ProjectParams);

    const TaskParams = {
      name: 'First Todo',
      description: 'First todo desc',
      dueDate: Date.now(),
    };

    const TaskParams2 = {
      name: 'Second Todo',
      description: 'Second todo desc',
      dueDate: Date.now(),
    };
    proj.addTask(new Task(TaskParams));
    proj.addTask(new Task(TaskParams2));

    proj.deleteTask(TaskParams.name);

    const allTasks = proj.getAllTasks;
    assert.lengthOf(allTasks, 1, 'One task in array');
  });
});

describe('Advanced Functionailty', () => {
  test('move completed task to project archive + read from archive', () => {
    const ProjectParams = {
      name: 'Inbox',
      description: 'First proj desc',
      dueDate: Date.now(),
    };
    const proj = new Project(ProjectParams);

    const TaskParams = {
      name: 'First Todo',
      description: 'First todo desc',
      dueDate: Date.now(),
    };

    proj.addTask(new Task(TaskParams));

    proj.archiveTask(TaskParams.name);

    assert.lengthOf(proj.getAllTasks, 0, 'No task in array');
    assert.lengthOf(proj.taskArchive, 1, 'One task in archive');

    expect(proj.getTaskArchive[0].name).toBe(TaskParams.name);
  });
});
