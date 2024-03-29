// Entry point for the build script in your package.json
// app/javascript/entrypoint.tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import Game from "./game";
import GameBoard from "./game_board";

const App = () => {
  let seed = "SCENT CANOE ARSON ROUSE FLEET";
  const gameBoard = new GameBoard(seed);

  return (
    <main className="w-full mt-10 px-5 flex">
      <div className="bg-yellow-100 w-full">
        <h1 className="text-5xl font-medium text-gray-900">XWordle</h1>
        <Game {...gameBoard.state} />
      </div>
    </main>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  ReactDOM.render(<App />, rootEl);
});
