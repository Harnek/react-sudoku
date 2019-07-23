/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generate, getConflicts, isDone } from '../utils/boardUtil';
import Row from './Row';
import Cell from './Cell';

function Board() {
  const [board, setBoard] = useState(generate());
  const [num, setNum] = useState(1);
  let status = getConflicts(board);

  const handleClick = (e) => {
    const row = e.target.parentNode.rowIndex;
    const col = e.target.cellIndex;
    
    let piece = num;
    if (board[row][col] != null) {
      piece = null;
    }

    const copy = [
      ...board.slice(0, row),
      [...board[row].slice(0, col), piece, ...board[row].slice(col + 1, 9)], 
      ...board.slice(row + 1, 9)
    ];
    setBoard(copy);
  }

  const handleToolClick = (e) => {
    const col = e.target.cellIndex;
    setNum(col + 1);
  }

  useEffect(() => {
    status = getConflicts(board);
  }, [board])

  return (
    <Fragment>
      <table className='board'>
        <tbody>
          { board.map((value, index) => (
            <Row
              row={index}
              cols={value}
              status={status}
              onClick={handleClick} 
            />
          ))}
        </tbody>
      </table>
      <table className='tools'>
        <tbody>
          <tr className='row'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
              <Cell 
                value={value}
                status={0}
                onClick={handleToolClick}
              />
            ))}
          </tr>
        </tbody>
      </table>
      <Link to='/menu/'>Menu</Link>
    </Fragment>
  );
}

export default Board;