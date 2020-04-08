//inorder is left, root, right

/*
*
*
*/

function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
  return this;
}

function checkSameInorderTraversalWithoutAllNodes(node1, node2) {
  const traverse1 = []; //SPACE O(n)
  inorderTraversal(tree1, traverse1); //TIME O(n) because we visit every node
  return checkInorderTraversalWithQueue(node2, traverse1) && traverse1.length === 0; //TIME O(n) because we visit every node in tree2, and queue unshift is constant time
}

function checkInorderTraversalWithQueue(node, queue) {
  if (!node) {
    return true;
  }

  if (!checkInorderTraversalWithQueue(node.left, queue)) {
    return false;
  }

  if (queue.length === 0 || node.val !== queue.shift()) {
    return false;
  }

  return checkInorderTraversalWithQueue(node.right, queue);
}

function checkSameInorderTraversalWithAllNodes(tree1, tree2) {
  const traverse1 = [];
  inorderTraversal(tree1, traverse1);
  const traverse2 = [];
  inorderTraversal(tree2, traverse2);

  if (traverse1.length !== traverse2.length) {
    return false;
  }

  for (let i = 0; i < traverse1.length; i++) {
    if (traverse1[i] !== traverse2[i]) {
      return false;
    }
  }

  return true;
}

function inorderTraversal(node, arr) {
  if (!node) {
    return;
  }

  inorderTraversal(node.left, arr);
  arr.push(node.val);
  inorderTraversal(node.right, arr);
}

tree1 = new Node(5);
tree1.left = new Node(3);
tree1.left.left = new Node(1);
tree1.right = new Node(7);
tree1.right.left = new Node(6);
tree2 = new Node(3);
tree2.left = new Node(1);
tree2.right = new Node(6);
tree2.right.left = new Node(5);
tree2.right.right = new Node(7);
console.log(checkSameInorderTraversalWithAllNodes(tree1, tree2)); //true
console.log(checkSameInorderTraversalWithoutAllNodes(tree1, tree2)); //true