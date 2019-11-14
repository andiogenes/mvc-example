package app

import math.*

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
}