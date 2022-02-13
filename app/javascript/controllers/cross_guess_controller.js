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
    this.answerGrid = [];
    this.direction = "h";
    console.log("init cross");
  }

  connect() {
    console.log("connect cross");
    this.initializeSquares();
  }

  initializeSquares() {
    if (
      this.squares.filter((n) => n).length !== this.size * this.size ||
      this.answerGrid.length === 0
    ) {
      return setTimeout(() => {
        console.log("still waiting");
        this.initializeSquares();
      }, 100);
    }

    console.log("about to reset");
    this.reset();
    this.element.guess = this;
  }

  get squares() {
    return this.squareTargets.map((t) => t.square);
  }

  get guessComplete() {
    return [...Array(this.size).keys()].every((w) => {
      return this.guessForWord(w).length === this.size;
    });
  }

  get wordComplete() {
    return this.index === this.indexOfLastPosition;
  }

  get guessEmpty() {
    return this.index === this.indexOfFirstPosition;
  }

  get indexOfLastPosition() {
    return this.size;
  }

  get indexOfFirstPosition() {
    return 0;
  }

  get currentSquare() {
    return this.squareAt(this.wordIndex, this.index);
  }

  get squaresInCurrentWord() {
    return this.squaresInWord(this.wordIndex);
  }

  get currentGuess() {
    return this.guessForWord(this.wordIndex).join("");
  }

  get currentAnswer() {
    return this.answerForWord(this.wordIndex).join("");
  }

  get puzzleComplete() {
    return [...Array(this.size).keys()].every((w) => {
      return this.guessForWord(w).join("") === this.answerForWord(w).join("");
    });
  }

  guessForWord(w) {
    return this.squaresInWord(w)
      .map((s) => s.textValue)
      .filter((w) => w !== "");
  }

  answerForWord(w) {
    return this.squaresInWord(w).map((s) => s.answerValue);
  }

  answerListValueChanged() {
    return (this.answerGrid = this.answerListValue.split(","));
  }

  squaresInWord(word) {
    const squares = [];
    for (let i = 0; i < this.size; i++) {
      squares.push(this.squareAt(word, i));
    }
    return squares;
  }

  squareAt(word, letter) {
    var totalIndex = 0;
    if (this.direction === "h") {
      totalIndex = word * this.size + letter;
    } else {
      totalIndex = letter * this.size + word;
    }
    return this.squares[totalIndex];
  }

  highlight(word, letter) {
    if (letter >= this.size) {
      letter = this.size - 1;
    }
    this.squares.forEach((e) => {
      if (this.direction === "h") {
        e.highlightedValue = letter === e.xValue && word === e.yValue;
      } else {
        e.highlightedValue = letter === e.yValue && word === e.xValue;
      }
      e.focusedValue = false;
    });

    for (let i = 0; i < this.size; i++) {
      this.squareAt(word, i).focusedValue = true;
    }

    this.showHistoryFor(word, this.direction);
  }

  showHistoryFor(word, direction) {

  }

  reset() {
    console.log("Resetting guess");
    this.index = 0;
    this.squares.forEach((e) => {
      e.textValue = "";
    });
    this.highlight(this.wordIndex, 0);
  }

  lockIn(a) {
    [...Array(this.size).keys()].forEach((w) => {
      var matches = {};
      var squares = this.squaresInWord(w);
      var answer = this.answerForWord(w);
      var guess = this.guessForWord(w);

      squares.forEach((e, i) => {
        e.highlightedValue = false;
        let answerChar = answer[i];
        let guessChar = guess[i];
        matches[guessChar] ||= 0;

        if (answerChar === guessChar) {
          matches[answerChar] += 1;
          e.setFullMatch();
          return;
        }
      });

      squares.forEach((e, i) => {
        let answerChar = answer[i];
        let guessChar = guess[i];
        if (answerChar !== guessChar) {
          if (answer.includes(guessChar)) {
            var r = new RegExp("(" + guessChar + ")", "g");
            var num_matches = answer.join("").match(r).length;
            if (num_matches > matches[guessChar]) {
              matches[guessChar] += 1;
              e.setPartialMatch();
              return;
            }
          }
          e.setMiss();
        }
      });
    });

    return this.puzzleComplete;
  }

  handleBackspace() {
    if (this.guessEmpty) {
      return;
    }
    this.index -= 1;
    this.currentSquare.textValue = "";
    this.currentSquare.guessValue = "";
    this.highlight(this.wordIndex, this.index);
  }

  lastIndexForWord(word) {
    var squares = this.squaresInWord(word);
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].textValue === "") {
        return i;
      }
    }
    return this.size;
  }

  handleUp() {
    if (this.wordIndex > 0) {
      this.wordIndex -= 1;
    }
    this.index = this.lastIndexForWord(this.wordIndex);
    this.highlight(this.wordIndex, this.index);
  }

  handleDown() {
    if (this.wordIndex < this.size - 1) {
      this.wordIndex += 1;
    }
    this.index = this.lastIndexForWord(this.wordIndex);
    this.highlight(this.wordIndex, this.index);
  }

  handleEntry(key) {
    if (!this.wordComplete) {
      var square = this.currentSquare;
      square.textValue = key;
      this.index += 1;
      if (!this.wordComplete) {
        this.highlight(this.wordIndex, this.index);
      }
    }
  }

  handleTab() {
    return;
    if (this.direction === "h") {
      this.direction = "v";
    } else {
      this.direction = "h";
    }
    this.highlight(this.wordIndex, this.index);
  }
}
