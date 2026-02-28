// 1
class Store {
  constructor() {
    this.customers = [];
    this.product = "";
  }

  join(customer) {
    this.customers.push(customer);
  }

  unJoin(customer) {
    this.customers = this.customers.filter((custom) => custom !== customer);
  }

  notify(product) {
    this.customers.forEach((customer) => customer.update(product));
  }

  addProduct(product) {
    console.log(`product added :${product}`);
    this.notify(product);
  }
}

class Customer {
  constructor(name) {
    this.name = name;
  }
  update(product) {
    console.log(`${this.name} notified about ${product}`);
  }
}

let store = new Store();
let user1 = new Customer("zainab");
let user2 = new Customer("ali");

store.join(user1);
store.join(user2);

store.addProduct("phone");

// 2
class Pizza {
  getDescription() {
    return "pizza";
  }
  getCost() {
    return 0;
  }
}

class Margherita extends Pizza {
  getDescription() {
    return "Margherita";
  }
  getCost() {
    return 100;
  }
}

class ToppingDecorator extends Pizza {
  constructor(pizza) {
    super();
    this.pizza = pizza;
  }
}

class FreshTomato extends ToppingDecorator {
  getDescription() {
    return this.pizza.getDescription() + "fresh Tomato";
  }

  getCost() {
    return this.pizza.getCost() + 20;
  }
}

let pizza = new Margherita();
pizza = new FreshTomato(pizza);

console.log(pizza.getDescription());
console.log(pizza.getCost());

// 3
class DB {
  connect() {}
}
class MySqlBD extends DB {
  connect() {
    console.log("connect to Mysql");
  }
}
class MongoDB extends DB {
  connect() {
    console.log("connect to MongoDB");
  }
}

class Application {
  constructor(database) {
    this.database = database;
  }

  start() {
    this.database.connect();
  }
}

// Usage
const mysql = new MySQLDatabase();
const app = new Application(mysql);
app.start();
