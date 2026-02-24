class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // insert value in the binary tree
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // delete value from the binary tree
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(value, node = this.root) {
    if (!node) return null;
    if (value < node.value) {
      node.left = this.deleteNode(value, node.left);
    } else if (value > node.value) {
      node.right = this.deleteNode(value, node.right);
    } else {
      // no child
      if (!node.left && !node.right) {
        return null;
      }
      // one child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // two children
      let successor = this.findMin(node.right);
      node.value = successor.value;
      node.right = this.deleteNode(successor.value, node.right);
    }
    return node;
  }
  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  // print the binary tree in-order
  print(node) {
    if (node) {
      this.print(node.left);
      console.log(node.value);
      this.print(node.right);
    }
  }
}
let tree = new BinarySearchTree();
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(2);
tree.insert(4);
tree.insert(6);
tree.insert(8);
tree.print(tree.root);
tree.deleteNode(3);
console.log("After deletion:");
tree.print(tree.root);
