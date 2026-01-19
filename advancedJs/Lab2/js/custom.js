// 4.	Implement linked list using ES6 [create class node, and Class linkedList, to simulate linked list].

// Class to represent a single element (Node)
class Node {
  constructor(data) {
    this.data = data;
    this.next = null; // Points to the next node, defaults to null
  }
}

// Class to represent the Linked List
class LinkedList {
  constructor() {
    this.head = null; // The start of the list
    this.size = 0; // To keep track of the number of nodes
  }

  // Method to add a node at the end
  add(data) {
    const newNode = new Node(data);

    // If list is empty, make newNode the head
    if (this.head === null) {
      this.head = newNode;
    } else {
      // Traverse to the end of the list
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      // Link the last node to the new node
      current.next = newNode;
    }
    this.size++;
  }

  // Method to print the list data
  printList() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.data + " -> ";
      current = current.next;
    }
    console.log(result + "null");
  }
}

// --- Demo ---
const myList = new LinkedList();
myList.add("Node A");
myList.add("Node B");
myList.add("Node C");

myList.printList();
// Output: Node A -> Node B -> Node C -> null
