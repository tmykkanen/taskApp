/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */

export default class Storage {
  static clear() {
    localStorage.clear();
  }

  static save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static load(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}
