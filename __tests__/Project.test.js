/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { describe, expect, test } from 'vitest';
import Project from '../src/Project';
import Task from '../src/Task';

// SETUP
const projParams1 = {
  projectName: 'Project 1',
  projectDescription: 'Project 1 Desc',
  projectDueDate: '5/12/24',
};

const projParams2 = {
  projectName: 'Project 2',
  projectDescription: 'Project 2 Desc',
  projectDueDate: '5/11/24',
};

const projParamsDefaults = {
  projectName: 'Project 2',
};

const taskParams1 = {
  taskName: 'Task 1',
  taskDescription: 'Task 1 Desc',
  taskDueDate: '5/12/24',
};

const taskParams2 = {
  taskName: 'Task 2',
  taskDescription: 'Task 2 Desc',
  taskDueDate: '5/11/24',
};

describe('Basic Functions', () => {
  test('getter + setter', () => {
    const proj = new Project(projParams1);

    expect(proj.name).toBe(projParams1.projectName);
    expect(proj.description).toBe(projParams1.projectDescription);
    expect(proj.dueDate).toBe(projParams1.projectDueDate);

    proj.name = projParams2.projectName;
    proj.description = projParams2.projectDescription;
    proj.dueDate = projParams2.projectDueDate;

    expect(proj.name).toBe(projParams2.projectName);
    expect(proj.description).toBe(projParams2.projectDescription);
    expect(proj.dueDate).toBe(projParams2.projectDueDate);
  });

  test('defaults', () => {
    const proj = new Project(projParamsDefaults);

    expect(proj.name).toBe(projParamsDefaults.projectName);
    expect(proj.description).toBe(false);
    expect(proj.dueDate).toBe(false);
  });
});

describe('Task Manipulation', () => {
  test('addTask + getTask + getAllTasks + deleteTask', () => {
    const proj = new Project(projParams1);
    proj.addTask(new Task(taskParams1));
    proj.addTask(new Task(taskParams2));

    expect(proj.getAllTasks().length).toBe(2);
    expect(proj.getTask(taskParams1.taskName).name).toBe(taskParams1.taskName);

    proj.deleteTask(taskParams1.taskName);
    expect(proj.getAllTasks().length).toBe(1);
  });

  test('archiveTask + get/set ProjectTaskArchive', () => {
    const proj = new Project(projParams1);
    proj.addTask(new Task(taskParams1));
    proj.addTask(new Task(taskParams2));

    proj.archiveTask(taskParams1.taskName);

    expect(proj.getAllTasks().length).toBe(1);
    expect(proj.getAllTasks()[0].name).toBe(taskParams2.taskName);
    expect(proj.getProjectTaskArchive().length).toBe(1);
    expect(proj.getProjectTaskArchive()[0].name).toBe(taskParams1.taskName);

    const archive = new Project(projParams2);
    archive.setProjectTaskArchive(proj.getAllTasks());
    expect(archive.getProjectTaskArchive().length).toBe(1);
    expect(archive.getProjectTaskArchive()[0].taskName).toBe(taskParams2.taskName);
  });
});
