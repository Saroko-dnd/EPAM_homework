const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
		this.CurrentSizeOfQueue = 0;
	}

	push(data, priority) {
		if (this.CurrentSizeOfQueue < this.maxSize)
		{
			this.heap.push(data, priority);
			++this.CurrentSizeOfQueue;
		}
		else
		{
			throw "PriorityQueue already has its maximum size";
		}
	}

	shift() {

	}

	size() {

	}

	isEmpty() {
		
	}
}

module.exports = PriorityQueue;
