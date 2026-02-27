// 2
class Vehicle {
  constructor(type, brand, model, year) {
    this.type = type;
    this.brand = brand;
    this.model = model;
    this.year = year;
  }
}

class Car extends Vehicle {
  constructor(brand, model, year) {
    super("car", brand, model, year);
  }
}

class Truck extends Vehicle {
  constructor(brand, model, year) {
    super("truck", brand, model, year);
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, model, year) {
    super("motorcycle", brand, model, year);
  }
}

class VehicleFactory {
  constructor(type, brand, model, year) {
    switch (type.toLowerCase()) {
      case "car":
        return new Car(brand, model, year);
      case "truck":
        return new Truck(brand, model, year);
      case "motorcycle":
        return new Motorcycle(brand, model, year);
      default:
        throw new Error("Vehicle type not supported");
    }
  }
}

let car1 = new VehicleFactory("car", "Toyota", "Corolla", 2022);
let truck1 = new VehicleFactory("truck", "Ford", "F-150", 2021);
let motorcycle1 = new VehicleFactory("motorcycle", "Honda", "CBR", 2023);

console.log(car1);
console.log(truck1);
console.log(motorcycle1);
console.log("==================================");

// 3

class Toy {
  constructor(type, color, price, name) {
    this.type = type;
    this.color = color;
    this.price = price;
    if (name) this.name = name;
  }
}
class ToyDuck extends Toy {
  constructor(color, price) {
    super("ToyDuck", color, price);
  }
}
class ToyCar extends Toy {
  constructor(color, price, name) {
    super("ToyCar", color, price, name);
  }
}

class ToyFactory {
  constructor(type, color, price, name) {
    switch (type) {
      case "ToyDuck":
        return new ToyDuck(color, price);
      case "ToyCar":
        return new ToyCar(color, price, name);
      default:
        throw new Error("ToyFactory type not supported");
    }
  }
}

let ToyDuck1 = new ToyFactory("ToyDuck", "red", 100);
let ToyCar1 = new ToyFactory("ToyCar", "red", 100, "bb");

console.log(ToyDuck1);
console.log(ToyCar1);
console.log("==================================");
