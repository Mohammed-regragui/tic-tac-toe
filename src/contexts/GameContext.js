import React, { createContext, useContext, useState } from "react";
import { node } from "prop-types";
import { player } from "../utils";

const GameContext = createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [selectedPlayer, setSelectedPlayer] = useState(player.X);
  const winningCombinations = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  const PLAYER = {
    X: "X",
    O: "O",
  };

  const value = {
    selectedPlayer,
    setSelectedPlayer,
    PLAYER,
    winningCombinations,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

GameContext.propTypes = {
  children: node,
};
