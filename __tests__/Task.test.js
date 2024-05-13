/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { describe, expect, test } from 'vitest';
import Task from '../src/Task';

// SETUP
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

const taskParamsDefaults = {
  taskName: 'Task 3',
};

describe('Basic Functions', () => {
  test('Getter + Setter', () => {
    const task = new Task(taskParams1);

    expect(task.name).toBe(taskParams1.taskName);
    expect(task.description).toBe(taskParams1.taskDescription);
    expect(task.dueDate).toBe(taskParams1.taskDueDate);

    task.name = taskParams2.taskName;
    task.description = taskParams2.taskDescription;
    task.dueDate = taskParams2.taskDueDate;

    expect(task.name).toBe(taskParams2.taskName);
    expect(task.description).toBe(taskParams2.taskDescription);
    expect(task.dueDate).toBe(taskParams2.taskDueDate);
  });

  test('defaults', () => {
    const task = new Task(taskParamsDefaults);

    expect(task.name).toBe(taskParamsDefaults.taskName);
    expect(task.description).toBe(false);
    expect(task.dueDate).toBe(false);
  });
});
