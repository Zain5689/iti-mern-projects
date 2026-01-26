const student = {
  name: "Nawal",
  age: 22
}

const handler = {
  get(target, prop) {
    console.log(`Someone accessed ${prop}`);
    return target[prop];
  },

  set(target, prop, value) {
    console.log(`Someone changed ${prop} to ${value}`);
    target[prop] = value;
  }
};

const proxyStudent = new Proxy(student, handler);

console.log(proxyStudent.name); 
proxyStudent.age = 25;

