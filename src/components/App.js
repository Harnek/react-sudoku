import React, { useState, useEffect } from 'react';
import Board from './Board';

function App() {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFlag(true);
    }, 1500);
  }, []);

  if (!flag) {
    return <div className="intro">Sudoku</div>;
  }
  return <Board />;
}

export default App;
