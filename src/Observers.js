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

  notify(data = undefined) {
    console.log('obs fired');
    this.observers.forEach((observer) => {
      if (data) return observer(data);
      return observer();
    });
  }
}

export const obsAddProjectBtn = new Observable();
export const obsAddTaskBtn = new Observable();


export const observeNewTodos = new Observable();
export const observeTodoListUpdate = new Observable();

