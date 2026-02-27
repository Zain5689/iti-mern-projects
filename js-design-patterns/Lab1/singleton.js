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
console.log(CEO1, CEO2);
