/* eslint-disable react/prop-types */
import React from 'react';
import Cell from './Cell';

function Row(props) {
  const { row, winPos, onClick } = props;
  return (
    <tr className='row'>
      { row.map((cell, index) => {
          return <Cell value={cell} onClick={onClick} winPos={winPos.includes(index)} />
        })
      }
    </tr>
  )
}

export default Row;