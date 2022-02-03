import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["square"];

  initialize() {
    this.index = 0;
    this.guess = "";
  }

  get squares() {
    return this.squareTargets.map((t) => t.square);
  }

  highlight(index) {
    this.squares.forEach((e) => {
      e.highlightedValue = index === e.indexValue;
    });
  }

  reset() {
    this.squares.forEach((e) => {
      e.textValue = "";
    });
    this.index = 0;
    this.guess = "";
    this.highlight(0);
  }

  enterGuess() {
    this.dispatch("guess", { detail: { content: this.guess } });
    this.reset();
  }

  get guessComplete() {
    return this.index === 5;
  }
  
  get guessEmpty() {
    return this.index === 0;
  }

  key(e) {
    switch (true) {
      case /Enter/.test(e.key):
        if (this.guessComplete) {
          this.enterGuess();
        }
        break;
      case /Backspace/.test(e.key):
        if(this.guessEmpty){
          return;
        }
        this.index -=1;
        this.squares[this.index].textValue = "";
        this.highlight(this.index)
        break;
      case /[a-z]/.test(e.key):
        if (!this.guessComplete) {
          var square = this.squares[this.index];
          square.textValue = e.key;
          this.guess += e.key;
          this.index += 1;
          if (! this.guessComplete) {
            square.highlightedValue = false;
            this.squares[this.index].highlightedValue = true;
          }
        }
      default:
        return;
    }
  }
}
