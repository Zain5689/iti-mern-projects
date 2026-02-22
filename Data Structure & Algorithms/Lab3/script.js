// Apply Stack on Array, Single LinkedList and Double LinkedList
// Functions (Push Pop Print)

// Apply Stack on Array
class StackArray {
  constructor() {
    this.stack = [];
  }

  isEmpty() {
    return this.stack.length === 0;
  }
  isFull() {
    return this.stack.length === 10;
  }
  push(element) {
    if (this.isFull()) {
      console.log("Stack is full");
      return;
    }
    this.stack.push(element);
  }
  pop() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return null;
    }
    return this.stack.pop();
  }

  print() {
    console.log(this.stack.join(" -> "));
  }
}

let stackArray = new StackArray();
stackArray.push(1);
stackArray.push(2);
stackArray.push(3);
stackArray.push(4);
stackArray.print();
stackArray.pop();
stackArray.print();

console.log("=============================");

// Apply Stack on Single LinkedList

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class StackSingleLinkedList {
  constructor() {
    this.top = null;
  }

  isEmpty() {
    return this.top === null;
  }

  push(element) {
    let newNode = new Node(element);
    newNode.next = this.top;
    this.top = newNode;
  }

  pop() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return null;
    }
    let poppedValue = this.top.value;
    this.top = this.top.next;
    return poppedValue;
  }

  print() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return;
    }
    let current = this.top;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

let list = new StackSingleLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.print();
list.pop();
console.log("==========After pop=====");
list.print();

console.log("=============================");
// Apply Stack on Double LinkedList

class DoubleNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class StackDoubleLinkedList {
  constructor() {
    this.top = null;
  }

  isEmpty() {
    return this.top === null;
  }

  push(element) {
    let newNode = new DoubleNode(element);
    if (this.isEmpty()) {
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top.prev = newNode;
      this.top = newNode;
    }
  }

  pop() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return null;
    }
    let poppedValue = this.top.value;
    this.top = this.top.next;
    if (this.top) {
      this.top.prev = null;
    }
    return poppedValue;
  }

  print() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return;
    }
    let current = this.top;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

let doubleList = new StackDoubleLinkedList();
doubleList.push(1);
doubleList.push(2);
doubleList.push(3);
doubleList.push(4);
doubleList.print();
doubleList.pop();
console.log("==========after pop=============");
doubleList.print();
