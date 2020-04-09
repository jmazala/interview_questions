//https://www.youtube.com/watch?v=xUHohVsidLA
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
  return this;
}

function maxPathForNode(node) {
  if (!node) {
    return 0; //this
  }

  //can have:
  //just left
  //just right
  //node and left
  //node and right
  return Math.max(
    0, //none
    maxPathForNode(node.left), //just left
    maxPathForNode(node.right), //just right
    node.val + maxPathForNode(node.left), //root and left
    node.val + maxPathForNode(node.right) //root and right
  );
}

//the root is special.  it can only be connected to 2 nodes
//so always include both subtrees and it's value
function maxPathForTree(root) {
  //can be negative values in the subtrees so might want to eliminate them entirely
  return root.val + Math.max(0, maxPathForNode(root.left)) + Math.max(0, maxPathForNode(root.right));
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right = new TreeNode(3);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);
console.log(maxPathForTree(root)); //18