package math

import kotlin.math.sqrt

data class Vec2D(var x: Int = 0, var y: Int = 0)

operator fun Vec2D.plus(other: Vec2D): Vec2D =
        Vec2D(this.x + other.x, this.y + other.y)

operator fun Vec2D.unaryMinus(): Vec2D =
        Vec2D(-x, -y)

operator fun Vec2D.minus(other: Vec2D): Vec2D =
        this + (-other)

operator fun Vec2D.times(scale: Int): Vec2D =
        Vec2D(x * scale, y * scale)

infix fun Vec2D.cross(other: Vec2D): Int =
        this.x * other.y - this.y * other.x

infix fun Vec2D.dot(other: Vec2D): Int =
        this.x * other.x + this.y + other.y

val Vec2D.length: Double
    get() = sqrt((this dot this).toDouble())