import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import { Home, FormDisplay, FormList } from './pages'
import './App.css';

function App() {

  return (
    <div className="App">
      <HashRouter>
      <nav className = "navbar navbar-expand-sm navbar-dark bg-secondary">
            <a className = "navbar-brand" href = "#">Form Creator Demo</a>
            <button className = "navbar-toggler" type = "button" data-toggle = "collapse" 
               data-target = "#navbarSupportedContent" 
               aria-controls = "navbarSupportedContent" aria-expanded = "false" 
               aria-label = "Toggle navigation">
               <span className = "navbar-toggler-icon"></span>
            </button>
            <div className = "collapse navbar-collapse" id = "navbarSupportedContent">
               <ul className = "navbar-nav mr-auto">
                  <li className = "nav-item">
                    <Link className = "nav-link active" to='/'>Home<span className = "sr-only">(current)</span></Link>
                  </li>
                  <li className = "nav-item">
                    <Link className = "nav-link" to='/formlist'>Form Display</Link>
                  </li>
                  <li className = "nav-item">
                    <Link className = "nav-link" to='/formdisplay'>Form Display</Link>
                  </li>
               </ul>
            </div>
         </nav>
         <br/>
         <br/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/formlist' component={FormList}/>
          <Route path='/formdisplay' component={FormDisplay}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
