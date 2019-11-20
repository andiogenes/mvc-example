import app.App

// Задана многозвенная ломаная. Проверить, будет ли она самопересекающейся.
internal val app = App()

@JsName("addPoint")
fun addPoint(x: Int, y: Int) {
    app.addPoint(x, y)
}

@JsName("movePoint")
fun movePoint(x1: Int, y1: Int, x2: Int, y2: Int) {
    app.movePoint(x1, y1, x2, y2)
}

@JsName("removePoint")
fun removePoint(x: Int, y: Int) {
    app.removePoint(x, y)
}