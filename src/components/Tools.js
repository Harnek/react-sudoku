import PropTypes from 'prop-types';
import React from 'react';

function Tools(props) {
  const { choice, handleChoiceClick, handleOptionClick } = props;

  return (
    <div className="tools">
      <table>
        <tbody>
          <tr className="row">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
              <td
                className={[
                  'cell',
                  value === choice ? 'selected' : '',
                ].join(' ')}
                onClick={e => handleChoiceClick(Number(e.target.innerHTML))}
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
          onClick={() => handleOptionClick('undo')}
        >
          Undo
        </div>
        <div
          className="tool"
          onClick={() => handleOptionClick('redo')}
        >
          Redo
        </div>
        <div
          className="tool"
          onClick={() => handleOptionClick('reset')}
        >
          Reset
        </div>
      </div>
    </div>
  );
}

Tools.propTypes = {
  choice: PropTypes.number.isRequired,
  handleChoiceClick: PropTypes.func.isRequired,
  handleOptionClick: PropTypes.func.isRequired,
};

export default Tools;
