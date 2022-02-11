import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import Game from "./components/game";
import Board from "./components/board";
import Square from "./components/square";
import { render } from "./utils/test-utils";

test("Should renders Game View", () => {
  render(<Game />);
  expect(screen.getByTestId(/^game-container/)).toBeInTheDocument();
});

test("should render a board", () => {
  render(<Board />);
  expect(screen.getByTestId(/^board-container/)).toBeInTheDocument();
});

test("should display a grid of 9 squares", () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });
  const squares = screen.queryAllByTestId("square-container");
  expect(squares.length).toBe(9);
});

test("X always goes first", () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });
  const squares = screen.queryAllByTestId("square-container");
  fireEvent.click(squares[0]);
  expect(squares[0].textContent).toBe("X");
});

test("should be immutable if played, cannot play on a played position", () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });
  const squares = screen.queryAllByTestId("square-container");
  fireEvent.click(squares[0]);
  fireEvent.click(squares[0]);
  expect(squares[0].textContent).toBe("X");
});

test("should next player be different from previous", () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });
  const squares = screen.queryAllByTestId("square-container");
  const squaresToClick = [0, 1];
  squaresToClick.forEach((x) => fireEvent.click(squares[x]));
  expect(squares[0].textContent).toBe("X");
  expect(squares[1].textContent).toBe("O");
});

test("X as winner", async () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });
  const squares = screen.queryAllByTestId("square-container");
  const squaresToClick = [8, 7, 5, 4, 2];
  squaresToClick.forEach((x) => fireEvent.click(squares[x]));

  await waitFor(
    () => {
      expect(screen.getByTestId("status").textContent).toBe(
        "Game Over: The winner is X"
      );
    },
    1000,
    50
  );
});

test("O as winner", async () => {
  render(<Board />, {});
  const squares = screen.queryAllByTestId("square-container");
  const squaresToClick = [8, 7, 5, 4, 6, 1];
  squaresToClick.forEach((x) => fireEvent.click(squares[x]));

  await waitFor(
    () => {
      expect(screen.getByTestId("status").textContent).toBe(
        "Game Over: The winner is O"
      );
    },
    1000,
    50
  );
});

test("full squared, the game is a draw", async () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });

  const squares = screen.queryAllByTestId("square-container");
  const squaresToClick = [8, 5, 2, 1, 0, 4, 3, 6, 7];
  squaresToClick.forEach((x) => fireEvent.click(squares[x]));
  await waitFor(
    () => {
      expect(screen.getByTestId("status").textContent).toBe(
        "Game Over: no more move"
      );
    },
    1000,
    50
  );
  const retryBtn = screen.getByTestId(/^retry-btn/);
  expect(retryBtn).toBeInTheDocument();
  fireEvent.click(retryBtn);
  expect(squares.length).toBe(9);
  for (let i = 0; i < 9; i++) {
    expect(squares[i].textContent).toBe("");
  }
});

test("player X win after mark 3 squares in first column", async () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });

  const squares = screen.queryAllByTestId("square-container");
  const squaresToClick = [0, 1, 3, 4, 6];
  squaresToClick.forEach((x) => fireEvent.click(squares[x]));
  await waitFor(
    () => {
      expect(screen.getByTestId("status").textContent).toBe(
        "Game Over: The winner is X"
      );
    },
    1000,
    50
  );
});

test("player O win after mark 3 squares in second column", async () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });

  const squares = screen.queryAllByTestId("square-container");
  const squaresToClick = [0, 1, 3, 4, 8, 7];
  squaresToClick.forEach((x) => fireEvent.click(squares[x]));

  await waitFor(
    () => {
      expect(screen.getByTestId("status").textContent).toBe(
        "Game Over: The winner is O"
      );
    },
    1000,
    50
  );
});

test("player X win after mark 3 squares in third column", async () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });

  const squares = screen.queryAllByTestId("square-container");
  const squaresToClick = [2, 1, 5, 4, 8];
  squaresToClick.forEach((x) => fireEvent.click(squares[x]));
  await waitFor(
    () => {
      expect(screen.getByTestId("status").textContent).toBe(
        "Game Over: The winner is X"
      );
    },
    1000,
    50
  );
});

test("player O win after mark 3 squares in first row", async () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });

  const squares = screen.queryAllByTestId("square-container");
  const squaresToClick = [3, 0, 4, 1, 6, 2];
  squaresToClick.forEach((x) => fireEvent.click(squares[x]));

  await waitFor(
    () => {
      expect(screen.getByTestId("status").textContent).toBe(
        "Game Over: The winner is O"
      );
    },
    1000,
    50
  );
});

test("player X win after mark 3 squares in second row", async () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });

  const squares = screen.queryAllByTestId("square-container");
  const squaresToClick = [3, 0, 4, 1, 5];
  squaresToClick.forEach((x) => fireEvent.click(squares[x]));

  await waitFor(
    () => {
      expect(screen.getByTestId("status").textContent).toBe(
        "Game Over: The winner is X"
      );
    },
    1000,
    50
  );
});

test("player O win after mark 3 squares in third row", async () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });

  const squares = screen.queryAllByTestId("square-container");
  const squaresToClick = [3, 6, 4, 7, 0, 8];
  squaresToClick.forEach((x) => fireEvent.click(squares[x]));

  await waitFor(
    () => {
      expect(screen.getByTestId("status").textContent).toBe(
        "Game Over: The winner is O"
      );
    },
    1000,
    50
  );
});

test("player X win after mark 3 squares in first diagonal", async () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });

  const squares = screen.queryAllByTestId("square-container");
  const squaresToClick = [0, 1, 4, 2, 8];
  squaresToClick.forEach((x) => fireEvent.click(squares[x]));
  await waitFor(
    () => {
      expect(screen.getByTestId("status").textContent).toBe(
        "Game Over: The winner is X"
      );
    },
    1000,
    50
  );
});

test("player O win after mark 3 squares in second diagonal", async () => {
  const providerProps = {
    value: "X",
  };
  render(<Board />, { providerProps });

  const squares = screen.queryAllByTestId("square-container");
  const squaresToClick = [0, 2, 1, 4, 3, 6];
  squaresToClick.forEach((x) => fireEvent.click(squares[x]));

  await waitFor(
    () => {
      expect(screen.getByTestId("status").textContent).toBe(
        "Game Over: The winner is O"
      );
    },
    1000,
    50
  );
});

test("display square", async () => {
  const providerProps = {
    value: "X",
  };
  render(<Square />, { providerProps });

  // screen.debug(screen.queryByText("abc"))

  expect(screen.getByTestId("square-container")).not.toBeNull();
});
