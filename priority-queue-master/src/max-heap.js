const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		
	}

	pop() {
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		
	}

	clear() {
		
	}

	insertNode(node) {
		if (this.root == null)
		{
			this.root = node;
		}
		else
		{
			if (this.parentNodes[0].left == null)
			{
				this.parentNodes[0].left = node;
				this.parentNodes[0].left.parent = this.parentNodes[0];
			}
			else if (this.parentNodes[0].right == null)
			{
				this.parentNodes[0].right = node;
				this.parentNodes[0].right.parent = this.parentNodes[0];
			}
		}
		this.parentNodes.push(node);
		if (this.parentNodes[0].left != null && this.parentNodes[0].right != null)
		{
			this.parentNodes.shift();
		}

	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
