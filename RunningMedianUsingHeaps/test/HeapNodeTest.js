const expect = require('chai').expect;
const HeapNode = require('../HeapNode');

describe('Calling new HeapNode()', function () {
    it('should create a new HeapNode object', function () {
        const heapNode1 = new HeapNode(0);
        const heapNode2 = new HeapNode({ foo: 'bar'});
        const heapNode3 = new HeapNode();
        expect(heapNode1.value).to.equal(0);
        expect(heapNode1.parent).to.be.null;
        expect(heapNode1.left).to.be.null;
        expect(heapNode1.right).to.be.null;
        expect(heapNode1.size).to.equal(1);
        expect(heapNode2.value).to.be.an('object');
        expect(heapNode2.value.foo).to.equal('bar');
        expect(heapNode3.value).to.be.null;
  });
});

describe('Calling insert and remove', function () {
    let heapNodes = [];

    beforeEach(function () {
        for (let i = 0; i < 10; i++) heapNodes.push(new HeapNode(i));
    });

    afterEach(function () {
        heapNodes = [];
    });

	it('should insert value first in left child, then in right', function () {
        // Insert first node
        heapNodes[0].insert(heapNodes[1]);
        expect(heapNodes[0].parent).to.be.null;
        expect(heapNodes[0].left).to.equal(heapNodes[1]);
        expect(heapNodes[0].right).to.be.null;
        expect(heapNodes[0].size).to.equal(2);

        // Insert second node
        heapNodes[0].insert(heapNodes[2]);
        expect(heapNodes[0].parent).to.be.null;
        expect(heapNodes[0].left).to.equal(heapNodes[1]);
        expect(heapNodes[0].right).to.equal(heapNodes[2]);
        expect(heapNodes[0].size).to.equal(3);
        expect(heapNodes[1].parent).to.equal(heapNodes[0]);
        expect(heapNodes[1].left).to.be.null;
        expect(heapNodes[1].right).to.be.null;
        expect(heapNodes[1].size).to.equal(1);
        expect(heapNodes[2].parent).to.equal(heapNodes[0]);
        expect(heapNodes[2].left).to.be.null;
        expect(heapNodes[2].right).to.be.null;
        expect(heapNodes[2].size).to.equal(1);
    });

    it('should fill all left nodes first, then all right nodes', function () {
        // Insert four nodes
        heapNodes[0].insert(heapNodes[1]);
        heapNodes[0].insert(heapNodes[2]);
        heapNodes[0].insert(heapNodes[3]);
        heapNodes[0].insert(heapNodes[4]);
        expect(heapNodes[0].parent).to.be.null;
        expect(heapNodes[0].left).to.equal(heapNodes[1]);
        expect(heapNodes[0].right).to.equal(heapNodes[2]);
        expect(heapNodes[0].size).to.equal(5);
        expect(heapNodes[1].parent).to.equal(heapNodes[0]);
        expect(heapNodes[1].left).to.be.equal(heapNodes[3]);
        expect(heapNodes[1].right).to.be.null;
        expect(heapNodes[1].size).to.equal(2);
        expect(heapNodes[2].parent).to.equal(heapNodes[0]);
        expect(heapNodes[2].left).to.be.equal(heapNodes[4]);
        expect(heapNodes[2].right).to.be.null;
        expect(heapNodes[2].size).to.equal(2);
        expect(heapNodes[3].parent).to.equal(heapNodes[1]);
        expect(heapNodes[3].left).to.be.null;
        expect(heapNodes[3].right).to.be.null;
        expect(heapNodes[3].size).to.equal(1);
        expect(heapNodes[4].parent).to.equal(heapNodes[2]);
        expect(heapNodes[4].left).to.be.null;
        expect(heapNodes[4].right).to.be.null;
        expect(heapNodes[4].size).to.equal(1);
        heapNodes[0].insert(heapNodes[5]);
        heapNodes[0].insert(heapNodes[6]);
        expect(heapNodes[0].parent).to.be.null;
        expect(heapNodes[0].left).to.equal(heapNodes[1]);
        expect(heapNodes[0].right).to.equal(heapNodes[2]);
        expect(heapNodes[0].size).to.equal(7);
        expect(heapNodes[1].parent).to.equal(heapNodes[0]);
        expect(heapNodes[1].left).to.be.equal(heapNodes[3]);
        expect(heapNodes[1].right).to.be.equal(heapNodes[5]);
        expect(heapNodes[1].size).to.equal(3);
        expect(heapNodes[2].parent).to.equal(heapNodes[0]);
        expect(heapNodes[2].left).to.be.equal(heapNodes[4]);
        expect(heapNodes[2].right).to.be.equal(heapNodes[6]);
        expect(heapNodes[2].size).to.equal(3);
        expect(heapNodes[3].parent).to.equal(heapNodes[1]);
        expect(heapNodes[3].left).to.be.null;
        expect(heapNodes[3].right).to.be.null;
        expect(heapNodes[3].size).to.equal(1);
        expect(heapNodes[4].parent).to.equal(heapNodes[2]);
        expect(heapNodes[4].left).to.be.null;
        expect(heapNodes[4].right).to.be.null;
        expect(heapNodes[4].size).to.equal(1);
        expect(heapNodes[5].parent).to.equal(heapNodes[1]);
        expect(heapNodes[5].left).to.be.null;
        expect(heapNodes[5].right).to.be.null;
        expect(heapNodes[5].size).to.equal(1);
        expect(heapNodes[6].parent).to.equal(heapNodes[2]);
        expect(heapNodes[6].left).to.be.null;
        expect(heapNodes[6].right).to.be.null;
        expect(heapNodes[6].size).to.equal(1);
    });

    it('should remove a leaf node successfully', function () {
        heapNodes[0].insert(heapNodes[1]);
        heapNodes[0].insert(heapNodes[2]);
        heapNodes[0].insert(heapNodes[3]);
        heapNodes[0].insert(heapNodes[4]);
        heapNodes[0].insert(heapNodes[5]);
        heapNodes[0].insert(heapNodes[6]);

        // Confirm state is as expected
        expect(heapNodes[2].left).to.equal(heapNodes[4]);
        expect(heapNodes[2].size).to.equal(3);
        expect(heapNodes[4].parent).to.equal(heapNodes[2]);

        // Remove a node
        heapNodes[4].remove();
        expect(heapNodes[2].left).to.be.null;
        expect(heapNodes[2].size).to.equal(2);
        expect(heapNodes[4].parent).to.be.null;
    });

    it('should throw an error when trying to remove a non-leaf node or root note', function () {
        expect(() => heapNodes[0].remove()).to.throw('Cannot remove root node');
        heapNodes[0].insert(heapNodes[1]);
        heapNodes[0].insert(heapNodes[2]);
        heapNodes[0].insert(heapNodes[3]);
        expect(() => heapNodes[0].remove()).to.throw('Cannot remove non-leaf node');
        expect(() => heapNodes[1].remove()).to.throw('Cannot remove non-leaf node');
    });

    it('should fill in gaps correctly to keep the tree balanced', function () {
        // Add size nodes to make a full tree
        heapNodes[0].insert(heapNodes[1]);
        heapNodes[0].insert(heapNodes[2]);
        heapNodes[0].insert(heapNodes[3]);
        heapNodes[0].insert(heapNodes[4]);
        heapNodes[0].insert(heapNodes[5]);
        heapNodes[0].insert(heapNodes[6]);

        // Create a gap by removing a node
        heapNodes[4].remove();
        expect(heapNodes[2].left).to.be.null;
        expect(heapNodes[2].size).to.equal(2);

        // Insert a node
        heapNodes[0].insert(heapNodes[7]);
        expect(heapNodes[2].left).to.equal(heapNodes[7]);
        expect(heapNodes[2].size).to.equal(3);
        expect(heapNodes[7].parent).to.equal(heapNodes[2]);
    });
});

