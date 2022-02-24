// Entry point for the build script in your package.json
// app/javascript/entrypoint.tsx
import * as React from "react";
import Square from "./square";
import { GameState } from "./types";

const Cross = (state: GameState) => {
  const rows = (board) => {
    return board.map((row, rindex) => (
      <div key={rindex} className="mt-5 grid grid-cols-5 gap-5">
        {row.map((s, sindex) => {
          return <Square key={sindex} {...s} />;
        })}
      </div>
    ));
  };

  const rowHistory = state.guesses.map((board, i) => (
    <div key={i}>
      <hr className="mt-8 mb-8" />
      {rows(board.board)}
    </div>
  ));

  return (
    <div>
      <h1 className="text-5xl font-medium text-gray-900">Game</h1>
      {rows(state.current.board)}
      {rowHistory}
    </div>
  );
};

export default Cross;
