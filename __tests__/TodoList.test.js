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
  const ProjectParams = {
    name: 'Inbox',
    description: 'First proj desc',
    dueDate: Date.now(),
  };

  test('add project', () => {
    const list = new TodoList();
    list.addProject(new Project(ProjectParams));
    assert.lengthOf(list.projects, 2, 'array is 2');
  });

  test('get project', () => {
    const list = new TodoList();
    list.addProject(new Project(ProjectParams));

    expect(list.getProject(ProjectParams.name).name).toBe(ProjectParams.name);
  });
});

describe('Advanced Function', () => {
  const ProjParams1 = { name: 'Proj 1' };
  const ProjParams2 = { name: 'Proj 2' };
  const TaskParams1 = { name: 'Task 1' };
  const TaskParams2 = { name: 'Task 2' };

  test('Get Task From All Projects', () => {
    const data = new TodoList();

    data.addProject(new Project(ProjParams1));
    data.addProject(new Project(ProjParams2));
    const proj1 = data.getProject(ProjParams1.name);

    proj1.addTask(new Task(TaskParams1));
    proj1.addTask(new Task(TaskParams2));

    expect(data.getTaskFromAllProjects(TaskParams1.name).task.name).toBe(TaskParams1.name);
  });

  test('GetTaskParentProject', () => {
    const data = new TodoList();

    data.addProject(new Project(ProjParams1));
    data.addProject(new Project(ProjParams2));
    const proj1 = data.getProject(ProjParams1.name);
    const proj2 = data.getProject(ProjParams2.name);

    proj1.addTask(new Task(TaskParams1));
    proj2.addTask(new Task(TaskParams2));

    expect(data.getTaskParentProject(TaskParams2.name)).toBe(proj2);
  });

  test('Move Task from one project to another', () => {
    const data = new TodoList();

    data.addProject(new Project(ProjParams1));
    data.addProject(new Project(ProjParams2));

    const proj1 = data.getProject(ProjParams1.name);
    const proj2 = data.getProject(ProjParams2.name);

    proj1.addTask(new Task(TaskParams1));
    proj1.addTask(new Task(TaskParams2));

    data.moveTask(TaskParams1.name, ProjParams2.name);

    expect(proj2.getTask(TaskParams1.name).name).toBe(TaskParams1.name);
    expect(proj1.getTask(TaskParams1.name)).toBe(undefined);
  });
});
