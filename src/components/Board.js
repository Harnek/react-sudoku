/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isDone } from '../utils/boardUtil';
import Row from './Row';

function Board() {
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill(null)));
  const [num, setNum] = useState(1);
  const [winPos, setWinPos] = useState([]);

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
    const [ result, positions ] = isDone(board)
    if (result) {
      setWinPos(positions);

      setTimeout(() => {
        setWinPos([]);
      }, 3000)
    }

  }, [board])

  return (
    <Fragment>
      <table className='board'>
        <tbody>
          { board.map((row, index) => (
            <Row
              key={index}
              row={row}
              winPos={
                winPos
                .filter((pos) => pos[0] === index)
                .map((pos) => pos[1])
              }
              onClick={handleClick} 
            />
            )
          )}
        </tbody>
      </table>
      <table className='tools'>
        <tbody>
          <Row
            row={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            winPos={[]}
            onClick={handleToolClick} 
          />
        </tbody>
      </table>
      <Link to='/'>Menu</Link>
    </Fragment>
  );
}

export default Board;