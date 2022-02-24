import * as React from "react";
import { Board, GameState } from "./types";

class GameBoard {
  state: GameState;
  setState: any;

  constructor(seed: string) {
    let answer = seed.split(" ").map((w) => w.split(""));

    const [gameState, setGameState] = React.useState<GameState>({
      answer: answer,
      current: new Board(answer.length),
      guesses: [],
      matches: [],
      size: answer.length,
    });

    React.useEffect(() => {
      window.addEventListener("keydown", (e) => {
        this.handleKey(e);
      });
      return () => {
        window.removeEventListener("keydown", (e) => {
          this.handleKey(e);
        });
      };
    }, []);

    this.state = gameState;
    this.setState = setGameState;
  }

  guessAllowed() {
    console.log("ALLOWED");
    if (this.state.current.lockIn()) {
      console.log("YOU WIN");
    } else {
      this.state.guesses.push(this.state.current);
      this.state.current = new Board(this.state.size);
      this.refresh()
    }
  }

  guessDenied() {
    console.log("NOT A WORD");
  }

  enterGuess() {
    let guess = this.state.current.currentGuess();
    console.log(`Guess: ${guess}`);
    fetch(`/games/verify?query=${guess}`, {
      headers: { accept: "application/json" },
    })
      .then((response) => response.json())
      .then(
        (data) => {
          console.log(`Response for ${guess}: ${data}`);
          if (data.wordMatch === true) {
            this.guessAllowed();
          } else {
            this.guessDenied();
          }
        },
        (error) => {
          console.log(`Error: ${error}`);
        }
      );
    console.log("fetched");
  }

  handleKey(e: KeyboardEvent) {
    switch (true) {
      case /Enter/.test(e.key):
        this.enterGuess();
        break;
      case /Backspace/.test(e.key):
        this.state.current.removeLetter();
        break;
      case /Tab/.test(e.key):
      case / /.test(e.key):
        e.preventDefault();
        break;
      case /^[a-z]$/.test(e.key):
        this.state.current.enterLetter(e.key);
        break;
      case /^1$/.test(e.key):
        ["scarf", "alphas", "betas", "craps", "blarf"].forEach((w) => {
          w.split("").forEach((c, i) => {
            // this.currentGuess.handleEntry(c);
          });
          // this.currentGuess.handleDown();
        });
        break;
      case /^2$/.test(e.key):
        ["scent", "canoe", "arson", "rouse", "fleet"].forEach((w) => {
          w.split("").forEach((c, i) => {
            // this.currentGuess.handleEntry(c);
          });
          // this.currentGuess.handleDown();
        });
        break;
      case /ArrowDown/.test(e.key):
      case /ArrowRight/.test(e.key):
        this.state.current.moveWordDown();
        break;
      case /ArrowUp/.test(e.key):
      case /ArrowLeft/.test(e.key):
        this.state.current.moveWordUp();
        break;
      default:
        // console.log("Could not handle: " + e.key);
        return;
    }
    this.refresh();
  }

  refresh() {
    this.state.current.refresh();
    this.setState(Object.assign({}, this.state));
  }
}

export default GameBoard;
