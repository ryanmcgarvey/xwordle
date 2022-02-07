import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["square"];

  initialize() {
    this.index = 0;
    this.guess = "";
    console.log("Init guess");
  }

  connect() {
    console.log("connect guess");
    this.initializeSquares();
  }

  initializeSquares() {
    var numSquares = this.squares.filter((n) => n).length;
    if (numSquares !== 5) {
      return setTimeout(() => {
        console.log("still waiting "+ numSquares);
        this.initializeSquares();
      }, 100);
    }

    console.log("Iniitalizing squares");
    this.reset();
    this.element.guess = this;
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
      e.highlightedValue = index === e.xValue;
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
    var matches = {};

    this.squares.forEach((e, i) => {
      e.highlightedValue = false;
      matches[e.textValue] ||= 0;

      if (e.textValue === answer.charAt(i)) {
        matches[e.textValue] += 1;
        console.log("Match: " + e.textValue + matches[e.textValue]);
        e.setFullMatch();
        return;
      }
    });

    this.squares.forEach((e, i) => {
      if (e.textValue !== answer.charAt(i)) {
        if (answer.includes(e.textValue)) {
          var r = new RegExp("(" + e.textValue + ")", "g");
          var num_matches = answer.match(r).length;
          if (num_matches > matches[e.textValue]) {
            matches[e.textValue] += 1;
            console.log("Part Match: " + e.textValue + matches[e.textValue]);
            e.setPartialMatch();
            return;
          }
        }
        console.log("Miss: " + e.textValue);
        e.setMiss();
      }
    });
    if (this.guess === answer) {
      return true;
    } else {
      return false;
    }
  }

  handleBackspace() {
    if (this.guessEmpty) {
      return;
    }
    this.index -= 1;
    this.squares[this.index].textValue = "";
    this.guess = this.guess.slice(0, -1);
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
