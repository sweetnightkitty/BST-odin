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
                console.log("Done");
                console.log(currentNode.data);

                if(!currentNode.leftChild && !currentNode.rightChild) {
                    currentNode = null;
                    return currentNode;
                }
            }

            return currentNode;
        }
    }
}

//Driving Code
const unsortedArray = [2, 1, 9, 4, 5, 3, 5];

const test = tree(unsortedArray);
test.prettyPrint();
test.insert(6);
test.insert(10);
test.prettyPrint();
test.delete(3);
test.prettyPrint();