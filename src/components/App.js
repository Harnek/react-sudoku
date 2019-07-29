import React, { useState, useEffect } from 'react';
import Board from './Board';

function App() {
  const [flag, setFlag] = useState(false);
  const [over, setOver] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFlag(true);
    }, 1500);
  }, []);

  useEffect(() => {
    let timeoutID = null;
    timeoutID = setTimeout(() => {
      setOver(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [over]);

  if (over) {
    return <div className="intro">Game Over</div>;
  }
  if (!flag) {
    return <div className="intro">Sudoku</div>;
  }
  return <Board gameOver={() => setOver(true)} />;
}

export default App;
