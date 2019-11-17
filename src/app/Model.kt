package app

import math.*
import structures.OrderedSet

internal class Model {
    private val _points = mutableListOf<Vec2D>()

    val points: List<Vec2D>
        get() = _points

    fun addPoint(point: Vec2D) {
        _points.add(point)
    }

    fun removePoint(point: Vec2D) {
        _points.remove(point)
    }

    fun getIntersectionOrNull(point: Vec2D, epsilon: Double): Vec2D? {
        for (p in _points) {
            if ((point - p).length <= epsilon) {
                return p
            }
        }

        return null
    }

    private var _selfIntersecting = false

    val isSelfIntersecting: Boolean
        get() = _selfIntersecting

    fun checkSegmentIntersection() {
        _selfIntersecting = hasSegmentIntersection()
    }

    fun hasSegmentIntersection(): Boolean {
        val LEFT = 0
        val RIGHT = 1

        val segments = _points.zipWithNext()
        val markedPoints = segments
                .flatMap {
                    val segment = if (it.first.x < it.second.x) {
                        Segment2D(it.first, it.second)
                    } else {
                        Segment2D(it.second, it.first)
                    }
                    listOf(Triple(segment.start, LEFT, segment),
                            Triple(segment.end, RIGHT, segment))
                }


        val sortedPoints = markedPoints
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

        val orderedSet = OrderedSet<Segment2D>()

        for (p in sortedPoints) {
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
}