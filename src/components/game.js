import React from "react";
import Board from "./board";

const game = () => {
  return (
    <div data-testid="game-container" className="game">
      <Board />
    </div>
  );
};

export default game;
