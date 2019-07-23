// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Board from './Board';
import '../style.css';

function Menu() {
  return (
    <div className='menu'>
      <Link to='/'>New Game</Link>
    </div>
  )
}

function App() {
  
  return (
    <Router>
      <Route path="/menu" exact component={Menu} />
      <Route path='/' exact component={Board} />
    </Router>
  );
}

export default App;