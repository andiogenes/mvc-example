package structures

class RedBlackTree<T : Comparable<T>> {
    data class Node<T>(var key: T,
                       var parent: Node<T>? = null,
                       var leftChild: Node<T>? = null,
                       var rightChild: Node<T>? = null,
                       var color: Color = Color.RED) {
        enum class Color { RED, BLACK }
    }

    var root: Node<T>? = null
        private set

    fun <T> Node<T>?.findGrandparent(): Node<T>? {
        if (this == null) return null

        if (this.parent == null) return null

        return this.parent!!.parent
    }

    fun <T> Node<T>?.findUncle(): Node<T>? {
        val grandpa = this.findGrandparent()

        if (grandpa == null) return null

        requireNotNull(this)

        if (this.parent == grandpa.leftChild) {
            return grandpa.rightChild
        }

        return grandpa.leftChild
    }

    fun <T> Node<T>?.findSibling(parent: Node<T>?): Node<T>? {
        if (parent == null) return null

        if (this == parent.leftChild) return parent.rightChild

        return parent.leftChild
    }

    val <T> Node<T>?.isRed: Boolean
        get() = if (this == null) false
        else this.color == Node.Color.RED

    private fun leftRotate(x: Node<T>?) {
        if (x == null) return
        if (x.rightChild == null) return

        val y = x.rightChild
        x.rightChild = y!!.leftChild

        if (y.leftChild != null) {
            y.leftChild!!.parent = x
        }

        y.parent = x.parent
        if (x.parent == null) {
            root = y
        } else {
            if (x == x.parent!!.leftChild) {
                x.parent!!.leftChild = y
            } else {
                x.parent!!.rightChild = y
            }
        }

        y.leftChild = x
        x.parent = y
    }

    private fun rightRotate(x: Node<T>?) {
        if (x == null) return
        if (x.leftChild == null) return

        val y = x.leftChild
        x.leftChild = y!!.rightChild

        if (y.rightChild != null) {
            y.rightChild!!.parent = x
        }

        y.parent = x.parent
        if (x.parent == null) {
            root = y
        } else {
            if (x == x.parent!!.leftChild) {
                x.parent!!.leftChild = y
            } else {
                x.parent!!.rightChild = y
            }
        }

        y.rightChild = x
        x.parent = y
    }

    fun insert(item: T) {
        var current = root
        var previous: Node<T>? = null

        while (current != null) {
            previous = current

            current = if (item < current.key) {
                current.leftChild
            } else {
                current.rightChild
            }
        }

        val inserting = Node(item, parent = previous)

        if (previous == null) {
            root = inserting
        } else {
            if (item < previous.key) {
                previous.leftChild = inserting
            } else {
                previous.rightChild = inserting
            }
        }

        insertFixup(inserting)
    }

    private fun insertFixup(node: Node<T>?) {
        insertCaseNo1(node)
    }

    private fun insertCaseNo1(z: Node<T>?) {
        if (z == null) return

        if (z.parent == null) {
            z.color = Node.Color.BLACK
        } else {
            insertCaseNo2(z)
        }
    }

    private fun insertCaseNo2(z: Node<T>) {
        if (z.parent!!.color == Node.Color.BLACK) {
            return
        } else {
            insertCaseNo3(z)
        }
    }

    private fun insertCaseNo3(z: Node<T>) {
        val u = z.findUncle()

        if (u.isRed) {
            z.parent!!.color = Node.Color.BLACK
            u!!.color = Node.Color.BLACK

            val g = z.findGrandparent()
            g!!.color = Node.Color.RED
            insertCaseNo1(g)
        } else {
            insertCaseNo4(z)
        }
    }

    private fun insertCaseNo4(node: Node<T>) {
        var z: Node<T>? = node
        val g = z.findGrandparent()

        if (z == z!!.parent!!.rightChild && z.parent == g!!.leftChild) {
            leftRotate(z.parent)
            z = z.leftChild
        } else if (z == z.parent!!.leftChild && z.parent == g!!.rightChild) {
            rightRotate(z.parent)
            z = z.rightChild
        }

        insertCaseNo5(z)
    }

    private fun insertCaseNo5(z: Node<T>?) {
        val g = z.findGrandparent()

        z!!.parent!!.color = Node.Color.BLACK
        g!!.color = Node.Color.RED

        if (z == z.parent!!.leftChild && z.parent == g.leftChild) {
            rightRotate(g)
        } else {
            leftRotate(g)
        }
    }

