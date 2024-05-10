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
  test('create Task', () => {
    const task = new Task(params.name, params.description, params.dueDate);
    expect(task.name).toBe(params.name);
    expect(task.description).toBe(params.description);
    expect(task.dueDate).toBe(params.dueDate);
  });

  test('check getters + defaults', () => {
    const task = new Task(params.name);
    expect(task.getName).toBe(params.name);
    expect(task.getDescription).toBe(false);
    expect(task.getDueDate).toBe(false);
  });

  test('check setters', () => {
    const task = new Task(params.name);

    const newParams = {
      name: 'Task 1 Renamed',
      description: 'Task 1 Redescribed',
      dueDate: 'New Date',
    };

    task.setName = newParams.name;
    task.setDescription = newParams.description;
    task.setDueDate = newParams.dueDate;

    expect(task.getName).toBe(newParams.name);
    expect(task.getDescription).toBe(newParams.description);
    expect(task.getDueDate).toBe(newParams.dueDate);
  });
});
