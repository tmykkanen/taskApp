export class Observable {
  constructor() {
    this.observers = [];
  }

  subcribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

export const observeNewTodos = new Observable();
export const observeTodoListUpdate = new Observable();
