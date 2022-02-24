export type Direction = "horizontal" | "vertical";
export type SquareStatus = "none" | "match" | "partial" | "miss";

export type Square = {
  highlighted: Boolean;
  focused: boolean;
  status: SquareStatus;
  guess: string;
};

export class Board {
  board: Square[][];
  wordIndex: number;
  letterIndex: number;
  direction: Direction;
  maxIndex: number;

  constructor(size: number) {
    this.board = Array.from(Array(size).keys()).map((row) =>
      Array.from(Array(size).keys()).map((col) => {
        return {
          guess: "",
          status: "none",
          highlighted: false,
          focused: false,
        };
      })
    );
    this.wordIndex = 0;
    this.direction = "horizontal";
    this.maxIndex = size - 1;
    this.letterIndex = this.firstAvailableIndex();
    this.refresh();
  }

  refresh() {
    this.board.forEach((row, rowIndex) => {
      row.forEach((square, squareIndex) => {
        square.focused =
          rowIndex === this.wordIndex && squareIndex === this.letterIndex;
        square.highlighted = this.wordIndex === rowIndex;
      });
    });
  }

  moveFocusForward() {
    if (this.letterIndex <= this.maxIndex) {
      this.letterIndex += 1;
    }
  }

  moveFocusBackward() {
    if (this.letterIndex > 0) {
      this.letterIndex -= 1;
    }
  }

  setLetter(letter: string) {
    if (this.letterIndex <= this.maxIndex) {
      this.board[this.wordIndex][this.letterIndex].guess = letter;
    }
  }

  enterLetter(letter: string) {
    this.setLetter(letter);
    this.moveFocusForward();
  }

  removeLetter() {
    this.moveFocusBackward();
    this.board[this.wordIndex][this.letterIndex].guess = "";
  }

  firstAvailableIndex(){
    return this.board[this.wordIndex].findIndex((s, i) => s.guess === "")
  }

  moveWordUp(){
    if(this.wordIndex > 0){
      this.wordIndex -=1;
      this.letterIndex = this.firstAvailableIndex()
    }
  }
  
  moveWordDown(){
    if(this.wordIndex <= this.maxIndex){
      this.wordIndex +=1;
      this.letterIndex = this.firstAvailableIndex()
    }
  }

  currentGuess(){
    return this.board[this.wordIndex].map(s => s.guess).join("")
  }

  lockIn(){
    return false;
  }


}

export type GameState = {
  answer: string[][];
  current: Board;
  guesses: Board[];
  matches: string[][];
  size: number;
};
