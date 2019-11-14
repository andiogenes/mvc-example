package structures

/**
 * Collection that implements ordered set interface
 * and corresponding methods, such as:
 *  * Inserting element in collection.
 *  * Removing element from collection.
 *  * Getting previous or next elements to given.
 */
class OrderedSet<T: Comparable<T>> {
    private val container = RedBlackTree<T>()

    /**
     * Inserts element to collection.
     */
    fun insert(item: T) {
        container.insert(item)
    }

    /**
     * Removes element from collection.
     */
    fun delete(item: T) {
        container.remove(container.find(item))
    }

    /**
     * Returns next element to given.
     */
    fun aboveOrNull(item: T): T? {
        return container.successorOf(container.find(item))?.key
    }

    /**
     * Return previous element to given.
     */
    fun belowOrNull(item: T): T? {
        return container.predecessorOf(container.find(item))?.key
    }
}