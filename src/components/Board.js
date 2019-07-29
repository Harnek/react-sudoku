import PropTypes from 'prop-types';
import React, { useEffect, useReducer, useState } from 'react';
import { generate, isDone } from '../utils/boardUtil';
import convertTime from '../utils/other';
import Row from './Row';
import Tools from './Tools';
import reducer, { init } from './useBoardReducer';

function Board(props) {
  const [state, dispatch] = useReducer(reducer, init(generate()));
  const [clickId, setClickId] = useState(null);
  const [timer, setTimer] = useState(0);
  const { gameOver } = props;

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {
    if (isDone(state.board)) {
      gameOver();
    }
  }, [gameOver, state, timer]);

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
      <Tools
        choice={state.choice}
        handleChoiceClick={choice =>
          dispatch({ type: 'choice', payload: { choice } })
        }
        handleOptionClick={type => dispatch({ type })}
      />
    </div>
  );
}

Board.propTypes = {
  gameOver: PropTypes.func.isRequired,
};

export default Board;