describe('Calling contains', function () {
    let heapNodes = [];

    beforeEach(function () {
        for (let i = 0; i < 10; i++) heapNodes.push(new HeapNode(i));
    });

    afterEach(function () {
        heapNodes = [];
    });

    it('should return true if the heap contains node', function () {
        let root = heapNodes[0];
        for (let i = 1; i < heapNodes.length; i++) root.insert(heapNodes[i]);
        for (let i = heapNodes.length - 1; i >=0; i--) expect(root.contains(heapNodes[i])).to.be.true;
    });

    it('should return false if the heap does not contain node', function () {
        let root = heapNodes[0];
        let insertedNodes = [];
        let notInsertedNodes = [];

        insertedNodes.push(root);
        for (let i = 1; i < heapNodes.length; i++) {
            if (Math.random() < 0.5) {
                root.insert(heapNodes[i]);
                insertedNodes.push(heapNodes[i]);
            } else {
                notInsertedNodes.push(heapNodes[i]);
            }
        }

        insertedNodes.forEach((node) => expect(root.contains(node)).to.be.true);
        notInsertedNodes.forEach((node) => expect(root.contains(node)).to.be.false);
    });
});

describe('Calling swapValuesWith', function () {
    let heapNodes = [];

    beforeEach(function () {
        for (let i = 0; i < 10; i++) heapNodes.push(new HeapNode(i));
    });

    afterEach(function () {
        heapNodes = [];
    });

    it('should swap values of two nodes without disturbing rest of tree', function () {
        let root = heapNodes[0];
        for (let i = 1; i < heapNodes.length; i++) root.insert(heapNodes[i]);

        // Confirm tree is connected as expected
        expect(heapNodes[0].parent).to.be.null;
        expect(heapNodes[0].left).to.equal(heapNodes[1]);
        expect(heapNodes[0].right).to.equal(heapNodes[2]);
        expect(heapNodes[1].parent).to.equal(heapNodes[0]);
        expect(heapNodes[1].left).to.equal(heapNodes[3]);
        expect(heapNodes[1].right).to.equal(heapNodes[5]);
        expect(heapNodes[2].parent).to.equal(heapNodes[0]);
        expect(heapNodes[2].left).to.equal(heapNodes[4]);
        expect(heapNodes[2].right).to.equal(heapNodes[6]);
        expect(heapNodes[3].parent).to.equal(heapNodes[1]);
        expect(heapNodes[3].left).to.equal(heapNodes[7]);
        expect(heapNodes[3].right).to.be.null;
        expect(heapNodes[4].parent).to.equal(heapNodes[2]);
        expect(heapNodes[4].left).to.equal(heapNodes[8]);
        expect(heapNodes[4].right).to.be.null;
        expect(heapNodes[5].parent).to.equal(heapNodes[1]);
        expect(heapNodes[5].left).to.equal(heapNodes[9]);
        expect(heapNodes[5].right).to.be.null;
        expect(heapNodes[6].parent).to.equal(heapNodes[2]);
        expect(heapNodes[6].left).to.be.null;
        expect(heapNodes[6].right).to.be.null;
        expect(heapNodes[7].parent).to.equal(heapNodes[3]);
        expect(heapNodes[7].left).to.be.null;
        expect(heapNodes[7].right).to.be.null;
        expect(heapNodes[8].parent).to.equal(heapNodes[4]);
        expect(heapNodes[8].left).to.be.null;
        expect(heapNodes[8].right).to.be.null;
        expect(heapNodes[9].parent).to.equal(heapNodes[5]);
        expect(heapNodes[9].left).to.be.null;
        expect(heapNodes[9].right).to.be.null;

        // Swap nodes
        heapNodes[1].swapValuesWith(heapNodes[5]);
        heapNodes[7].swapValuesWith(heapNodes[6]);

        // Confirm values are updated and tree structure has not changed
        expect(heapNodes[1].value).to.equal(5);
        expect(heapNodes[5].value).to.equal(1);
        expect(heapNodes[7].value).to.equal(6);
        expect(heapNodes[6].value).to.equal(7);
        expect(heapNodes[0].parent).to.be.null;
        expect(heapNodes[0].left).to.equal(heapNodes[1]);
        expect(heapNodes[0].right).to.equal(heapNodes[2]);
        expect(heapNodes[1].parent).to.equal(heapNodes[0]);
        expect(heapNodes[1].left).to.equal(heapNodes[3]);
        expect(heapNodes[1].right).to.equal(heapNodes[5]);
        expect(heapNodes[2].parent).to.equal(heapNodes[0]);
        expect(heapNodes[2].left).to.equal(heapNodes[4]);
        expect(heapNodes[2].right).to.equal(heapNodes[6]);
        expect(heapNodes[3].parent).to.equal(heapNodes[1]);
        expect(heapNodes[3].left).to.equal(heapNodes[7]);
        expect(heapNodes[3].right).to.be.null;
        expect(heapNodes[4].parent).to.equal(heapNodes[2]);
        expect(heapNodes[4].left).to.equal(heapNodes[8]);
        expect(heapNodes[4].right).to.be.null;
        expect(heapNodes[5].parent).to.equal(heapNodes[1]);
        expect(heapNodes[5].left).to.equal(heapNodes[9]);
        expect(heapNodes[5].right).to.be.null;
        expect(heapNodes[6].parent).to.equal(heapNodes[2]);
        expect(heapNodes[6].left).to.be.null;
        expect(heapNodes[6].right).to.be.null;
        expect(heapNodes[7].parent).to.equal(heapNodes[3]);
        expect(heapNodes[7].left).to.be.null;
        expect(heapNodes[7].right).to.be.null;
        expect(heapNodes[8].parent).to.equal(heapNodes[4]);
        expect(heapNodes[8].left).to.be.null;
        expect(heapNodes[8].right).to.be.null;
        expect(heapNodes[9].parent).to.equal(heapNodes[5]);
        expect(heapNodes[9].left).to.be.null;
        expect(heapNodes[9].right).to.be.null;
    });

    it('should maintain the root even if its value is swapped', function () {
        let root = heapNodes[0];
        for (let i = 1; i < heapNodes.length; i++) root.insert(heapNodes[i]);
        expect(root.value).to.equal(0);
        expect(root.parent).to.be.null;
        heapNodes[0].swapValuesWith(heapNodes[9]);
        expect(root.value).to.equal(9);
        expect(root.parent).to.be.null;
    });

});
