/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { describe, expect, test } from 'vitest';
import Task from '../src/Task';

describe('Basic Functionality', () => {
  test('create Task', () => {
    const params = {
      name: 'First Todo',
      description: 'First todo desc',
      dueDate: Date.now(),
    };
    const task = new Task(params);
    expect(task.name).toBe(params.name);
    expect(task.description).toBe(params.description);
    expect(task.dueDate).toBe(params.dueDate);
  });

  test('check getters', () => {
    const params = {
      name: 'First Todo',
      description: 'First todo desc',
      dueDate: Date.now(),
    };
    const task = new Task(params);
    expect(task.getName).toBe(params.name);
    expect(task.getDescription).toBe(params.description);
    expect(task.getDueDate).toBe(params.dueDate);
  });

  test('check setters', () => {
    const params = {
      name: 'First Todo',
      description: 'First todo desc',
      dueDate: Date.now(),
    };
    const task = new Task(params);

    const newParams = {
      name: 'Renamed',
      description: 'Redescribed',
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
