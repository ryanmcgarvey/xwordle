import * as React from "react";
import Cross from "./cross";
import History from "./history";
import { GameState } from "./types";

const Game = (state: GameState) => {
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