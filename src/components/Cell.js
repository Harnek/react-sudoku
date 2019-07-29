import PropTypes from 'prop-types';
import React from 'react';

function Cell(props) {
  const { value, status, selected, preFilled, handleEvent } = props;
  const classes = ['cell'];

  if (preFilled) {
    classes.push('preFilled');
  }

  if (status) {
    if (status === 1) {
      classes.push('light');
    } else if (status === 2) {
      classes.push('dark');
    }
  } else if (value && selected) {
    classes.push('selected');
  }

  return (
    <td
      className={classes.join(' ')}
      onMouseDown={e => handleEvent(e)}
      onMouseUp={e => handleEvent(e)}
    >
      {value}
    </td>
  );
}

Cell.propTypes = {
  value: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  preFilled: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  handleEvent: PropTypes.func.isRequired,
};

export default Cell;
