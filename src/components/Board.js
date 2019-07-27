import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { generate, getConflicts } from '../utils/boardUtil';
import Row from './Row';

function init(board) {
  return {
    board,
    preFilled: board,
    history: [board],
    historyPos: 0,
    choice: 1,
    status: getConflicts(board),
    selected: null,
  }
}

function update(state, { x, y }) {
  const copy = [
    ...state.board.slice(0, x),
    [...state.board[x].slice(0, y),
    state.choice,
    ...state.board[x].slice(y + 1, 9)],
    ...state.board.slice(x + 1, 9)
  ];
  return {
    ...state,
    board: copy,
    history: [...state.history.slice(0, state.historyPos + 1), copy],
    historyPos: state.historyPos + 1,
    status: getConflicts(copy),
    selected: null,
  }
}

function clear(state, { x, y }) {
  const copy = [
    ...state.board.slice(0, x),
    [...state.board[x].slice(0, y),
      null,
    ...state.board[x].slice(y + 1, 9)],
    ...state.board.slice(x + 1, 9)
  ];
  return {
    ...state,
    board: copy,
    history: [...state.history.slice(0, state.historyPos + 1), copy],
    historyPos: state.historyPos + 1,
    status: getConflicts(copy),
    selected: null,
  }
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
  }
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
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return init(action.payload.board)
    case 'update':
      return update(state, action.payload)
    case 'clear':
      return clear(state, action.payload)
    case 'choice':
      return { ...state, choice: action.payload.choice, selected: null }
    case 'select':
      return { ...state, selected: action.payload.selected }
    case 'undo':
      return undo(state);
    case 'redo':
      return redo(state);
    case 'reset':
      return init(state.history[0]);
    default: throw new Error();
  }
}

function Board() {
  const [state, dispatch] = useReducer(reducer, {
    board: [], preFilled: [], choice: 1, history: [], historyPos: -1, status: [], selected: null,
  });
  const [click, setClick] = useState({ id: null, x: null, y: null });
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const board = generate();
    dispatch({ type: 'init', payload: { board } })

    const intervalID = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000)

    return () => {
      clearInterval(intervalID);
    }
  }, [])

  useEffect(() => {
  }, [state, timer])

  const handleEvent = (e) => {
    const x = e.target.parentNode.rowIndex;
    const y = e.target.cellIndex;

    if (e.type === "mousedown") {
      const id = setTimeout(() => {
        setClick(() => ({ ...click, id: null }));
      }, 250);
      setClick(() => ({ id, x, y }));
    } else {
      clearTimeout(click.id);

      if (state.preFilled[x][y]) {
        dispatch({ type: 'select', payload: { selected: state.board[x][y] } })
      }
      else if (state.board[x][y] !== null) {
        if (click.id === null) {
          dispatch({ type: 'clear', payload: { x, y } })
        } else {
          dispatch({ type: 'select', payload: { selected: state.board[x][y] } })
        }
      }
      else {
        dispatch({ type: 'update', payload: { x, y } })
      }
    }
  }

  const handleToolClick = (e) => {
    const n = Number(e.target.innerHTML);
    dispatch({ type: 'choice', payload: { choice: n } })
  }

  const getTime = () => {
    let s = String(timer % 60);
    if (s.length === 1) {
      s = `0${timer % 60}`
    }

    if (timer < 10) {
      return `Time 0:${s}`
    }
    if (timer < 60) {
      return `Time 0:${s}`
    }

    if (timer < 3600) {
      return `Time ${Math.floor(timer / 60)}:${s}`
    }

    return `99:59`
  }

  if (!state.board.length) {
    return <div>Loading</div>
  }

  return (
    <div className='game'>
      <div className='nav'>
        <Link to='/'>Menu</Link>
        {getTime()}
      </div>
      <table className='board'>
        <tbody>
          {state.board.map((value, rowIndex) => (
            <Row
              rowIndex={rowIndex}
              cols={value}
              status={state.status}
              selected={state.selected}
              preFilled={state.preFilled}
              handleEvent={handleEvent}
              key={rowIndex}
            />
          ))}
        </tbody>
      </table>
      <div className='tools'>
        <table>
          <tbody>
            <tr className='row'>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                <td
                  className={['cell', value === state.choice ? 'selected' : ''].join(' ')}
                  onClick={handleToolClick}
                >
                  {value}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <div className='tools-sub'>
          <div className='tool' onClick={() => dispatch({ type: 'undo' })}>Undo</div>
          <div className='tool' onClick={() => dispatch({ type: 'redo' })}>Redo</div>
          <div className='tool' onClick={() => dispatch({ type: 'reset' })}>Reset</div>
        </div>
      </div>
    </div>
  );
}

export default Board;