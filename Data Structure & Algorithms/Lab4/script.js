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
    console.log(this.items);
  }
}

let queueArray = new QueueArray();
queueArray.enQueue(1);
queueArray.enQueue(2);
queueArray.enQueue(3);

queueArray.print();

queueArray.deQueue(3);
