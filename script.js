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

        //MergeSort

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

    function mergeSort(arr) {
        //Base case; When arr can no longer divide
        if(arr.length == 1) {
            return arr;
        };

        const midPoint = Math.floor(arr.length / 2);
        const left = arr.slice(0, midPoint);
        const right = arr.slice(midPoint);

        return merge(mergeSort(left), mergeSort(right));
        
    }

    function merge(left, right) {
        //where left & right are arrays of length = 1 (at first)
        let mergedArray = [],
        rightIndex = 0,
        leftIndex = 0;

        while(leftIndex < left.length && rightIndex < right.length) {
            if(left[leftIndex] < right[rightIndex]) {
                mergedArray.push(left[leftIndex]);
                leftIndex++; //Move to the next element in the left array
            } else {
                mergedArray.push(right[rightIndex]);
                rightIndex++; //Move to the next element in the right array
            }
        }
        
        return mergedArray
        //Concats the remaining elements from either the left or right (if there are any)
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
    }

    return {
        buildTree: buildTree,
        mergeSort: mergeSort
    }

}

const testArray = [5, 6, 7, 8];
const testTree = tree();

//Displays resulting test tree
console.log(testTree.buildTree(testArray));
