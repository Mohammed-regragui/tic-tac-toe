import React from "react";
import { func, string, number, bool } from "prop-types";
import { useGameContext } from "../contexts/GameContext";

const Square = ({ owner, position, switchPlayer, isWinner, disabled }) => {
  const selectedPlayer = useGameContext().selectedPlayer;

  const handleSelect = () => {
    if (!owner) {
      owner = selectedPlayer;
      switchPlayer({ owner: selectedPlayer, position });
    }
  };

  return (
    <button
      data-testid="square-container"
      className={`square ${isWinner ? "winner" : ""}`}
      onClick={handleSelect}
      disabled={disabled}
    >
      {owner}
    </button>
  );
};

Square.propTypes = {
  owner: string,
  position: number.isRequired,
  selectedPlayer: string.isRequired,
  switchPlayer: func.isRequired,
  isWinner: bool,
  disabled: bool,
};

export default Square;
