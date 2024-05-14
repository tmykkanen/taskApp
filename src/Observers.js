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
    console.log('obs fired');
    this.observers.forEach((observer) => observer(data));
  }
}

export const observeNewTodos = new Observable();
export const observeTodoListUpdate = new Observable();
export const obsAddProjectBtn = new Observable();
