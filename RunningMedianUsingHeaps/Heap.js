class Heap {
    constructor(heapType) {
        if (heapType !== 'min' && heapType !== 'max') {
            throw new Error('heapType must be either "min" or "max."');
        }

        this.root = null;
        this.nodeList = [];
        this.size = 0;
        this.heapType = heapType;
    }

    insert(node) {
        this.nodeList.push(node);
        this.size = this.nodeList.length;
        if (this.root === null) {
            this.root = node;
            return;
        }

        this.root.insert(node);
        let currentNode = node;
        while(currentNode.parent && (
                (this.heapType === 'min' && currentNode.value < currentNode.parent.value) ||
                (this.heapType === 'max' && currentNode.value > currentNode.parent.value))) {
            currentNode.swapValuesWith(currentNode.parent);
            currentNode = currentNode.parent;
        }
    }

    pop() {
        let lastNode = this.nodeList.pop();
        this.size = this.nodeList.length;
        this.root.swapValuesWith(lastNode);
        lastNode.remove();

        let currentNode = this.root;
        while ((this.heapType === 'min' && currentNode.left && currentNode.value > currentNode.left.value) ||
               (this.heapType === 'min' && currentNode.right && currentNode.value > currentNode.right.value)) {
            if (currentNode.left && currentNode.right &&
                currentNode.value > currentNode.left.value &&
                currentNode.value > currentNode.right.value) {
                if (currentNode.left.value <= currentNode.right.value) {
                    currentNode.swapValuesWith(currentNode.left);
                    currentNode = currentNode.left;
                } else {
                    currentNode.swapValuesWith(currentNode.right);
                    currentNode = currentNode.right;
                }
            } else if (currentNode.left && currentNode.value > currentNode.left.value) {
                currentNode.swapValuesWith(currentNode.left);
                currentNode = currentNode.left;
            } else if (currentNode.right && currentNode.value > currentNode.right.value) {
                currentNode.swapValuesWith(currentNode.right);
                currentNode = currentNode.right;
            }
        }

        while ((this.heapType === 'max' && currentNode.left && currentNode.value < currentNode.left.value) ||
               (this.heapType === 'max' && currentNode.right && currentNode.value < currentNode.right.value)) {
            if (currentNode.left && currentNode.right &&
                currentNode.value < currentNode.left.value &&
                currentNode.value < currentNode.right.value) {
                if (currentNode.left.value >= currentNode.right.value) {
                    currentNode.swapValuesWith(currentNode.left);
                    currentNode = currentNode.left;
                } else {
                    currentNode.swapValuesWith(currentNode.right);
                    currentNode = currentNode.right;
                }
            } else if (currentNode.left && currentNode.value < currentNode.left.value) {
                currentNode.swapValuesWith(currentNode.left);
                currentNode = currentNode.left;
            } else if (currentNode.right && currentNode.value < currentNode.right.value) {
                currentNode.swapValuesWith(currentNode.right);
                currentNode = currentNode.right;
            }
        }

        return lastNode;
    }
}

module.exports = Heap;