import PropTypes from 'prop-types';
import React from 'react';
import Cell from './Cell';

function Row(props) {
  const {
    rowIndex,
    cols,
    status,
    selected,
    preFilled,
    handleEvent,
  } = props;

  return (
    <tr className="row">
      {cols.map((value, colIndex) => (
          <Cell
            value={value}
            status={status[rowIndex][colIndex]}
            selected={selected === value}
            preFilled={preFilled[rowIndex][colIndex] !== null}
            handleEvent={handleEvent}
            key={colIndex}
          />
        ))}
    </tr>
  );
}

Row.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cols: PropTypes.arrayOf(PropTypes.number).isRequired,
  status: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
    .isRequired,
  preFilled: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
    .isRequired,
  selected: PropTypes.number.isRequired,
  handleEvent: PropTypes.func.isRequired,
};

export default Row;
