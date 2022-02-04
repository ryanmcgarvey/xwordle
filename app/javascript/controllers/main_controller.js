import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["guess"];
  static values = {
    answer: String,
  };

  initialize() {
    console.log("Init main");
  }

  connect() {
    console.log("connect main");
    setTimeout(() => {
      this.currentGuess.reset();
    });
  }

  get guesses() {
    return this.guessTargets.map((g) => g.guess);
  }

  get currentGuess() {
    return this.guesses.at(0);
  }

  get guessTexts() {
    return this.guesses.map((g) => g.guessValue);
  }

  enterGuess() {
    var g = this.guessTargets.at(0);
    var new_g = g.cloneNode(true);
    if (g.guess.lockIn(this.answerValue)) {
      console.log("You win");
    } else {
      g.parentElement.prepend(new_g);
      Promise.resolve().then(() => {
        new_g.guess.reset();
      });
    }
  }

  key(e) {
    switch (true) {
      case /Enter/.test(e.key):
        if (this.currentGuess.guessComplete) {
          this.enterGuess();
        }
        break;
      case /Backspace/.test(e.key):
        this.currentGuess.handleBackspace();
        break;
      case /^[a-z]$/.test(e.key):
        this.currentGuess.handleEntry(e.key);
      default:
        return;
    }
  }
}
