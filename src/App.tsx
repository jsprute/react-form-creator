import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import { FormDisplay } from './pages/formDisplay'
import { Home } from './pages/home'
import './App.css';

function App() {

  return (
    <div className="App">
      <h1>My Form Creator</h1>
      <HashRouter>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/formdisplay'>Form Display</Link></li>
        </ul>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/formdisplay' component={FormDisplay}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
