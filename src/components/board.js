import React, { useState } from "react";
import Square from "./square";
import { useGameContext } from "../contexts/GameContext";

const Board = () => {
  const [grid, setGrid] = useState(
    [...Array(9)].map((_, index) => ({ position: index, owner: null }))
  );
  const [selectedSquare, setSelectedSquare] = useState();
  const [winnerCombination, setWinnerCombination] = useState();
  const [isOver, setIsOver] = useState(false);
  const [noMoreMove, setNoMoreMove] = useState(false);
  const { selectedPlayer, setSelectedPlayer, PLAYER, winningCombinations } =
    useGameContext();

  const init = () => {
    setGrid(
      [...Array(9)].map((_, index) => ({ position: index, owner: null }))
    );
    setIsOver(false);
    setWinnerCombination();
    setNoMoreMove(false);
    setSelectedPlayer(PLAYER.X);
    setSelectedSquare();
  };

  const switchPlayer = (selectedSquare) => {
    const selectedPlayerCopy =
      selectedPlayer === PLAYER.X ? PLAYER.O : PLAYER.X;
    const gridCopy = [
      ...grid.filter((square) => square.position !== selectedSquare.position),
      selectedSquare,
    ];
    isGameOver(selectedSquare, gridCopy);
    setSelectedSquare(selectedSquare);
    setSelectedPlayer(selectedPlayerCopy);
    setGrid(gridCopy);
  };

  const isGameOver = (selectedSquare, grid) => {
    if (selectedSquare) {
      for (let winningCombination of winningCombinations) {
        let match = true;
        winningCombination.forEach((combination) => {
          match = match && isSameOwner(grid, selectedSquare, combination);
        });
        if (match) {
          setWinnerCombination(winningCombination);
          setIsOver(true);
          return;
        }
      }
      checkFilledSquared(grid);
    }
  };

  const isSameOwner = (boardGrid, currentSquared, combination) => {
    if (currentSquared) {
      return !!boardGrid.find(
        (square) =>
          square.position === combination &&
          square.owner === currentSquared.owner
      );
    }
  };

  const checkFilledSquared = (grid) => {
    const SquaredWithoutOwner = !!grid.find((s) => !s.owner);
    if (!SquaredWithoutOwner) {
      setNoMoreMove(true);
    }
  };

  const checkWinner = (selectedSquarePosition) => {
    if (winnerCombination) {
      return (
        winnerCombination.find(
          (combination) => combination === selectedSquarePosition
        ) !== undefined
      );
    }
    return false;
  };

  const renderGrid = () => {
    grid.sort((square1, square2) => square1.position - square2.position);
    return grid.map((square, idx) => (
      <Square
        key={idx}
        owner={square.owner}
        position={square.position}
        selectedPlayer={selectedPlayer}
        switchPlayer={switchPlayer}
        isWinner={checkWinner(square.position)}
        disabled={!!winnerCombination}
      />
    ));
  };

  return (
    <div className="game-board" data-testid="board-container">
      <div className="status" data-testid="status">
        {isOver ? `Game Over: The winner is ${selectedSquare.owner}` : ""}
        {noMoreMove ? `Game Over: no more move` : ""}
      </div>
      <div className="game-grid">{renderGrid()}</div>
      {(isOver || noMoreMove) && (
        <button className="retry-button" onClick={init} data-testid="retry-btn">
          Retry
        </button>
      )}
    </div>
  );
};

export default Board;
