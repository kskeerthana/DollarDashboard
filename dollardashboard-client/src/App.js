import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SaveGoalForm from './Components/AddSaving';
import GoalDetails from './Components/SavingPage';
import Header from './Components/Header';
import Footer from './Components/PageFooter';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './Components/Login/LoginComponent';
import RegisterForm from './Components/Registration/RegisterComponent';
import 'react-toastify/dist/ReactToastify.css'
import { ProfileEdit } from './Components/ProfilePage/ProfileEdit';
import StockCalculator from './Components/StockTracker';
import { DashBoard } from './Components/DashBoard/DashBoard';
import { HamBurger } from './Components/HamBurger/HamBurger';


function App() {
  return (
    <div className="App">
     {/* <Header/> */}
	    <Router>
      <Routes>
      <Route path="/" element={<LoginForm></LoginForm>}></Route>
		  <Route exact path="/register" element={<RegisterForm></RegisterForm>} />
      {/* <Route exact path='/dashboard' element={<DashBoad></DashBoad>}/> */}
      <Route exact path="/dashboard" element={<DashBoard></DashBoard>}/>
		  <Route exact path="/profileEdit" element={<ProfileEdit></ProfileEdit>} />
      <Route exact path="/saving" element={<SaveGoalForm></SaveGoalForm>} />
      <Route exact path="/saving/:id" element={<GoalDetails></GoalDetails>} />
      <Route exact path="/stock" element={<StockCalculator></StockCalculator>} />
      <Route exact path="/hamburger" element={<HamBurger></HamBurger>}/>
      </Routes>
    </Router>
      {/* <Footer/> */}
    </div>


  );
}

export default App;
