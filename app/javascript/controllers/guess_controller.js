import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["square"];

  initialize() {
    this.index = 0;
    this.guess = "";
    // console.log("Init guess");
  }

  connect() {
    this.element[this.identifier] = this;
    // console.log("connect guess");
  }

  get squares() {
    return this.squareTargets.map((t) => t.square);
  }

  get guessComplete() {
    return this.index === 5;
  }

  get guessEmpty() {
    return this.index === 0;
  }

  highlight(index) {
    this.squares.forEach((e) => {
      e.highlightedValue = index === e.indexValue;
    });
  }

  reset() {
    console.log("Resetting guess");
    this.index = 0;
    this.guess = "";
    this.highlight(0);
    this.squares.forEach((e) => {
      e.textValue = "";
    });
  }

  lockIn(answer) {
    this.squares.forEach((e, i) => {
      e.highlightedValue = false;

      if (e.textValue === answer.charAt(i)) {
        // console.log("Match " + e.textValue + " at " + i)
        e.setFullMatch();
        return;
      }
      if (answer.includes(e.textValue)) {
        e.setPartialMatch();
        return;
      }
      e.setMiss()
    });
    if(this.guess === answer) {
      return true
    }else{
      return false
    }
    
  }

  handleBackspace() {
    if (this.guessEmpty) {
      return;
    }
    this.index -= 1;
    this.squares[this.index].textValue = "";
    this.highlight(this.index);
  }

  handleEntry(key) {
    if (!this.guessComplete) {
      var square = this.squares[this.index];
      square.textValue = key;
      this.guess += key;
      this.index += 1;
      if (!this.guessComplete) {
        square.highlightedValue = false;
        this.squares[this.index].highlightedValue = true;
      }
    }
  }
}
