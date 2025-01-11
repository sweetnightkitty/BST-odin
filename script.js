function node (data) {
    return {
        data: data,
        leftChild: null,
        rightChild: null
    };
}

function buildTree (arr, start = 0, end = (arr.length - 1)) {
    //Base case, when subarray becomes empty.
    if(start > end) {
        return null;
    }

    //Sorts the array numerically
    arr = [...new Set(arr)].sort((a, b) => {return a - b});

    //Mid is the array index of the root data.
    const mid = Math.floor((end + start) / 2);

    //arr at mid is the value to be assigned as data
    const root = node(arr[mid]);

    //Recursively calculates mid and root of left and right subarrays and adds them (balanced) to the tree.
    root.leftChild = this.buildTree(arr.slice(0, (mid)));
    //mid + 1 -> ensures that the root is EXCLUDED in the rightChild
    root.rightChild = this.buildTree(arr.slice(mid + 1));

    return root;
};

function tree(arr) {
    let root = buildTree(arr);

    return {
        root,

        prettyPrint: function (node = root, prefix = "", isLeft = true) {
            if (node === null) {
            return;
            }
            if (node.rightChild !== null) {
            this.prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
            }
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
            if (node.leftChild !== null) {
            this.prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
            }
        },

        insert: function(value) {
            //Insert something to the tree

            let currentNode = this.root;
            const newNode = node(value);

            while(currentNode) {
                //When value is smaller traverse left down the tree, when value is larger traverse right
                if(value < currentNode.data) {
                    //When you reach the bottom of the tree assign the newNode
                    if(!currentNode.leftChild) {
                        currentNode.leftChild = newNode;
                        return this.root;
                    }
                    //Continues left until you reach bottom of the tree
                    currentNode = currentNode.leftChild;
                } else if(value > currentNode.data) {
                    //When you reach the bottom of the tree assign the newNode
                    if(!currentNode.rightChild) {
                        currentNode.rightChild = newNode;
                        return this.root;
                    }
                    //Continues right until you reach bottom of the tree
                    currentNode = currentNode.rightChild;
                } else {
                    //In the case value is a duplicate do nothing
                    return this.root;
                }
            }
        },

        delete: function(value, currentNode = this.root) {
            //Base case: bottom of the tree reached, but value was not found (didn't exist) - breaks
            if(currentNode == null) {
                return currentNode;
            }
            
            if(value < currentNode.data) {
                //Applies a check whether to delete the next item down the tree to the LEFT 
                currentNode.leftChild = this.delete(value, currentNode.leftChild);
            } else if(value > currentNode.data) {
                //Applies a check whether to delete the next item down the tree to the RIGHT
                currentNode.rightChild = this.delete(value, currentNode.rightChild);
            } else if(value == currentNode.data) {

                if(!currentNode.leftChild && !currentNode.rightChild) {
                    currentNode = null;
                } else if(currentNode.leftChild && !currentNode.rightChild) {
                    currentNode = currentNode.leftChild;
                } else if(!currentNode.leftChild && currentNode.rightChild) {
                    currentNode = currentNode.rightChild;
                } else {
                    //when both children exist find the next in order successor
                    const successor = findSuccessor(currentNode); // node of 3

                    //sets current node equal to the successor
                    currentNode.data = successor.data;

                    //Recursively calls and deletes successor from it's original place in tree
                    currentNode.rightChild = this.delete(successor.data, currentNode.rightChild);
                }
            }

            return currentNode;
        },

        find: function(value, currentNode = this.root) {
            if(currentNode == null) {
                return currentNode;
            }
            if(value < currentNode.data) {
                currentNode = this.find(value, currentNode.leftChild);
            } else if(value > currentNode.data) {
                currentNode = this.find(value, currentNode.rightChild);
            }

            return currentNode;
        },

        levelOrder: function(callbackFunction = this.callback, currentNode = this.root) {
            //If the root is not defined exit
            if(currentNode == null) {
                return "tree";
            }

            //Create queue and put the root as the first item
            const queue = [];
            queue.push(currentNode);

            while(queue.length > 0) {
                //Pops out the first item of the array and applies callback
                const node = queue.shift();
                callbackFunction(node);

                //Enqueue the left child of node
                if(node.leftChild != null) {
                    queue.push(node.leftChild);
                }

                //Enqueue the right child node
                if(node.rightChild != null) {
                    queue.push(node.rightChild);
                }
            }
        },

        callback: function (node) {
            console.log(node.data);
        }
    }
}




function findSuccessor(currentNode) {
    //First traverses to right child to explore all values larger than current node
    currentNode = currentNode.rightChild;
    //To find the smallest value among all the nodes that are larger than the current node (to be deleted)
    while(currentNode && currentNode.leftChild) {
        currentNode = currentNode.leftChild;
    }
    return currentNode;
}

//Driving Code
const unsortedArray = [2, 1, 9, 4, 5, 3, 5];

const test = tree(unsortedArray);
test.prettyPrint();
test.insert(6);
test.insert(10);
test.prettyPrint();
test.delete(4);
test.prettyPrint();
// console.log(test.find(5));

test.levelOrder();
