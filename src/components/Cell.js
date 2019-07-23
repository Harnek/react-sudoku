/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';

function Cell(props) {
  const { value, winPos, onClick } = props;
  let winClass = '';
  if (winPos) {
    winClass = ' winCell'
  }

  return (
    <td className={`cell${winClass}`} onClick={(e) => onClick(e)}>
      {value}
    </td>
  );
}

export default Cell;