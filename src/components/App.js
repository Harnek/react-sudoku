import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Board from './Board';
import '../style.css';

function Menu() {
  return (
    <div className='menu'>
      <Link to='/game'>New Game</Link>
    </div>
  )
}

// const Child = ({ match }) => {
//   console.log(match)
  
//   return (
//     <div>
//       <h3>ID: {match.params.id}</h3>
//     </div>
//   )
// }

function App() {

  return (
    <Router>
      {/* <Route path="/" component={Child} /> */}
      <Route path="/" exact component={Menu} />
      <Route path="/game" exact component={Board} />
    </Router>
  );
}

export default App;