export function createObservable() {
  const observers = [];

  return {
    subscribe(fn) {
      observers.push(fn);
    },
    emit(value) {
      observers.forEach((fn) => fn(value));
    },
  };
}
