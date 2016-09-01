const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.CurrentSize = 0;
	}

	push(data, priority) {
		var NewNodeForHeap = new Node(data, priority);
		this.insertNode(NewNodeForHeap);
		this.shiftNodeUp(NewNodeForHeap);
	}

	pop() {
		--this.CurrentSize;
	}

	detachRoot() {
		if (this.root != null)
		{
			if (this.parentNodes[0] == this.root)
			{
				this.parentNodes.shift();
			}
			var CopyOfRoot = this.root;
			this.root = null;
			--this.CurrentSize;
			return CopyOfRoot;
		}
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.CurrentSize > 0)
		{
			var LastInsertedNodeIsChildOfDetached = false;
			this.root = this.parentNodes[this.parentNodes.length - 1];
			if (detached.left == this.root)
			{
				this.root.left = null;
				LastInsertedNodeIsChildOfDetached = true;
			}
			else
			{
				this.root.left = detached.left;
				this.root.left.parent = this.root;				
			}
			if (detached.right == this.root)
			{
				this.root.right = null;
				LastInsertedNodeIsChildOfDetached = true;			
			}
			else
			{
				this.root.right = detached.right;
				this.root.right.parent = this.root;					
			}
			if (LastInsertedNodeIsChildOfDetached && this.CurrentSize > 1)
			{
				var BufferForParentNode = this.parentNodes[0];
				this.parentNodes[0] = this.parentNodes[1];
				this.parentNodes[1] = BufferForParentNode;
			}
			else
			{
				this.parentNodes.pop();
			}
		}
	}

	size() {
		return this.CurrentSize;
	}

	isEmpty() {
		if (this.CurrentSize == 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.CurrentSize = 0;
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
		++this.CurrentSize;
	}

	shiftNodeUp(node) {
		if (node != this.root && node.parent != null)
		{	
			var IndexOfNodeParent = -1;
			for (var Index = 0; Index < this.parentNodes.length; ++Index)
			{
				if (this.parentNodes[Index] == node)
				{
					if (IndexOfNodeParent >= 0)
					{
						var BufferForParentNode = this.parentNodes[IndexOfNodeParent];
						this.parentNodes[IndexOfNodeParent] = this.parentNodes[Index];
						this.parentNodes[Index] = BufferForParentNode;								
					}
					else
					{
						this.parentNodes[Index] = node.parent;
						break;
					}
				}
				else if (this.parentNodes[Index] == node.parent)
				{
					IndexOfNodeParent = Index;
				}
			}
			if (node.left != this.root && node.right != this.root)
			{
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
			else
			{
				this.root = node;
			}
		}
		else if (node.left == this.root || node.right == this.root)
		{
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		if (this.root.left != null || this.root.right != null)
		{	
			if (node.left != null)
			{
				node.left.swapWithParent();
				this.shiftNodeDown(node);
			}
			else
			{
				var BufferForParent = node.parent;
				while (BufferForParent.parent != null)
				{
					BufferForParent = BufferForParent.parent;
				}
				this.root = BufferForParent;
			}
		}
	}
}

module.exports = MaxHeap;
