class SortedLinkedList {
    /**
     * Creates a SortedLinkedList of integers with underlying array of
     * pointers to nodes for each value to speed up insertions.  Assumes
     * values are within range of {0, size}.
     */
    constructor(size) {
        this.medianNodeLeft = null;
        this.medianNode = null;
        this.medianNodeRight = null;
        this.count = 0;
        this.pointers = new Array(size);
        this.pointers.fill(null);
        this.firstNode = null;
        this.lastNode = null;
    }

    /**
     * Finds the node value contained in the list greater than node.
     * @param {Number} node The node to look to the right of
     * @return {Number|null} The number of the node greater than node
     *                       or null if a value doesn't exist
     */
    findNextAfter(node) {
        let value = node.value + 1;
        while (value < this.pointers.length) {
            if (this.pointers[value] !== null) {
                return this.pointers[value];
            }
            value++;
        }
        return null;
    }

    /**
     * Finds the node value contained in the list less than node.
     * @param {Number} node The node to look to the left of
     * @return {Number|null} The number of the node less than node
     *                       or null if a value doesn't exist
     */
    findPrevBefore(node) {
        let value = node.value - 1;
        while (value >= 0) {
            if (this.pointers[value] !== null) {
                return this.pointers[value];
            }
            value--;
        }
        return null;
    }

    /**
     * Inserts node directly to the right of currentNode.
     * @param {LinkedListNode} currentNode The node to insert next to
     * @param {LinkedListNode} node The node to insert
     */
    insertToRight(currentNode, node) {
        if (currentNode.next === null) {
            currentNode.next = node;
            node.prev = currentNode;
            this.count++;
        } else {
            currentNode.next.prev = node;
            node.prev = currentNode;
            node.next = currentNode.next;
            currentNode.next = node;
            this.count++;
        }
    }

    /**
     * Inserts node directly to the left of currentNode.
     * @param {LinkedListNode} currentNode The node to insert next to
     * @param {LinkedListNode} node The node to insert
     */
    insertToLeft(currentNode, node) {
        if (currentNode.prev === null) {
            currentNode.prev = node;
            node.next = currentNode;
            this.count++;
        } else {
            currentNode.prev.next = node;
            node.prev = currentNode.prev;
            node.next = currentNode;
            currentNode.prev = node;
            this.count++;
        }
    }

    /**
     * Starting at currentNode, loops through to the right and inserts node
     * into the correct location.  Always ensures that new node is inserted
     * after all entries of the same value, i.e. at the end of all the
     * exsting '48' nodes.
     * @param {LinkedListNode} currentNode The node to start from
     * @param {LinkedListNode} node The node to insert
     */
    loopAndInsertOnRight(currentNode, node) {
        while (currentNode.next !== null) {
            if (node.value < currentNode.value) {
                this.insertToLeft(currentNode, node);
                return;
            }
            currentNode = currentNode.next;
        }

        // Got to end of list
        if (node.value < currentNode.value) {
            this.insertToLeft(currentNode, node);
        } else {
            this.insertToRight(currentNode, node);
            this.lastNode = node;
        }
    }

    /**
     * Starting at currentNode, loops through to the left and inserts node
     * into the correct location.  Always ensures that new node is inserted
     * after all entries of the same value, i.e. at the end of all the
     * exsting '48' nodes.
     * @param {LinkedListNode} currentNode The node to start from
     * @param {LinkedListNode} node The node to insert
     */
    loopAndInsertOnLeft(currentNode, node) {
        while (currentNode.prev !== null) {
            if (node.value >= currentNode.value) {
                // In case current number has multiple entries, calling
                // loopAndInsertOnRight ensures that node is always inserted
                // at the end of all entries of the same value, i.e. at the
                // end of all the existing '48' nodes
                this.loopAndInsertOnRight(currentNode, node);
                return;
            }
            currentNode = currentNode.prev;
        }

        // Got to end of list
        if (node.value < currentNode.value) {
            this.insertToLeft(currentNode, node);
            this.firstNode = node;
        } else {
            this.insertToRight(currentNode, node);
        }
    }

    /**
     * Inserts the node into the SortedLinkedList while maintaining sort order.
     * @param {Number} value The node to insert
     * @return {LinkedListNode} The inserted node
     */
    insert(value) {
        let node = new LinkedListNode(value);
        if (this.pointers[node.value] === null) {
            this.pointers[node.value] = node;
        }

        if (this.count === 0) {
            this.medianNode = node;
            this.count++;
            this.firstNode = node;
            this.lastNode = node;
            return node;
        }

        if (isOdd(this.count)) {
            let currentNode = this.medianNode;
            if (node.value === this.medianNode.value) {
                this.insertToRight(currentNode, node);
                this.medianNodeLeft = currentNode;
                this.medianNode = null;
                this.medianNodeRight = node;
            } else if (node.value > this.medianNode.value) {
                let nextNode = this.findNextAfter(node);
                if (nextNode !== null) {
                    this.loopAndInsertOnRight(nextNode, node);
                } else {
                    this.insertToRight(this.lastNode, node);
                    this.lastNode = node;
                }
                this.medianNodeLeft = currentNode;
                this.medianNode = null;
                this.medianNodeRight = currentNode.next;
            } else if (node.value < this.medianNode.value) {
                let prevNode = this.findPrevBefore(node);
                if (prevNode !== null) {
                    this.loopAndInsertOnLeft(prevNode, node);
                } else {
                    this.insertToLeft(this.firstNode, node);
                    this.firstNode = node;
                }
                this.medianNodeLeft = currentNode.prev;
                this.medianNode = null;
                this.medianNodeRight = currentNode;
            }
        } else {
            if (node.value === this.medianNodeLeft.value ||
                (node.value > this.medianNodeLeft.value && node.value < this.medianNodeRight.value)) {
                this.insertToRight(this.medianNodeLeft, node);
                this.medianNode = node;
                this.medianNodeLeft = null;
                this.medianNodeRight = null;
            } else if (node.value === this.medianNodeRight.value) {
                this.insertToRight(this.medianNodeRight, node);
                this.medianNode = this.medianNodeRight;
                this.medianNodeLeft = null;
                this.medianNodeRight = null;
            } else if (node.value > this.medianNodeRight.value) {
                let nextNode = this.findNextAfter(node);
                if (nextNode !== null) {
                    this.loopAndInsertOnRight(nextNode, node);
                } else {
                    this.insertToRight(this.lastNode, node);
                    this.lastNode = node;
                }
                this.medianNode = this.medianNodeRight;
                this.medianNodeLeft = null;
                this.medianNodeRight = null;
            } else if (node.value < this.medianNodeLeft.value) {
                let prevNode = this.findPrevBefore(node);
                if (prevNode !== null) {
                    this.loopAndInsertOnLeft(prevNode, node);
                } else {
                    this.insertToLeft(this.firstNode, node);
                    this.firstNode = node;
                }
                this.medianNode = this.medianNodeLeft;
                this.medianNodeLeft = null;
                this.medianNodeRight = null;
            }
        }
        return node;
    }

    /**
     * Gets the median of the SortedLinkedList.
     * @return {Number} The median of the SortedLinkedList
     */
    getMedian() {
        if (isOdd(this.count)) {
            return this.medianNode.value;
        } else {
            return (this.medianNodeRight.value + this.medianNodeLeft.value) / 2;
        }
    }
}

class LinkedListNode {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * Determines if number is odd.
 * @param {Number} number
 * @return {boolean} Whether or not number is odd
 */
function isOdd(number) {
    if (number % 2 == 0) {
        return false;
    } else {
        return true;
    }
}

module.exports = SortedLinkedList;