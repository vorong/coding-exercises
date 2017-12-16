const Heap = require('./Heap');
const HeapNode = require('./HeapNode');

class RunningMedianUsingHeaps {
    constructor() {
        this.leftHeap = new Heap('max');
        this.rightHeap = new Heap('min');
    }

    insert(value) {
        let node = new HeapNode(value);
        if (this.leftHeap.size === 0) {
            this.leftHeap.insert(node);
        } else if (this.rightHeap.size === 0) {
            if (node.value < this.leftHeap.root.value) {
                this.rightHeap = new Heap('min');
                this.rightHeap.insert(new HeapNode(this.leftHeap.root.value));
                this.leftHeap = new Heap('max');
                this.leftHeap.insert(new HeapNode(node.value));
            } else {
                this.rightHeap.insert(node);
            }
        } else if (this.leftHeap.size === this.rightHeap.size) {
            if (node.value <= this.rightHeap.root.value) {
                this.leftHeap.insert(node);
            } else {
                this.rightHeap.insert(node);
            }
        } else if (this.leftHeap.size <= this.rightHeap.size) {
            if (node.value <= this.rightHeap.root.value) {
                this.leftHeap.insert(node);
            } else {
                this.leftHeap.insert(new HeapNode(this.rightHeap.pop().value));
                this.rightHeap.insert(node);
            }
        } else {
            if (node.value >= this.leftHeap.root.value) {
                this.rightHeap.insert(node);
            } else {
                this.rightHeap.insert(new HeapNode(this.leftHeap.pop().value));
                this.leftHeap.insert(node);
            }
        }
    }

    getMedian() {
        if (this.leftHeap.size === this.rightHeap.size) {
            return (this.leftHeap.root.value + this.rightHeap.root.value) / 2;
        } else if (this.leftHeap.size < this.rightHeap.size) {
            return this.rightHeap.root.value;
        } else {
            return this.leftHeap.root.value;
        }
    }
}

module.exports = RunningMedianUsingHeaps;