import {BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from './Components/home/Home';
import ScrollToTop from './Components/partials/ScrollToTop/ScrollToTop';
import Dashboard from './Components/Dashboard/Dashboard';
import AssignmentAdmin from './Components/AssignmentAdmin/AssignmentAdmin';
// import ScrollToTop from './components/partials/ScrollToTop/ScrollToTop';

const App = () => {
  return (
    <div className="app">
      <ScrollToTop>
        <Router>
           <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/classes' component={Dashboard} exact/>
            <Route path='/assignment/submission' component={AssignmentAdmin} exact/>
            <Redirect to ="/" />
          </Switch> 
        </Router>
      </ScrollToTop>
    </div>
  )
}

export default App

