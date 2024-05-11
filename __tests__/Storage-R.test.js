/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/**
 * @vitest-environment happy-dom
 */

import {
  describe,
  test,
  expect,
  vi,
  afterEach,
  assert,
} from 'vitest';
import Storage from '../src/Storage-R';

// Guide for testing local storage
// https://runthatline.com/vitest-mock-localstorage/

describe('Test LocalStorage Class', () => {
  const key = 'Test item key';
  const data = 'Test data item';

  const getItemSpy = vi.spyOn(localStorage, 'getItem');
  const setItemSpy = vi.spyOn(localStorage, 'setItem');
  const removeItemSpy = vi.spyOn(localStorage, 'removeItem');

  afterEach(() => {
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    removeItemSpy.mockClear();
    localStorage.clear();
  });

  test('save', () => {
    Storage.save(key, data);
    expect(setItemSpy).toHaveBeenCalledWith(key, JSON.stringify(data));
  });

  test('load', () => {
    Storage.save(key, data);
    const loaded = Storage.load(key);
    expect(loaded).toBe(data);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });

  test('clear', () => {
    Storage.save(key, data);
    expect(localStorage.length).toBe(1);
    Storage.clear();
    expect(localStorage.length).toBe(0);
  });

  test('remove', () => {
    Storage.save(key, data);
    Storage.remove(key);
    expect(localStorage.length).toBe(0);
    expect(removeItemSpy).toHaveBeenCalledWith(key);
  });
});
