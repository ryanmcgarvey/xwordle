// Entry point for the build script in your package.json
// app/javascript/entrypoint.tsx
import * as React from "react";
import { GameState } from "./types";

const History = (state: GameState) => {
  return (
    <div>
      <h1 className="text-5xl font-medium text-gray-900">History</h1>
      <h2 className="text-3xl font-medium text-gray-900">{state.answer[0].join("")}</h2>
    </div>
  );
};

export default History;
