import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SaveGoalForm from './Components/AddSaving';
import GoalDetails from './Components/SavingPage';
import Header from './Components/Header';
import Footer from './Components/PageFooter';
import NavScrollExample from './Components/addExpense';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header/>
	    <Router>
      <Routes>
      <Route path="/" element={<LoginForm></LoginForm>}></Route>
		  <Route exact path="/register" element={<RegisterForm></RegisterForm>} />
		  <Route exact path="/profileEdit" element={<ProfileEdit></ProfileEdit>} />
      <Route exact path="/saving" element={<SaveGoalForm></SaveGoalForm>} />
      <Route exact path="/saving/:id" element={<GoalDetails></GoalDetails>} />
      <Route exact path="/stock" element={<StockCalculator></StockCalculator>} />
      <Route exact path="/expenseTrack" element={<NavScrollExample></NavScrollExample>}/>
      </Routes>
    </Router>
      <Footer/>
    </div>


  );
}

export default App;
