// Queue

// Apply Queue on Array

class QueueArray {
  constructor() {
    this.items = [];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  enQueue(element) {
    this.items.push(element);
  }

  deQueue() {
    if (this.isEmpty()) {
      console.log("Queue is Empty");
      return;
    }
    this.items.shift();
  }

  print() {
    console.log(this.items.join("  => "));
  }
}

let queueArray = new QueueArray();
queueArray.enQueue(1);
queueArray.enQueue(2);
queueArray.enQueue(3);

queueArray.print();

queueArray.deQueue(3);
queueArray.print();

console.log("==================");

// Apply Queue on Single LinkedList

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class QueueSingleLinkedList {
  constructor() {
    this.front = null;
    this.tail = null;
  }

  isEmpty() {
    return this.front === null;
  }

  enQueue(element) {
    let newNode = new Node(element);
    if (this.isEmpty()) {
      this.front = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  deQueue() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return null;
    }

    let removedValue = this.front.value;
    this.front = this.front.next;
    return removedValue;
  }

  print() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return;
    }
    let current = this.front;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

let list = new QueueSingleLinkedList();
list.enQueue(1);
list.enQueue(2);
list.enQueue(3);
list.enQueue(4);
list.print();
list.deQueue();
console.log("===== After remove =====");
list.print();

console.log("===================");
// Apply Stack on Double LinkedList

class DoubleNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class QueueDoubleLinkedList {
  constructor() {
    this.front = null;
    this.tail = null;
  }

  isEmpty() {
    return this.front === null;
  }

  enQueue(element) {
    let newNode = new DoubleNode(element);
    if (this.isEmpty()) {
      this.front = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  deQueue() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return null;
    }
    let removedValue = this.front.value;
    this.front = this.front.next;
    if (this.front) {
      this.front.prev = null;
    } else {
      this.tail = null;
    }
    return removedValue;
  }

  print() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return;
    }
    let current = this.front;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

let doubleList = new QueueDoubleLinkedList();
doubleList.enQueue(1);
doubleList.enQueue(2);
doubleList.enQueue(3);
doubleList.enQueue(4);
doubleList.print();
doubleList.deQueue();
console.log("=======after remove=====");
doubleList.print();
