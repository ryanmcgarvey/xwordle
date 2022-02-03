
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    guesses: []
  }

  static targets = ["previous"]

  guess({detail: { content }}){
    this.guessesValue.push(content)
    this.previousTarget.innerHTML = this.guessesValue
  }

}