package app

import math.*
import structures.OrderedSet

/**
 * Application data and operations on it.
 */
internal class Model {
    private val _points = mutableListOf<Vec2D>()

    /**
     * Points of multilink broken line.
     */
    val points: List<Vec2D>
        get() = _points

    private var _selfIntersecting = false

    /**
     * Returns `true` if line is self-intersecting, `false` otherwise.
     */
    val isSelfIntersecting: Boolean
        get() = _selfIntersecting

    /**
     * Adds given point to the end of broken line.
     */
    fun addPoint(point: Vec2D) {
        _points.add(point)
    }

    /**
     * Remove given point from broken line.
     */
    fun removePoint(point: Vec2D) {
        _points.remove(point)
    }

    /**
     * Returns first point that intersects with closed circle
     * with radius `epsilon`, centered in `point`.
     */
    fun getIntersectionOrNull(point: Vec2D, epsilon: Double): Vec2D? {
        for (p in _points) {
            if ((point - p).length <= epsilon) {
                return p
            }
        }

        return null
    }

    /**
     * Performs intersection check.
     */
    fun checkSegmentIntersection() {
        _selfIntersecting = hasSegmentIntersection()
    }

    /**
     * Returns `true` if broken line has intersection, `false` otherwise.
     */
    private fun hasSegmentIntersection(): Boolean {
        val LEFT = 0

        val endpoints = prepareEndpoints()
        val orderedSet = OrderedSet<Segment2D>()

        for (p in endpoints) {
            val segment = p.third

            if (p.second == LEFT) {
                orderedSet.insert(segment)

                val above = orderedSet.aboveOrNull(segment)
                val below = orderedSet.belowOrNull(segment)

                if (above != null && segment intersectsWith above) {
                    return true
                }

                if (below != null && segment intersectsWith below) {
                    return true
                }
            } else {
                val above = orderedSet.aboveOrNull(segment)
                val below = orderedSet.belowOrNull(segment)

                if (above != null && below != null && above intersectsWith below) {
                    return true
                }

                orderedSet.delete(segment)
            }
        }

        return false
    }

    /**
     * Returns list of points sorted in order needed for sweeping line algorithm.
     */
    private fun prepareEndpoints(): List<Triple<Vec2D, Int, Segment2D>> {
        val LEFT = 0
        val RIGHT = 1

        val result = _points
                .zipWithNext()
                .flatMap {
                    val segment = if (it.first.x < it.second.x) {
                        Segment2D(it.first, it.second)
                    } else {
                        Segment2D(it.second, it.first)
                    }
                    listOf(Triple(segment.start, LEFT, segment),
                            Triple(segment.end, RIGHT, segment))
                }
                .sortedWith(Comparator { a, b ->
                    when {
                        a.first.x < b.first.x -> -1
                        a.first.x > b.first.x -> 1
                        a.first.y < b.first.y -> -1
                        a.first.y > b.first.y -> 1
                        a.second < b.second -> -1
                        a.second > b.second -> 1
                        else -> 0
                    }
                })

        return result
    }
}