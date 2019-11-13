package app

class App {
    private val model = Model()
    private val view = View(model)
    private val controller = Controller(model, view)
}