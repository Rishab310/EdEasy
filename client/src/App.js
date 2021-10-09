import {BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Classroom from './components/Classroom/Classroom';
import ScrollToTop from './components/partials/ScrollToTop/ScrollToTop';

const App = () => {
  return (
    <div className="app">
      <ScrollToTop>
        <Router>
           <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/classes' component={Dashboard} exact/>
            <Route path='/classes/:id' component={Classroom}/>
            <Redirect to ="/" />
          </Switch> 
        </Router>
      </ScrollToTop>
    </div>
  )
}

export default App