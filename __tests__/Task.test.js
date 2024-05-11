/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { describe, expect, test } from 'vitest';
import Task from '../src/Task';

describe('Basic Functionality', () => {
  const params = {
    name: 'Task 1',
    description: 'Task 1 description',
    dueDate: Date.now(),
  };

  const newParams = {
    name: 'Task 1 Renamed',
    description: 'Task 1 Redescribed',
    dueDate: 'New Date',
  };

  test('create Task', () => {
    const task = new Task(params.name, params.description, params.dueDate);
    expect(task.name).toBe(params.name);
    expect(task.description).toBe(params.description);
    expect(task.dueDate).toBe(params.dueDate);
  });

  test('check defaults', () => {
    const task = new Task(params.name);
    expect(task.name).toBe(params.name);
    expect(task.description).toBe(false);
    expect(task.dueDate).toBe(false);
  });

  test('check setters', () => {
    const task = new Task(params.name);

    task.name = newParams.name;
    task.description = newParams.description;
    task.dueDate = newParams.dueDate;

    expect(task.name).toBe(newParams.name);
    expect(task.description).toBe(newParams.description);
    expect(task.dueDate).toBe(newParams.dueDate);
  });
});
