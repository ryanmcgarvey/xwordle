import ApplicationController from './application_controller'

export default class extends ApplicationController {
  connect () {
    super.connect()
  }

  increment(event) {
    console.log("Incrementing")
    event.preventDefault()
    this.stimulate('Counter#increment', 1)
  }
}