import {BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import './App.css';
import React from 'react'
import Home from './Components/Home/Home.js'

const App = () => {
  return (
    <div className="app">
      <Router>
         <Switch>
          <Route path='/' component={Home} exact>
          </Route>
          <Redirect to ="/" />
        </Switch> 
      </Router>
    </div>
  )
}

export default App

