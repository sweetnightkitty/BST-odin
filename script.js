function node (data) {
    return {
        data: data,
        leftChild: null,
        rightChild: null
    };
}

function tree () {

    function buildTree(myArray, start = 0, end = (myArray.length - 1)) {

        //Base case, when subarray becomes empty.
        if(start > end) {
            return null;
        }

        //Mid is the array index of the root data.
        const mid = Math.floor((end + start) / 2);

        //myArray at mid is the value to be assigned as data
        const root = node(myArray[mid]);

        //Recursively calculates mid and root of left and right subarrays and adds them (balanced) to the tree.
        root.leftChild = buildTree(myArray.slice(0, (mid)));
        root.rightChild = buildTree(myArray.slice(mid + 1));

        return root
    }

    return {
        buildTree: buildTree
    }

}

const testArray = [5, 6, 7, 8];
const testTree = tree();

//Displays resulting test tree
console.log(testTree.buildTree(testArray));