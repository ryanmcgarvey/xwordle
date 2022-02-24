// Entry point for the build script in your package.json
// app/javascript/entrypoint.tsx
import * as React from "react";
import { Square as SquareState, SquareStatus } from "./types";

const Square = (props: SquareState) => {
  const bg = (status: SquareStatus) => {
    switch (status) {
      case "match":
        return "bg-green-500";
      case "partial":
        return "bg-yellow-400";
      case "miss":
        return "bg-slate-400";
    }
    return "bg-white";
  };

  const shadow = (highlighted: Boolean) => {
    if (highlighted) {
      return "shadow-xl";
    } else {
      ("");
    }
  };

  const focus = (focused: Boolean) => {
    if (focused) {
      return "outline outline-4 outline-blue-400";
    } else {
      ("");
    }
  };

  return (
    <div
      className={`px-5 py-5 ${bg(props.status)} shadow ${shadow(
        props.highlighted
      )} ${focus(props.focused)} rounded-lg overflow-hidden`}
    >
      <div className="mt-1 text-5xl font-semibold text-gray-900 w-14 min-w-full h-12 place-content-center text-center">
        {props.guess}
      </div>
    </div>
  );
};

export default Square;
