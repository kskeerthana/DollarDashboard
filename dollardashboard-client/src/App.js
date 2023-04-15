import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/PageFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SaveGoalForm from './Components/AddSaving';
import GoalDetails from './Components/SavingPage';



function App() {
  return (
    <div className="App">
     <Header/>
     <Router>
    <Routes>
          <Route exact path="/saving" element={<SaveGoalForm></SaveGoalForm>} />
          <Route exact path="/saving/:id" element={<GoalDetails></GoalDetails>} />
    </Routes>
    </Router>
      <Footer/>
    </div>
  );
}

export default App;
