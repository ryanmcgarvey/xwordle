import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    answerList: String,
  };
  static targets = ["square"];

  get size() {
    return 5;
  }

  initialize() {
    this.index = 0;
    this.wordIndex = 0;
    this.guess = "";
    this.answerGrid = [];
    this.direction = "h";
    console.log("init cross");
  }

  answerValueChanged() {
    this.answerGrid = this.answer.split(",");
  }

  connect() {
    console.log("connect cross");
    this.initializeSquares();
  }

  initializeSquares() {
    if (
      this.squares.filter((n) => n).length !== this.size * this.size &&
      this.answerGrid.length === 0
    ) {
      return setTimeout(() => {
        console.log("still waiting");
        this.initializeSquares();
      }, 100);
    }

    console.log("Iniitalizing squares");
    this.answerGrid.forEach((word) => {
      word.split("").forEach((c, i) => {
        if (c === "_") {
          this.squares[i].setBlank();
        }
      });
    });

    this.reset();
    this.element.guess = this;
  }

  get squares() {
    return this.squareTargets.map((t) => t.square);
  }

  get guessComplete() {
    return this.index === this.size;
  }

  get guessEmpty() {
    return this.index === 0;
  }

  squareAt(row, col) {
    const totalIndex = row * this.size + col;
    return this.squares[totalIndex];
  }

  highlight(word, letter) {
    this.squares.forEach((e) => {
      e.highlightedValue = letter === e.yValue * this.size + e.xValue;
      e.focusedValue = false;
    });

    if (this.direction === "h") {
      for (let i = 0; i < this.size; i++) {
        this.squareAt(word, i).focusedValue = true;
      }
    } else {
      for (let i = 0; i < this.size; i++) {
        this.squareAt(i, word).focusedValue = true;
      }
    }
  }

  reset() {
    console.log("Resetting guess");
    this.index = 0;
    this.guess = "";
    this.highlight(this.wordIndex, 0);
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

  handleTab() {
    if (this.direction === "h") {
      this.direction = "v";
    } else {
      this.direction = "h";
    }
    this.highlight(this.wordIndex, this.index);
  }
}
