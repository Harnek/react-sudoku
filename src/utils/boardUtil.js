const isDone = (board) => {
  // Check rows and cols
  for (let i = 0; i < 3; i += 1) {
    let flagR = board[i][0] !== null
    let flagC = board[0][i] !== null

    for (let j = 1; j < 3; j += 1) {
      if (board[i][j] !== board[i][j - 1]) {
        flagR = false;
      }
      if (board[j][i] !== board[j - 1][i]) {
        flagC = false;
      }
    }

    if (flagR) {
      const pos = [];
      for (let j = 0; j < 3; j += 1) {
        pos.push([i, j])
      }
      return [true, pos];
    }

    if (flagC) {
      const pos = [];
      for (let j = 0; j < 3; j += 1) {
        pos.push([j, i])
      }
      return [true, pos]
    }
  }

  // check top-down diagonal
  if (board[0][0] !== null) {
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return [true, [[0, 0], [1, 1], [2, 2]]]
    }
  }
  // check bottom-up diagonal
  if (board[2][0] !== null) {
    if (
      board[2][0] === board[1][1] &&
      board[1][1] === board[0][2]
    ) {
      return [true, [[2, 0], [1, 1], [0, 2]]];
    }
  }

  return [false, null];
}

const verify = (board) => {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (
        board[i][j] !== null ||
        board[i][j] !== 0 ||
        board[i][j] !== 1
      ) {
        return false;
      }
    }
  }
  return true;
}

export { isDone, verify };