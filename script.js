function node (data) {
    return {
        data: data,
        leftChild: null,
        rightChild: null
    };
}

function tree (myArray, start = 0, end = myArray.length - 1) {
    //Base case, when array is empty.
    if(start > end) {
        return;
    }
    const mid = (end + start) / 2; // this value is equal to an array location
    const root = node(myArray[mid]); // myArray at mid, is the value to be assigned as data

    //root.leftChild needs to = left subArray
    //root.rightChild needs to = right subArray

    //recursively tree(root.leftChild);
    //recursively tree(root.rightChild);

    //return root
}