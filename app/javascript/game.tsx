// Entry point for the build script in your package.json
// app/javascript/entrypoint.tsx
import * as React from "react";
import Cross from "./cross";
import History from "./history";
import { GameState } from "./types";

const Game = () => {
  let seed = "SCENT CANOE ARSON ROUSE FLEET";
  let answer = seed.split(" ").map((w) => w.split(""));

  const state: GameState = {
    answer: answer,
    guesses: [],
    matches: [],
    size: 5,
  };

  return (
    <div className="grid grid-flow-col auto-cols-max gap-10">
      <div className="bg-red-100">
        <Cross {...state} />
      </div>
      <div className="bg-blue-100">
        <History {...state} />
      </div>
    </div>
  );
};

export default Game;
