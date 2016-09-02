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
		if (this.root != null)
		{
			var CurrentDtaInsideRoot = this.root.data;
			var DetachedRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(DetachedRoot);
			this.shiftNodeDown(this.root);
			return CurrentDtaInsideRoot;
		}
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
        if (this.CurrentSize > 0) {
            var LastInsertedNodeIsChildOfDetached = false;
            this.root = this.parentNodes[this.parentNodes.length - 1];

            if (detached.left == this.root) {
                this.root.left = null;
                LastInsertedNodeIsChildOfDetached = true;
            }
            else {
                this.root.left = detached.left;
                if (this.root.left != null) {
                    this.root.left.parent = this.root;
                }
            }
            if (detached.right == this.root) {
                this.root.right = null;
                LastInsertedNodeIsChildOfDetached = true;
            }
            else {
                this.root.right = detached.right;
                if (this.root.right != null) {
                    this.root.right.parent = this.root;
                }
            }

           	if (LastInsertedNodeIsChildOfDetached && this.CurrentSize > 1) {
                var BufferForParentNode = this.parentNodes[0];
                this.parentNodes[0] = this.parentNodes[1];
                this.parentNodes[1] = BufferForParentNode;
            }
            else if (this.root.parent != null && this.root.parent.right == this.root)
            {        	
            	this.parentNodes.reverse();
            	this.parentNodes.push(this.root.parent);
            	this.parentNodes.shift();
            	this.parentNodes.reverse();
            }
            else if (this.root.parent != null && this.root.parent.left == this.root)
            {
            	this.parentNodes.pop();
            }

            if (this.root.parent != null) {
                if (this.root == this.root.parent.left) {
                    this.root.parent.left = null;
                }
                else if (this.root == this.root.parent.right) {
                    this.root.parent.right = null;
                }
            }

            this.root.parent = null;
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
		if (node != this.root && node.parent != null && node.priority > node.parent.priority)
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
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
		else if (node.parent == null)
		{
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		if (node != null)
		{
			var SwapWithLeftNode = true;
			var SwapNeeded = true;
			if (node.left != null && node.right != null)
			{
				if ((node.left.priority > node.right.priority) && node.priority < node.left.priority)
				{
					SwapWithLeftNode = true;
					SwapNeeded = true;
				}
				else if ((node.right.priority > node.left.priority) && node.priority < node.right.priority)
				{
					SwapWithLeftNode = false;
					SwapNeeded = true;
				}
			}
			else if (node.left != null && node.priority < node.left.priority)
			{
					SwapWithLeftNode = true;
					SwapNeeded = true;
			}
			else if (node.right != null && node.priority < node.right.priority)
			{
					SwapWithLeftNode = false;
					SwapNeeded = true;
			}
			else
			{
					SwapNeeded = false;
			}
			if (SwapNeeded)
			{
				var ThisNodeIsRoot = false;
				if (node == this.root)
				{
					ThisNodeIsRoot = true;
				}
				if (SwapWithLeftNode)
				{
					node.left.swapWithParent();				
				}
				else
				{
					node.right.swapWithParent();
				}
				if (ThisNodeIsRoot)
				{
					this.root = node.parent;
				}
				var IndexOfNode = this.parentNodes.indexOf(node);
				var IndexOfNodeParent = this.parentNodes.indexOf(node.parent);
				if (IndexOfNode >=0 && IndexOfNodeParent >= 0)
				{
					var BufferForNode = this.parentNodes[IndexOfNode];
					this.parentNodes[IndexOfNode] = this.parentNodes[IndexOfNodeParent];
					this.parentNodes[IndexOfNodeParent] = BufferForNode;
				}
				else if (IndexOfNodeParent >= 0)
				{
					this.parentNodes[IndexOfNodeParent] = node;
				}
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
