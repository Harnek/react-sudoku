/* eslint-disable no-param-reassign */
import sudoku from './sudoku';

const generate = () => {
  const game = sudoku.generate(40, true);
  
  const board = [];
  for (let i = 0; i < 9; i += 1) {
    const row = Array.from(game.slice(i*9, i*9 + 9));
    board.push(row.map(value => Number(value) || null));
  }
  
  return board;
}

const getRowConflicts = (board, row, status) => {
  const lastPosition = Array(10).fill(-1);
  let flag = false;

  let value = null;
  for (let i = 0; i < 9; i += 1) {
    value = board[row][i];
    if (value !== null) {
      if (lastPosition[value] >= 0) {
        status[row][i] = 2;
        status[row][lastPosition[value]] = 2;
        flag = true;
      }
      lastPosition[value] = i;
    }
  }
  
  if (flag) {
    for (let j = 0; j < 9; j += 1) {
      if (status[row][j] === 0) {
        status[row][j] = 1;
      }
    }
  }

  return status
}

const getColConflicts = (board, col, status) => {
  const lastPosition = Array(10).fill(-1);
  let flag = false;

  let value = null;
  for (let i = 0; i < 9; i += 1) {
    value = board[i][col]
    
    if (value !== null) {
      if (lastPosition[value] >= 0) {
        status[i][col] = 2;
        status[lastPosition[value]][col] = 2;
        flag = true;
      }
      lastPosition[value] = i;
    }
  };

  if (flag) {
    for (let i = 0; i < 9; i += 1) {
      if (status[i][col] === 0) {
        status[i][col] = 1;
      }
    }
  }

  return status
}

const getBlockConflicts = (board, block, status) => {
  const row = Math.floor(block/3) * 3;
  const col = (block % 3) * 3;
  const lastPosition = Array(10).fill(null);
  let flag = false;

  let value = null;
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      value = board[row + i][col + j]
      
      if (value !== null) {
        if (lastPosition[value]) {
          const [r, c] = lastPosition[value];
          status[row + r][col + c] = 2;
          status[row + i][col + j] = 2;
          flag = true;
        }
        lastPosition[value] = [i, j];
      }
    }
  };

  if (flag) {
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        if (status[row + i][col + j] === 0) {
          status[row + i][col + j] = 1;
        }
      }
    }
  }

  return status
}

const getConflicts = (board) => {
  // 0 - noConflict, 1 - Conflict in Row or Col, 2 - Conflict Pos
  let status = [];
  for (let i = 0; i < 9; i += 1) {
    status.push(Array(9).fill(0));
  }

  for (let i = 0; i < 9; i += 1) {
    status = getRowConflicts(board, i, status);
    status = getColConflicts(board, i, status);
    status = getBlockConflicts(board, i, status);
  }

  return status
}

/* eslint-disable no-param-reassign */
const isDone = (board) => {
  for (let i = 0; i < board.length; i += 1) {
    
    const doneRow = []
    const doneCol = []

    for (let j = 0; j < board[i].length; j += 1) {
      if (!board[i][j] || doneRow.includes(board[i][j])) {
        return false
      }
      doneRow.push(board[i][j]);

      if (!board[j][i] || doneCol.includes(board[j][i])) {
        doneCol.push(board[j][i]);
      }
      doneCol.push(board[j][i]);
    }
  }

  return true;
}

export { generate, getConflicts, isDone };