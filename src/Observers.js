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
    this.observers.forEach((observer) => {
      if (data) return observer(data);
      return observer();
    });
  }
}

export const obsUpdateDATA = new Observable();
export const obsUpdateUI = new Observable();
