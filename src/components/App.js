// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Board from './Board';
import '../style.css';

function Menu() {
  return (
    <div className='menu'>
      <Link to='/game/'>New Game</Link>
    </div>
  )
}

function App() {
  
  return (
    <Router>
      <Route path="/" exact component={Menu} />
      <Route 
        path='/game/'
        component={Board}
      />
    </Router>
  );
}

export default App;