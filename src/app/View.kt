package app

import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import kotlinx.browser.document
import kotlinx.browser.window
import org.w3c.dom.get
import kotlin.math.PI

internal class View(private val model: Model) {
    val canvas = (document.createElement("canvas") as HTMLCanvasElement).apply {
        width = window.innerWidth - 5
        height = window.innerHeight - 5
        style.backgroundColor = "#fff"
    }

    private val context = canvas.getContext("2d") as CanvasRenderingContext2D

    init {
        window.onload = {
            document.getElementsByTagName("body")[0]?.appendChild(canvas)
            window.requestAnimationFrame { loop() }
        }
    }

    private fun loop() {
        draw()
        window.requestAnimationFrame { loop() }
    }

    private fun drawLines() {
        val first = model.points.firstOrNull()
        val rest = model.points.drop(1)

        if (first == null) return

        with(context) {
            beginPath()

            moveTo(first.x.toDouble(), first.y.toDouble())
            for (p in rest) {
                lineTo(p.x.toDouble(), p.y.toDouble())
            }

            stroke()
        }
    }

    private fun drawPivots() {
        with(context) {
            fillStyle = "#eee"
            for (p in model.points) {
                beginPath()
                arc(p.x.toDouble(), p.y.toDouble(), PIVOT_RADIUS, 0.0, 2 * PI)
                fill()
                stroke()
            }
        }
    }

    private fun drawCoordinates() {
        with(context) {
            fillStyle = "#000"
            font = "10pt sans-serif"
            for (p in model.points) {
                val message = "(${p.x}, ${p.y})"
                fillText(message, p.x.toDouble() - message.length * 2.5, p.y.toDouble() - 20)

            }
        }
    }

    private fun drawInfo() {
        with(context) {
            fillStyle = if (model.isSelfIntersecting) { "#006600" } else { "#000066" }
            font = "12pt sans-serif"
            val message = if (model.isSelfIntersecting) { "Intersects" } else { "Not intersects" }
            fillText(message, 15.0, 25.0)
        }
    }

    private fun draw() {
        clear()
        drawLines()
        drawPivots()
        drawCoordinates()
        drawInfo()
    }

    private fun clear() {
        context.clearRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())
    }

    companion object {
        const val PIVOT_RADIUS = 7.5
    }
}