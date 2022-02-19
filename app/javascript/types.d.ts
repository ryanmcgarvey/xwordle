export type Direction = "up" | "down";

export type SingleGuess = {
  index: number;
  direction: Direction;
  guess: string[];
};

export type GameState = {
  answer: string[][];
  guesses: SingleGuess[];
  matches: string[][];
  size: Number;
};