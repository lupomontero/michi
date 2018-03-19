const initialState = {
  currPlayer: 'X',
  winner: null,
  winnerCombination: null,
  isDraw: null,
  matrix: [
    [ null, null, null ],
    [ null, null, null ],
    [ null, null, null ],
  ],
};


// chequea eje x
const isWinnerX = (currPlayer, payload, matrix) => matrix.reduce(
  (memo, row) => row[payload.y] === currPlayer && memo,
  'x',
);

// chequea eje y
const isWinnerY = (currPlayer, payload, matrix) => matrix[payload.x].reduce(
  (memo, value) => value === currPlayer && memo,
  'y',
);

// chequea diagonal (0,0) -> (2, 2)
const isWinnerDiagonalDown = (currPlayer, matrix) => matrix.reduce(
  (memo, row, x) => row.reduce(
    (memo, value, y) => (x === y && value !== currPlayer) ? false : memo,
    memo,
  ),
  'dd',
);

// chequea diagonal (0,2) -> (2, 0)
const isWinnerDiagonalUp = (currPlayer, matrix) => matrix.reduce(
  (memo, row, x) => row.reduce(
    (memo, value, y) =>
      (x === (row.length - 1) - y && value !== currPlayer) ? false : memo,
    memo,
  ),
  'du',
);

const isWinner = (currPlayer, payload, matrix) =>
  isWinnerX(currPlayer, payload, matrix)
    || isWinnerY(currPlayer, payload, matrix)
    || isWinnerDiagonalDown(currPlayer, matrix)
    || isWinnerDiagonalUp(currPlayer, matrix);

const getWinnerCombination = (currPlayer, payload, matrix) => {
  const winnerAxis = isWinner(currPlayer, payload, matrix);
  return (winnerAxis === 'x' && matrix.map((row, x) => [x, payload.y]))
    || (winnerAxis === 'y' && matrix[payload.x].map((row, y) => [payload.x, y]))
    || (winnerAxis === 'dd' && matrix.map((row, x) => [x, x]))
    || (winnerAxis === 'du' && matrix.map((row, x) => [x, row.length - 1 - x]));
};

const isDraw = matrix => matrix.reduce(
  (memo, row) => row.reduce((memo, value) => memo && !!value, memo),
  true,
);


export default (state = initialState, { type, payload }) => {
  if (type === 'RESET') {
    return initialState;
  }

  if (type !== 'MOVE') {
    return state;
  }

  if (state.matrix[payload.x][payload.y]) {
    return state;
  }

  const matrix = state.matrix.map(
    (row, x) => row.map((value, y) => (
      (!value && x === payload.x && y === payload.y)
        ? state.currPlayer
        : value
    ))
  );

  const winnerCombination = getWinnerCombination(state.currPlayer, payload, matrix);

  return {
    currPlayer: (state.currPlayer === 'X') ? 'O' : 'X',
    winner: !!winnerCombination ? state.currPlayer : null,
    winnerCombination,
    isDraw: isDraw(matrix),
    matrix,
  };
};
