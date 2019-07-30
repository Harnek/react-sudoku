import { getConflicts } from '../utils/boardUtil';

function init(board) {
  return {
    board,
    preFilled: board,
    history: [board],
    historyPos: 0,
    choice: 1,
    status: getConflicts(board),
    selected: null,
  };
}

function update(state, { x, y }) {
  const copy = [
    ...state.board.slice(0, x),
    [
      ...state.board[x].slice(0, y),
      state.choice,
      ...state.board[x].slice(y + 1, 9),
    ],
    ...state.board.slice(x + 1, 9),
  ];
  return {
    ...state,
    board: copy,
    history: [...state.history.slice(0, state.historyPos + 1), copy],
    historyPos: state.historyPos + 1,
    status: getConflicts(copy),
    selected: null,
  };
}

function clear(state, { x, y }) {
  const copy = [
    ...state.board.slice(0, x),
    [
      ...state.board[x].slice(0, y),
      null,
      ...state.board[x].slice(y + 1, 9),
    ],
    ...state.board.slice(x + 1, 9),
  ];
  return {
    ...state,
    board: copy,
    history: [...state.history.slice(0, state.historyPos + 1), copy],
    historyPos: state.historyPos + 1,
    status: getConflicts(copy),
    selected: null,
  };
}

function undo(state) {
  if (state.historyPos === 0) {
    return state;
  }
  return {
    ...state,
    board: state.history[state.historyPos - 1],
    historyPos: state.historyPos - 1,
    status: getConflicts(state.history[state.historyPos - 1]),
    selected: null,
  };
}

function redo(state) {
  if (state.history.length === state.historyPos + 1) {
    return state;
  }
  return {
    ...state,
    board: state.history[state.historyPos + 1],
    historyPos: state.historyPos + 1,
    status: getConflicts(state.history[state.historyPos + 1]),
    selected: null,
  };
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'init':
      return init(payload.board);
    case 'update':
      return update(state, payload);
    case 'clear':
      return clear(state, payload);
    case 'choice':
      return {
        ...state,
        selected:
          state.selected === null || state.selected !== payload.choice
            ? payload.choice
            : null,
        choice: payload.choice,
      };
    case 'select':
      return {
        ...state,
        selected:
          state.selected === payload.selected
            ? null
            : payload.selected,
        choice: payload.selected,
      };
    case 'undo':
      return undo(state);
    case 'redo':
      return redo(state);
    case 'reset':
      return init(state.history[0]);
    default:
      throw new Error();
  }
}

export { reducer as default, init };
