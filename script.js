function node (data) {
    return {
        data: data,
        leftChild: null,
        rightChild: null
    };
}

function tree () {

    function buildTree(arr, start = 0, end = (arr.length - 1)) {

        //Base case, when subarray becomes empty.
        if(start > end) {
            return null;
        }

        //Sorts the array numerically
        arr = arr.sort((a, b) => {return a - b});

        //Mid is the array index of the root data.
        const mid = Math.floor((end + start) / 2);

        //arr at mid is the value to be assigned as data
        const root = node(arr[mid]);

        //Recursively calculates mid and root of left and right subarrays and adds them (balanced) to the tree.
        root.leftChild = buildTree(arr.slice(0, (mid)));
        //mid + 1 -> ensures that the root is EXCLUDED in the rightChild
        root.rightChild = buildTree(arr.slice(mid + 1));

        return root
    }

    return {
        buildTree: buildTree,
    }

}

const testArray = [5, 6, 7, 8];
const testTree = tree();
const unsortedArray = [2, 1, 9, 4, 5, 3];

//Displays resulting test tree
console.log(testTree.buildTree(testArray));
console.log(testTree.buildTree(unsortedArray));

