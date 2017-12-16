const expect = require('chai').expect;
const Heap = require('../Heap');
const HeapNode = require('../HeapNode');

describe('new Heap()', function () {
    it('should create a new Heap object', function () {
        const heap1 = new Heap('min');
        const heap2 = new Heap('max');
        expect(heap1.root).to.be.null;
        expect(heap1.nodeList).to.be.an('array').that.is.empty;
        expect(heap1.size).to.equal(0);
        expect(heap1.heapType).to.equal('min');
        expect(heap2.heapType).to.equal('max');
    });

    it('should throw an error on any input other than min and max', function () {
        expect(() => new Heap()).to.throw('heapType must be either "min" or "max."');
        expect(() => new Heap('foo')).to.throw();
    });
});

describe('Calling insert', function () {
    let heapNodes = [];

    beforeEach(function () {
        for (let i = 0; i < 15; i++) heapNodes.push(new HeapNode(i));
    });

    afterEach(function () {
        heapNodes = [];
    });

    it('should add to the end of node list and update size appropriately', function () {
        const minHeap = new Heap('min');
        expect(minHeap.nodeList).to.be.an('array').that.is.empty;
        expect(minHeap.size).to.equal(0);
        minHeap.insert(heapNodes[8]);
        expect(minHeap.nodeList[0]).to.equal(heapNodes[8]);
        expect(minHeap.nodeList.length).to.equal(1);
        expect(minHeap.size).to.equal(1);
        minHeap.insert(heapNodes[0]);
        expect(minHeap.nodeList[1]).to.equal(heapNodes[0]);
        expect(minHeap.nodeList.length).to.equal(2);
        expect(minHeap.size).to.equal(2);
    });

    it('should set the root if the root is null', function () {
        const minHeap = new Heap('min');
        expect(minHeap.root).to.be.null;
        minHeap.insert(heapNodes[0]);
        expect(minHeap.root).to.equal(heapNodes[0]);
    });

    it('should update the root of a min heap if node is less than current root', function () {
        const minHeap = new Heap('min');
        minHeap.insert(heapNodes[1]);
        minHeap.insert(heapNodes[2]);
        minHeap.insert(heapNodes[3]);
        expect(minHeap.root.value).to.equal(1);
        minHeap.insert(heapNodes[0]);
        expect(minHeap.root.value).to.equal(0);
    });

    it('should update the root of a max heap if node is greater than current root', function () {
        const maxHeap = new Heap('max');
        maxHeap.insert(heapNodes[1]);
        maxHeap.insert(heapNodes[2]);
        maxHeap.insert(heapNodes[3]);
        expect(maxHeap.root.value).to.equal(3);
        maxHeap.insert(heapNodes[4]);
        expect(maxHeap.root.value).to.equal(4);
    });

    it('should insert nodes such that there are no disconnected nodes', function () {
        const minHeap = new Heap('min');

        // Randomly shuffle nodes in the node array and insert them into the heap
        shuffle(heapNodes);
        heapNodes.forEach((node) => minHeap.insert(node));

        // Iterate through list of nodes and confirm root contains all nodes
        heapNodes.forEach((node) => expect(minHeap.root.contains(node)).to.be.true);
    });

    it('should insert into a min heap such that parents are always >= children', function () {
        const minHeap = new Heap('min');

        // Randomly shuffle nodes in the node array and insert them into the heap
        shuffle(heapNodes);
        heapNodes.forEach((node) => minHeap.insert(node));

        // Iterate through list of nodes and confirm parent-child relationship is correct
        heapNodes.forEach((node) => {
            if (node.parent) expect(node.value >= node.parent.value ).to.be.true; // Greater than parent
            if (node.left) expect(node.value <= node.left.value).to.be.true; // Less than children
            if (node.right) expect(node.value <= node.right.value).to.be.true;
        });
    });

    it('should insert into a max heap such that parents are always <= children', function () {
        const maxHeap = new Heap('max');

        // Randomly shuffle nodes in the node array and insert them into the heap
        shuffle(heapNodes);
        heapNodes.forEach((node) => maxHeap.insert(node));

        // Iterate through list of nodes and confirm parent-child relationship is correct
        heapNodes.forEach((node) => {
            if (node.parent) expect(node.value <= node.parent.value).to.be.true; // Less than parent
            if (node.left) expect(node.value >= node.left.value).to.be.true; // Greater than children
            if (node.right) expect(node.value >= node.right.value).to.be.true;
        });
    });

    it('should insert random nodes into a min heap such that parents are always >= children', function () {
        let testNodes = [];
        let numTestNodes = 10000;

        for (let i = 0; i < numTestNodes; i++) {
            testNodes.push(new HeapNode(Math.floor(Math.random() * 100 - 50)));
        }

        const minHeap = new Heap('min');
        testNodes.forEach((node) => minHeap.insert(node));

        testNodes.forEach((node) => {
            if (node.parent) expect(node.value >= node.parent.value).to.be.true; // Greater than parent
            if (node.left) expect(node.value <= node.left.value).to.be.true; // Less than children
            if (node.right) expect(node.value <= node.right.value).to.be.true;
        });
    });

    it('should insert random nodes into a max heap such that parents are always >= children', function () {
        let testNodes = [];
        let numTestNodes = 10000;

        for (let i = 0; i < numTestNodes; i++) {
            testNodes.push(new HeapNode(Math.floor(Math.random() * 100 - 50)));
        }

        const minHeap = new Heap('max');
        testNodes.forEach((node) => minHeap.insert(node));

        testNodes.forEach((node) => {
            if (node.parent) expect(node.value <= node.parent.value).to.be.true; // Greater than parent
            if (node.left) expect(node.value >= node.left.value).to.be.true; // Less than children
            if (node.right) expect(node.value >= node.right.value).to.be.true;
        });
    });
});

