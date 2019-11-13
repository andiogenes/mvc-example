package app

import math.Vec2D
import org.w3c.dom.events.MouseEvent

internal class Controller(private val model: Model, private val view: View) {
    private var selected: Vec2D? = null

    init {
        view.canvas.oncontextmenu = {
            onRightClick(it)
            it.preventDefault()
        }
        view.canvas.onmousedown = { onMouseDown(it) }
        view.canvas.onmousemove = { onMouseMove(it) }
        view.canvas.onmouseup = { onMouseUp(it) }
        view.canvas.ondblclick = { onDoubleClick(it) }
    }

    private fun onRightClick(e: MouseEvent) {
        val intersection = model.getIntersectionOrNull(Vec2D(e.clientX, e.clientY), View.PIVOT_RADIUS)
        if (intersection != null) {
            model.removePoint(intersection)
        }
    }

    private fun onMouseDown(e: MouseEvent) {
        selected = model.getIntersectionOrNull(Vec2D(e.clientX, e.clientY), View.PIVOT_RADIUS)
    }

    private fun onMouseMove(e: MouseEvent) {
        selected?.x = e.clientX
        selected?.y = e.clientY
    }

    private fun onMouseUp(e: MouseEvent) {
        selected = null
    }

    private fun onDoubleClick(e: MouseEvent) {
        model.addPoint(Vec2D(e.clientX, e.clientY))
    }
}