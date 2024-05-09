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

describe('Basic functions', () => {
  test('add project', () => {
    const ProjectParams = {
      name: 'Inbox',
      description: 'First proj desc',
      dueDate: Date.now(),
    };
    const list = new TodoList();
    list.addProject(new Project(ProjectParams));
    assert.lengthOf(list.projects, 1, 'array is 1');
  });

  test('get project', () => {
    const ProjectParams = {
      name: 'Inbox',
      description: 'First proj desc',
      dueDate: Date.now(),
    };
    const list = new TodoList();
    list.addProject(new Project(ProjectParams));

    expect(list.getProject(ProjectParams.name).name).toBe(ProjectParams.name);
  });
});
