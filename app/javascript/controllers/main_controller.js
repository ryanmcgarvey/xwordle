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

  resetCurrentGuess() {
    if (!this.currentGuess) {
      setTimeout(() => {
        this.resetCurrentGuess();
      }, 100);
    } else {
      this.currentGuess.reset();
    }
  }

  guessAllowed() {
    var g = this.guessTargets.at(0);
    var new_g = g.cloneNode(true);
    if (g.guess.lockIn(this.answerValue)) {
      console.log("You win");
    } else {
      g.parentElement.prepend(new_g);
      this.resetCurrentGuess();
    }
  }

  guessDenied() {
    this.guessTargets.at(0).classList.add("animate-bounce");
    setTimeout(() => {
      this.guessTargets.at(0).classList.remove("animate-bounce");
    }, 500);
  }

  enterGuess() {
    let guess = this.currentGuess.currentGuess.join("")
    fetch(`/games/verify?query=${guess}`, {
      headers: { accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Response for ${guess}: ${data}`);
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
      case /Tab/.test(e.key):
      case / /.test(e.key):
        e.preventDefault();
        this.currentGuess.handleTab();
        break;
      case /^[a-z]$/.test(e.key):
        this.currentGuess.handleEntry(e.key);
        break;
      default:
        console.log("Could not handle: " + e.key);
        return;
    }
  }
}
