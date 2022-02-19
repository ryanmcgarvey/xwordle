import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["square"];

  initialize() {
    this.index = 0;
    this.wordIndex = 0;
    this.direction = "h";
    console.log("init cross");
  }

  connect() {
    console.log("connect cross");
    this.initializeSquares();
  }

  initializeSquares() {
    if (this.squares.filter((n) => n).length !== this.size * this.size) {
      return setTimeout(() => {
        console.log("still waiting");
        this.initializeSquares();
      }, 100);
    }

    console.log("about to reset");
    this.reset();
    this.element.guess = this;
  }

  get size() {
    return 5;
  }

  get squares() {
    return this.squareTargets.map((t) => t.square);
  }

  get guessComplete() {
    return this.wordIndexes.every((w) => {
      return this.guessForWord(w).length === this.size;
    });
  }

  get wordComplete() {
    return this.index === this.indexOfLastPosition;
  }

  get wordEmpty() {
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
    return this.wordIndexes.every((w) => {
      return this.wordCorrect(w);
    });
  }

  wordCorrect(word) {
    return this.squaresInWord(word).every((s) => s.match);
  }

  get wordIndexes() {
    return [...Array(this.size).keys()];
  }

  guessForWord(w) {
    return this.squaresInWord(w)
      .map((s) => s.guessValue)
      .filter((w) => w !== "");
  }

  answerForWord(w) {
    return this.squaresInWord(w).map((s) => s.answerValue);
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
    this.dispatch('history', { word, direction });
  }

  firstUnfinishedWord() {
    return this.wordIndexes.findIndex((w) => {
      return !this.wordCorrect(w);
    });
  }

  firstEmptyIndex(word) {
    return this.squaresInWord(word).findIndex((s) => {
      return !s.match;
    });
  }

  reset() {
    console.log("Resetting guess");
    this.wordIndex = this.firstUnfinishedWord();
    this.index = this.firstEmptyIndex(this.wordIndex);
    this.squares.forEach((e) => {
      if (!e.match) {
        e.guessValue = "";
        e.statusValue = "none";
      }
    });
    this.highlight(this.wordIndex, this.index);
  }

  lockIn() {
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
          e.statusValue = "match";
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
              e.statusValue = "partial";
              return;
            }
          }
          e.statusValue = "miss";
        }
      });
    });

    return this.puzzleComplete;
  }

  handleBackspace() {
    if (this.wordEmpty) {
      return;
    }
    this.setPreviousEmptyIndex();
    this.currentSquare.guessValue = "";
    this.highlight(this.wordIndex, this.index);
  }

  lastIndexForWord(word) {
    var squares = this.squaresInWord(word);
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].guessValue === "") {
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

  setPreviousEmptyIndex() {
    let nextIndex = this.squaresInWord(this.wordIndex)
      .reverse()
      .findIndex((s, i) => {
        return !s.match && i > this.size - 1 - this.index;
      });

    if (nextIndex >= 0) {
      this.index = this.size - 1 - nextIndex;
    } 
  }

  setNextEmptyIndex() {
    let nextIndex = this.squaresInWord(this.wordIndex).findIndex((s, i) => {
      return !s.match && i > this.index;
    });

    if (nextIndex >= 0) {
      this.index = nextIndex;
    } else {
      this.index = this.size;
    }
  }

  handleEntry(key) {
    if (!this.wordComplete) {
      var square = this.currentSquare;
      square.guessValue = key;
      this.setNextEmptyIndex();
      if (!this.wordComplete) {
        this.highlight(this.wordIndex, this.index);
      }
    }
  }

  handleTab() {
    if (this.direction === "h") {
      this.direction = "v";
    } else {
      this.direction = "h";
    }
    let oldIndex = this.index;
    this.index = this.wordIndex;
    this.wordIndex = oldIndex;
    this.highlight(this.wordIndex, this.index);
  }
}
