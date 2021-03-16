package app

import math.Vec2D

/**
 * Application entry.
 */
class App {
    private val model = Model()
    private val view = View(model)
    private val controller = Controller(model, view)

    /**
     * Adds point to the end of a broken line.
     */
    fun addPoint(x: Int, y: Int) {
        model.addPoint(Vec2D(x, y))
        model.checkSegmentIntersection()
    }

    /**
     * Moves point from position (x1,y1) to (x2,y2).
     */
    fun movePoint(x1: Int, y1: Int, x2: Int, y2: Int) {
        model.points.find { it.x == x1 && it.y == y1 }?.apply {
            x = x2
            y = y2
        }
        model.checkSegmentIntersection()
    }

    /**
     * Removes point in given position from broken line.
     */
    fun removePoint(x: Int, y: Int) {
        model.removePoint(Vec2D(x, y))
        model.checkSegmentIntersection()
    }

    /**
     * Checks if there is an self-intersection.
     */
    fun intersects(): Boolean = model.isSelfIntersecting
}