/* eslint-disable react/prop-types */
import React from 'react';
import Cell from './Cell';

function Row(props) {
  const { row, cols, status, onClick } = props;

  return (
    <tr className='row'>
      { cols.map((value, col) => {
          return (
            <Cell 
              value={value} 
              status={status[row][col]}
              onClick={onClick}
            />
          )
        })
      }
    </tr>
  )
}

export default Row;