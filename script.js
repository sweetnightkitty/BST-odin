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

    const prettyPrint = (node = root, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.rightChild !== null) {
          prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.leftChild !== null) {
          prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
    
    
    return {
        root,
        prettyPrint
    }
}

//Driving Code
const unsortedArray = [2, 1, 9, 4, 5, 3, 5];

const test = tree(unsortedArray);
test.prettyPrint();