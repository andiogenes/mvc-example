package math

data class Segment2D(val start: Vec2D, val end: Vec2D) : Comparable<Segment2D> {
    override fun compareTo(other: Segment2D): Int {
        val turnStart = other.end - start
        val turnEnd = other.start - start

        val prod = turnStart cross turnEnd

        return when {
            prod > 0 -> -1
            prod < 0 -> 1
            else -> 0
        }
    }
}

infix fun Segment2D.intersectsWith(other: Segment2D): Boolean {
    val d1 = direction(other.start, other.end, start)
    val d2 = direction(other.start, other.end, end)
    val d3 = direction(start, end, other.start)
    val d4 = direction(start, end, other.end)

    return when {
        this.start == other.start -> false
        this.start == other.end -> false
        this.end == other.start -> false
        this.end == other.end -> false
        ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
                ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0)) -> true
        d1 == 0 && other.hasPoint(start) -> true
        d2 == 0 && other.hasPoint(end) -> true
        d3 == 0 && this.hasPoint(other.start) -> true
        d4 == 0 && this.hasPoint(other.end) -> true
        else -> false
    }
}

internal fun Segment2D.hasPoint(point: Vec2D): Boolean {
    if (minOf(start.x, end.x) <= point.x && point.x <= maxOf(start.x, end.x) &&
            minOf(start.y, end.y) <= point.y && point.y <= maxOf(start.y, end.y)) {
        return true
    }

    return false
}

internal fun direction(x: Vec2D, y: Vec2D, z: Vec2D): Int {
    return (z - x) cross (y - x)
}