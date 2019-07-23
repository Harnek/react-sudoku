/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';

function Cell(props) {
  const { value, status, onClick } = props;
  const classes = ['cell'];

  if (status) {
    if (status === 1) {
      classes.push('light');
    }else if (status === 2) {
      classes.push('dark');
    }
  }

  return (
    <td className={classes.join(' ')} onClick={(e) => onClick(e)}>
      {value}
    </td>
  );
}

export default Cell;