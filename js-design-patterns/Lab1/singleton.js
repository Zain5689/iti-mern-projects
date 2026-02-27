// 1
class CEO {
  static instance = null;

  constructor(name, age, address) {
    if (CEO.instance == null) {
      this.name = name;
      this.age = age;
      this.address = address;
      CEO.instance = this;
    } else {
      return CEO.instance;
    }
  }
}

let CEO1 = new CEO("Alice Smith", 52, "123 Executive Way");
let CEO2 = new CEO("Bob Jones", 40, "789 Fake St");
console.log("CEO 1:", CEO1);
console.log("CEO 2:", CEO2);

console.log("==================================");

// 4

class ConfigureVals {
  static instance = null;

  constructor(xpoint = 0, ypoint = 0, shape = null) {
    if (ConfigureVals.instance == null) {
      this.xpoint = xpoint;
      this.ypoint = ypoint;
      this.shape = shape;
      ConfigureVals.instance = this;
    } else {
      return ConfigureVals.instance;
    }
  }
}

const config1 = new ConfigureVals(10, 20, "Circle");
console.log("Config 1:", config1);
const config2 = new ConfigureVals(100, 200, "Square");
console.log("Config 2:", config2);
console.log("==================================");
