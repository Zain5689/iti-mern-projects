// Create Single LinkedList
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class singleLinkedList {
  constructor() {
    this.head = null;
  }
  // Add node at the end
  add(value) {
    let newNode = new Node(value);
    if (this.head == null) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
  // Print all nodes
  Print() {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
  // Count Nodes in MyList
  countNodes() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }
  // Search for a node
  SearchNode(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return `Founded`;
      }
      current = current.next;
    }
    return `Not Founded`;
  }

  // Insert at Beginning

  Insert(value) {
    let newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Remove a node
  removeNode(value) {
    if (this.head == null) {
      return;
    }
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  // Remove Duplicate Nodes

  removeAllDuplicates() {
    if (!this.head) return null;
    let seen = new Set();
    let currentNode = this.head;
    let prevNode = null;
    while (currentNode) {
      if (seen.has(currentNode.value)) {
        prevNode.next = currentNode.next;
      } else {
        seen.add(currentNode.value);
        prevNode = currentNode;
      }
      currentNode = currentNode.next;
    }
  }
}
let list = new singleLinkedList();
list.add(10);
list.add(20);
list.add(30);
list.add(40);
list.add(40);
list.add(10);

list.Insert(5);
list.Insert(100);

list.removeNode(30);

list.removeAllDuplicates();

list.Print();

console.log(`Number of Nodes: ${list.countNodes()}`);
console.log(`Search for 20: ${list.SearchNode(20)}`);
