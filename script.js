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

    return {
        root: this.buildTree(arr),

        prettyPrint: function (node = this.root, prefix = "", isLeft = true) {
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
                    const successor = this.findSuccessor(currentNode); // node of 3

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

        //Applies callback function to each node via level-order traversal
        levelOrder: function(callbackFunction = this.callback, currentNode = this.root) {
            if(typeof callbackFunction !== "function") {
                throw new Error ("A callback function is required.");
            }
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
        },

        findSuccessor: function(currentNode) {
            //First traverses to right child to explore all values larger than current node
            currentNode = currentNode.rightChild;
            //To find the smallest value among all the nodes that are larger than the current node (to be deleted)
            while(currentNode && currentNode.leftChild) {
                currentNode = currentNode.leftChild;
            }
            return currentNode;
        },

        //Applies callback function to each node via pre-order traversal
        preOrder: function(currentNode = this.root, callback = this.callback) {
            if(typeof callback !== "function") {
                throw new Error ("A callback function is required.");
            }

            //Base case:
            if(currentNode == null) {
                return;
            }
            //Visits the root(currentNode) first
            callback(currentNode);


            //Then visits the left, then the right
            const left = currentNode.leftChild;
            const right = currentNode.rightChild;
            this.preOrder(left);
            this.preOrder(right);

        },

        //Applies callback function to each node via in-order traversal
        inOrder: function(currentNode = this.root, callback = this.callback) {
            if(typeof callback !== "function") {
                throw new Error ("A callback function is required.");
            }

            //Base case
            if(!currentNode.leftChild) {
                callback(currentNode);
                return;
            }

            //Base case
            if(!currentNode.rightChild) {
                callback(currentNode);
                return;
            }

            const left = currentNode.leftChild;
            const right = currentNode.rightChild;

            //Vist the left, then the root(currentNode), then the right
            this.inOrder(left);
            callback(currentNode);
            this.inOrder(right);

        },

        //Applies callback function to each node via post-order traversal
        postOrder: function(currentNode = this.root, callback = this.callback) {
            if(typeof callback !== "function") {
                throw new Error ("A callback function is required.");
            }

            //Base case
            if(!currentNode.leftChild) {
                callback(currentNode);
                return;
            }

            //Base case
            if(!currentNode.rightChild) {
                callback(currentNode);
                return;
            }

            const left = currentNode.leftChild;
            const right = currentNode.rightChild;

            //Visit the left, then the right, then the root(currentNode)
            this.postOrder(left);
            this.postOrder(right);
            callback(currentNode);
        },

        height: function(node = this.root) {
            if(!node) {
                return -1;
            }
            const leftHeight = this.height(node.leftChild);
            const rightHeight = this.height(node.rightChild);

            return Math.max(leftHeight, rightHeight) + 1;
        },

        depth: function(value) {
            const rootHeight = this.height();

            //Find the node containing the provided value to get it's height in the tree
            const node = this.find(value);
            const nodeHeight = this.height(node);

            //Depth of the node = 
            return rootHeight - nodeHeight;
        },

        isBalanced: function(currentNode = this.root) {
            //Defaults: When the child node doesn't exist it's height can be thought of as -1
            let leftHeight = -1;
            let rightHeight = -1;

            //Base case:
            if(!currentNode) {
                return null;
            }

            //Calculate height of left child
            if(currentNode.leftChild) {
                leftHeight = this.height(currentNode.leftChild);
            }

            //Calculate height of right child
            if(currentNode.rightChild) {
                rightHeight = this.height(currentNode.rightChild);
            }

            //Base Case: If the absolute difference between left and right is > 1 it is not balanced
            if((leftHeight - rightHeight) < -1 || (leftHeight - rightHeight) > 1) {
                return false;
            } else {
                //Recursively check if each node is balanced
                this.isBalanced(currentNode.leftChild);
                this.isBalanced(currentNode.rightChild);
            }

            //If all nodes fail to trigger base cases the tree is balanced
            return true;
        },

        rebalance: function() {
            //Traverse the tree and log all node values into an array
            const newArray = [];
            this.levelOrder((node) => newArray.push(node.data));

            this.root = buildTree(newArray);
            return this.root;
        }
    }
}


//Driving Code
const unsortedArray = [2, 1, 9, 4, 5, 3, 5];

//Generate the tree and view in console
const test = tree(unsortedArray);
test.prettyPrint();

//Tests that values insert properly into the tree
test.insert(6);
test.insert(10);
test.prettyPrint();

//Tests that values delete properly from the tree
test.delete(4);
test.prettyPrint();

//Tests that find function works correctly
// console.log(test.find(5));


//Checks that tree traverses in correct order:
console.log("Level Order:");
test.levelOrder();

console.log("Pre Order:");
test.preOrder();

console.log("In Order:");
test.inOrder();

console.log("Post Order:");
test.postOrder();



//Checks height calculates correctly
console.log("Height:");
console.log(test.height());

//Checks that depth calculates correctly
console.log("Depth:");
console.log(test.depth(6));

//Test to confirm that is balanced returns true
console.log("is balanced?:");
console.log(test.isBalanced());

//Unbalance the tree and confirm the updates in console
test.delete(1);
test.delete(2);
test.delete(3);
test.prettyPrint();

//Test to confirm that isBalanced returns false
console.log("is balanced?:");
console.log(test.isBalanced());

//Rebalance tree and confirm changes in console
test.rebalance();
test.prettyPrint();

//Confirm new tree registers as balanced
console.log(test.isBalanced());
