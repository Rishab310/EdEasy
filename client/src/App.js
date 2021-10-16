import {BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import './App.css';
import React, {useEffect} from 'react';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Classroom from './components/Classroom/Classroom';
import ScrollToTop from './components/partials/ScrollToTop/ScrollToTop';
import AssignmentAdmin from './components/AssignmentAdmin/AssignmentAdmin';
import StudentSubmission from './components/StudentSubmission/StudentSubmission';
import { useDispatch } from 'react-redux';
import { AUTOLOGIN } from './reduxSlices/authSlice';
import Reminders from './components/partials/Header/MobileReminder'
// import JoinClassroom from './components/Classroom/JoinClassroom';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AUTOLOGIN());
  }, []);
  return (
    <div className="app">
      <ScrollToTop>
        <Router>
           <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/classes' component={Dashboard} exact/>
            <Route path='/classes/reminders' component={Reminders}/>
            <Route path='/classes/:id' component={Classroom} exact/>
            <Route path='/classes/:id/:tab' component={Classroom}/>
            <Route path='/assignment/admin' component={AssignmentAdmin}/>
            <Route path='/assignment/student' component={StudentSubmission}/>
            <Redirect to ="/" />
          </Switch> 
        </Router>
      </ScrollToTop>
    </div>
  )
} 

export default App