    fun remove(current: Node<T>?): Node<T>? {
        if (current == null) return current

        val removable = if (current.leftChild == null || current.rightChild == null) {
            current
        } else {
            successorOf(current)
        }

        var child: Node<T>? = null
        if (removable != null) {
            child = if (removable.leftChild != null) {
                removable.leftChild
            } else {
                removable.rightChild
            }
        }

        if (child != null) {
            child.parent = removable?.parent
        }

        if (removable?.parent == null) {
            root = child
        } else {
            if (removable == removable.parent!!.leftChild) {
                removable.parent!!.leftChild = child
            } else {
                removable.parent!!.rightChild = child
            }
        }

        if (removable != current) {
            if (removable != null) {
                current.key = removable.key
            }
        }

        if (removable != null && removable.color == Node.Color.BLACK) {
            if (child.isRed) {
                child!!.color = Node.Color.BLACK
            } else {
                removeFixup(child, child?.parent)
            }
        }

        if (removable != null) {
            removable.leftChild = null
            removable.rightChild = null
        }

        return removable
    }

    private fun removeFixup(x: Node<T>?, parent: Node<T>? = null) {
        removeCaseNo1(x, parent)
    }

    private fun removeCaseNo1(z: Node<T>?, parent: Node<T>?) {
        if (parent != null) {
            removeCaseNo2(z, parent)
        }
    }

    private fun removeCaseNo2(z: Node<T>?, parent: Node<T>) {
        val s = z.findSibling(parent)

        if (s.isRed) {
            parent.color = Node.Color.RED
            s!!.color = Node.Color.BLACK

            if (z == parent.leftChild) {
                leftRotate(parent)
            } else {
                rightRotate(parent)
            }
        }
        removeCaseNo3(z, parent)
    }

    private fun removeCaseNo3(z: Node<T>?, parent: Node<T>) {
        val s = z.findSibling(parent)

        if (!parent.isRed &&
                s != null &&
                s.color == Node.Color.BLACK &&
                !s.leftChild.isRed &&
                !s.rightChild.isRed) {
            s.color = Node.Color.RED
            removeCaseNo1(parent, parent.parent)
        } else {
            removeCaseNo4(z, parent)
        }
    }

    private fun removeCaseNo4(z: Node<T>?, parent: Node<T>) {
        val s = z.findSibling(parent)

        if (parent.isRed &&
                s != null &&
                s.color == Node.Color.BLACK &&
                !s.leftChild.isRed &&
                !s.rightChild.isRed) {
            s.color = Node.Color.RED
            parent.color = Node.Color.BLACK
        } else {
            removeCaseNo5(z, parent)
        }
    }

    private fun removeCaseNo5(z: Node<T>?, parent: Node<T>) {
        val s = z.findSibling(parent)

        if (s != null && s.color == Node.Color.BLACK) {
            if (z == parent.leftChild &&
                    !s.rightChild.isRed &&
                    s.leftChild.isRed) {
                s.color = Node.Color.RED
                s.leftChild!!.color = Node.Color.BLACK
                rightRotate(s)
            } else if (z == parent.rightChild &&
                    !s.leftChild.isRed &&
                    s.rightChild.isRed) {
                s.color = Node.Color.RED
                s.rightChild!!.color = Node.Color.BLACK
                leftRotate(s)
            }
        }
        removeCaseNo6(z, parent)
    }

    private fun removeCaseNo6(z: Node<T>?, parent: Node<T>) {
        val s = z.findSibling(parent)

        if (s != null) {
            s.color = parent.color
            parent.color = Node.Color.BLACK

            if (z == parent.leftChild) {
                s.rightChild!!.color = Node.Color.BLACK
                leftRotate(parent)
            } else {
                s.rightChild!!.color = Node.Color.BLACK
                rightRotate(parent)
            }
        }
    }

    fun minimum(node: Node<T>? = root): Node<T>? {
        if (node == null) return node

        var current = node
        while (current!!.leftChild != null) {
            current = current.leftChild
        }

        return current
    }

    fun maximum(node: Node<T>? = root): Node<T>? {
        if (node == null) return node

        var current = node
        while (current!!.rightChild != null) {
            current = current.rightChild
        }

        return current
    }

    fun predecessorOf(node: Node<T>?): Node<T>? {
        if (node == null) return node

        if (node.leftChild != null) {
            return maximum(node.leftChild)
        }

        var current = node
        var upward = current.parent

        while (upward != null && current == upward.leftChild) {
            current = upward
            upward = current.parent
        }

        return upward
    }

    fun successorOf(node: Node<T>?): Node<T>? {
        if (node == null) return node

        if (node.rightChild != null) {
            return minimum(node.rightChild)
        }

        var current = node
        var upward = current.parent

        while (upward != null && current == upward.rightChild) {
            current = upward
            upward = current.parent
        }

        return upward
    }

    fun find(key: T): Node<T>? {
        var current = root

        while (true) {
            if (current == null) return current
            if (current.key == key) return current

            current = if (key < current.key) {
                current.leftChild
            } else {
                current.rightChild
            }
        }
    }
}