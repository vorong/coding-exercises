const expect = require('chai').expect;
const RunningMedianUsingHeaps = require('../RunningMedianUsingHeaps');

describe('new RunningMedian()', function () {
    it('should create a new object with one min heap and one max heap', function () {
        let runningMedian = new RunningMedianUsingHeaps();
        expect(runningMedian.leftHeap.heapType).to.equal('max');
        expect(runningMedian.rightHeap.heapType).to.equal('min');
    });
});

describe('Calling insert', function () {
    it('should insert the value into the correct heap while keeping the heaps balanced within one node', function () {
        let runningMedian = new RunningMedianUsingHeaps();
        let heapNodes = [];
        for (let i = 0; i < 15; i++) heapNodes.push(i);
        expect(runningMedian.leftHeap.size).to.equal(0);
        expect(runningMedian.rightHeap.size).to.equal(0);
        heapNodes.forEach((node) => runningMedian.insert(node));
        expect(runningMedian.leftHeap.size).to.equal(7);
        expect(runningMedian.rightHeap.size).to.equal(8);
        runningMedian.leftHeap.nodeList.forEach((node) => expect(node.value).to.be.lessThan(7));
        runningMedian.rightHeap.nodeList.forEach((node) => expect(node.value).to.be.greaterThan(6));
    });
});

describe('Calling getMedian', function () {
    it('returns the correct median for simple cases', function () {
        let runningMedian = new RunningMedianUsingHeaps();
        runningMedian.insert(4);
        expect(runningMedian.getMedian()).to.equal(4);
        runningMedian.insert(8);
        expect(runningMedian.getMedian()).to.equal(6);
        runningMedian.insert(12);
        expect(runningMedian.getMedian()).to.equal(8);
        runningMedian.insert(3);
        expect(runningMedian.getMedian()).to.equal(6);
        runningMedian.insert(1);
        expect(runningMedian.getMedian()).to.equal(4);
    });

    it('returns the correct median for complex cases', function () {
        let runningMedian = new RunningMedianUsingHeaps();
        let testValues = [];
        let numTestValues = 1000000;
        for (let i = 0; i < numTestValues; i++) testValues.push(Math.floor(Math.random() * 10));
        testValues.forEach((value) => runningMedian.insert(value));
        testValues.sort((a, b) => a - b);
        let midpoint = Math.floor(numTestValues / 2);
        let expectedMedian = null;
        if (testValues.length % 2 === 0) {
            expectedMedian = (testValues[midpoint - 1] + testValues[midpoint]) / 2;
        } else {
            expectedMedian = testValues[midpoint].value;
        }
        let computedMedian = runningMedian.getMedian();
        expect(computedMedian).to.equal(expectedMedian);
    });
});