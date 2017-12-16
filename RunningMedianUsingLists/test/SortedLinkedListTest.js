const expect = require('chai').expect;
const SortedLinkedList = require('../SortedLinkedList');

describe('Calling getMedian', function () {
    it('returns the correct median for complex cases', function () {
        let testValues = [];
        let numTestValues = 100000;
        for (let i = 0; i < numTestValues; i++) testValues.push(Math.floor(Math.random() * 100));
        let runningMedian = new SortedLinkedList(numTestValues);
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