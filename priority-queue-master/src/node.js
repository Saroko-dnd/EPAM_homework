class Node {
	constructor(data, priority) {
    	this.data = data;
    	this.priority = priority;
    	this.parent = null;
    	this.left = null;
    	this.right = null;
	}

	appendChild(node) {
		if (this.left == null)
		{
			node.parent = this;
			this.left = node;
		}
		else if (this.right == null)
		{
			node.parent = this;
			this.right = node;
		}
	}

	removeChild(node) {
		if (this.left == node)
		{
			this.left.parent = null;			
			this.left = null;
		}
		else if (this.right == node)
		{
			this.right.parent = null;			
			this.right = null;
		}
		else
		{
			throw 'Error from RemoveChild(): argument is not a child of current node!';
		}
	}

	remove() {
		if(this.parent != null)
		{
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if(this.parent != null)
		{
			var CopyOfLeftChild = this.left;
			var CopyOfRightChild = this.right;
			if (this == this.parent.left)
			{
				if (this.parent.right != null)
				{
					this.parent.right.parent = this;
				}
				this.right = this.parent.right;
				this.left = this.parent;
			}
			else
			{
				if (this.parent.left != null)
				{
					this.parent.left.parent = this;
				}
				this.left = this.parent.left;
				this.right = this.parent;		
			}
			this.parent.left = CopyOfLeftChild;
			this.parent.right = CopyOfRightChild;
			if (this.parent.parent != null)
			{
				if (this.parent == this.parent.parent.left)
				{
					this.parent.parent.left = this;
				}
				else
				{
					this.parent.parent.right = this;
				}
			}
			var CopyOfParentParent = this.parent.parent;
			this.parent.parent = this;
			this.parent = CopyOfParentParent;
		}
	}
}

module.exports = Node;
