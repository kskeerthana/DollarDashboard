import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/PageFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './Components/Login/LoginComponent';
import RegisterForm from './Components/Registration/RegisterComponent';
import 'react-toastify/dist/ReactToastify.css'
import { ProfileEdit } from './Components/ProfilePage/ProfileEdit';


function App() {
  return (
    <div className="App">
     <Header/>
	    <Router>
      <Routes>
      <Route path="/" element={<LoginForm></LoginForm>}></Route>
		  <Route exact path="/register" element={<RegisterForm></RegisterForm>} />
		  <Route exact path="/profileEdit" element={<ProfileEdit></ProfileEdit>} />
      </Routes>
    </Router>
      <Footer/>
    </div>
  );
}

export default App;
