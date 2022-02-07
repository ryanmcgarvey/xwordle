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
  }

  initializeGuess() {
    if (this.currentGuess) {
      this.currentGuess.reset();
    } else {
      setTimeout(() => {
        this.initializeGuess();
      });
    }
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

  guessAllowed() {
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

  guessDenied() {
    this.guessTargets.at(0).classList.add("animate-bounce");
    setTimeout(() => {
      this.guessTargets.at(0).classList.remove("animate-bounce");
    }, 500);
  }

  enterGuess() {
    fetch(`/games/verify?query=${this.currentGuess.guess}`, {
      headers: { accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.wordMatch === true) {
          this.guessAllowed();
        } else {
          this.guessDenied();
        }
      });
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
      case / /.test(e.key):
        this.currentGuess.handleTab();
        break;
      case /^[a-z]$/.test(e.key):
        this.currentGuess.handleEntry(e.key);
      default:
        console.log("Could not handle: " + e.key)
        return;
    }
  }
}
