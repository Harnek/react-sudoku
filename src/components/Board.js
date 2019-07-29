import React, { useEffect, useReducer, useState } from 'react';
import { generate } from '../utils/boardUtil';
import convertTime from '../utils/other';
import Row from './Row';
import reducer, { init } from './useBoardReducer';

function Board() {
  const [state, dispatch] = useReducer(reducer, init(generate()));
  const [clickId, setClickId] = useState(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {}, [state, timer]);

  const handleEvent = e => {
    const x = e.target.parentNode.rowIndex;
    const y = e.target.cellIndex;

    if (e.type === 'mousedown') {
      const id = setTimeout(() => {
        setClickId(() => null);
      }, 250);
      setClickId(() => id);
    } else {
      clearTimeout(clickId);

      if (state.preFilled[x][y]) {
        dispatch({
          type: 'select',
          payload: { selected: state.board[x][y] },
        });
      } else if (state.board[x][y] !== null) {
        if (clickId === null) {
          dispatch({ type: 'clear', payload: { x, y } });
        } else {
          dispatch({
            type: 'select',
            payload: { selected: state.board[x][y] },
          });
        }
      } else {
        dispatch({ type: 'update', payload: { x, y } });
      }
    }
  };

  const handleToolClick = e => {
    const n = Number(e.target.innerHTML);
    dispatch({ type: 'choice', payload: { choice: n } });
  };

  return (
    <div className="game">
      <div className="timer">{convertTime(timer)}</div>
      <table className="board">
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
      <div className="tools">
        <table>
          <tbody>
            <tr className="row">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
                <td
                  className={[
                    'cell',
                    value === state.choice ? 'selected' : '',
                  ].join(' ')}
                  onClick={handleToolClick}
                >
                  {value}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <div className="tools-sub">
          <div
            className="tool"
            onClick={() => dispatch({ type: 'undo' })}
          >
            Undo
          </div>
          <div
            className="tool"
            onClick={() => dispatch({ type: 'redo' })}
          >
            Redo
          </div>
          <div
            className="tool"
            onClick={() => dispatch({ type: 'reset' })}
          >
            Reset
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
