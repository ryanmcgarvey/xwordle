// Entry point for the build script in your package.json
// app/javascript/entrypoint.tsx
import * as React from "react";
import Square, { Props as SquareProps } from "./square";
import { GameState } from "./types";

const Cross = (state: GameState) => {
  const squares = (row: number) => {
    return Array.from(Array(state.size).keys()).map((s) => {
      const props: SquareProps = {
        highlighted: true,
        focused: true,
        status: "match",
        text: "",
      };
      return <Square key={s} {...props} />;
    });
  };
  const rows = Array.from(Array(state.size).keys()).map((row) => (
    <div key={row} className="mt-5 grid grid-cols-5 gap-5">{squares(row)}</div>
  ));
  return (
    <div>
      <h1 className="text-5xl font-medium text-gray-900">Game</h1>
      {rows}
    </div>
  );
};

export default Cross;