describe('Calling pop', function () {
    let heapNodes = [];
    let numTestNodes = 10000;

    beforeEach(function () {
        for (let i = 0; i < numTestNodes; i++) {
            heapNodes.push(new HeapNode(Math.floor(Math.random() * 10)));
        }
    });

    afterEach(function () {
        heapNodes = [];
    });

    it('should pop off the root and update the min heap accordingly', function () {
        let minHeap = new Heap('min');
        heapNodes.forEach((node) => minHeap.insert(node));

        // Confirm heap is ordered correctly
        expect(minHeap.size).to.equal(numTestNodes);
        heapNodes.forEach((node) => {
            if (node.parent) expect(node.value >= node.parent.value ).to.be.true; // Greater than parent
            if (node.left) expect(node.value <= node.left.value).to.be.true; // Less than children
            if (node.right) expect(node.value <= node.right.value).to.be.true;
        });

        // Pop off root
        let rootValue = minHeap.root.value;
        let popped = minHeap.pop();
        expect(popped.value).to.equal(rootValue);
        expect(minHeap.size).to.equal(numTestNodes - 1);
        for (let i = 0; i < heapNodes.length; i++) {
            let node = heapNodes[i];
            if (node === popped) {
                expect(minHeap.root.contains(node)).to.be.false;
            } else {
                if (node.parent) expect(node.value >= node.parent.value ).to.be.true; // Greater than parent
                if (node.left) expect(node.value <= node.left.value).to.be.true; // Less than children
                if (node.right) expect(node.value <= node.right.value).to.be.true;
            }
        }
    });

    it('should pop off the root and update the max heap accordingly', function () {
        let maxHeap = new Heap('max');
        heapNodes.forEach((node) => maxHeap.insert(node));

        // Confirm heap is ordered correctly
        expect(maxHeap.size).to.equal(numTestNodes);
        heapNodes.forEach((node) => {
            if (node.parent) expect(node.value <= node.parent.value).to.be.true; // Less than parent
            if (node.left) {
                //console.log('>>>');
                //console.log(node.value);
                //console.log(node.left.value);
                //console.log(node.right === null);
                expect(node.value >= node.left.value).to.be.true;
            } // Greater than children
            if (node.right) expect(node.value >= node.right.value).to.be.true;
        });

        // Pop off root
        let rootValue = maxHeap.root.value;
        let popped = maxHeap.pop();
        expect(popped.value).to.equal(rootValue);
        expect(maxHeap.size).to.equal(numTestNodes - 1);
        for (let i = 0; i < heapNodes.length; i++) {
            let node = heapNodes[i];
            if (node === popped) {
                expect(maxHeap.root.contains(node)).to.be.false;
            } else {
                if (node.parent) expect(node.value <= node.parent.value).to.be.true; // Less than parent
                if (node.left) expect(node.value >= node.left.value).to.be.true; // Greater than children
                if (node.right) expect(node.value >= node.right.value).to.be.true;
            }
        }
    });
});

/** Randomly shuffles array in place */
function shuffle(array) {
    let j = 0;
    let temp = null;

    for (let i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}