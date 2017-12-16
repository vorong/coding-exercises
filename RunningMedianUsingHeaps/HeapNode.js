class HeapNode {
    constructor(value = null) {
        this.value = value;
        this.parent = null;
        this.left = null;
        this.right = null;
        this.size = 1;
    }

    insert(node) {
        this.size++;
        if (this.left === null) {
            this.left = node;
            node.parent = this;
        } else if (this.right === null) {
            this.right = node;
            node.parent = this;
        } else if (this.left.size <= this.right.size) {
            this.left.insert(node);
        } else {
            this.right.insert(node);
        }
    }

    remove() {
        if (this.left || this.right) throw new Error('Cannot remove non-leaf node');
        if (this.parent === null) throw new Error('Cannot remove root node');

        // Decrement size of parent chain
        let parentNode = this.parent;
        while (parentNode !== null) {
            parentNode.size--;
            parentNode = parentNode.parent;
        }

        if (this.parent.left === this) {
            this.parent.left = null;
        } else {
            this.parent.right = null;
        }

        this.parent = null;
    }

    contains(node) {
        let result = false;
        if (this === node) return true;
        if (this.left) result = result || this.left.contains(node);
        if (this.right) result = result || this.right.contains(node);
        return result;
    }

    swapValuesWith(node) {
        [this.value, node.value] = [node.value, this.value];
    }
}

module.exports = HeapNode;