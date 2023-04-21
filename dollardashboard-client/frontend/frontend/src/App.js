import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/Login/LoginComponent';
import RegisterForm from './components/Registration/RegisterComponent';
import Dashboard from './pages/Dashboard';
import AboutUsPage from './pages/AboutUs';
import ContactUsPage from './pages/ContactUs';
import Job from './pages/Job';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ProfileEdit} from './components/ProfilePage/ProfileEdit';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { ImageProfile } from './components/ImageProfile/ImageProfile';
import ProfileP from './components/ProfilePage/ProfileP';
import {ProfileEdit1} from './components/ProfilePage/ProfileEdit1';

function App() {
  return (
    <>
    <Router>
    <Routes>
          <Route path="/" element={<LoginForm></LoginForm>}></Route>
          <Route exact path="/register" element={<RegisterForm></RegisterForm>} />
          <Route exact path="/dashboard" element={<Dashboard></Dashboard>} />
          <Route exact path="/about-us" element={<AboutUsPage></AboutUsPage>} />
          <Route exact path="/contact-us" element={<ContactUsPage></ContactUsPage>} />
          <Route exact path="/job" element={<Job></Job>} />
          <Route exact path="/profile" element={<ProfileP></ProfileP>} />
          <Route exact path="/profileEdit" element={<ProfileEdit></ProfileEdit>} />
          <Route exact path="/imageprofile" element={<ImageProfile></ImageProfile>} />
          
          {/* <Route path="/contact" component={ContactPage} /> */}
        
    </Routes>
    </Router>
    <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
