import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SaveGoalForm from './Components/AddSaving';
import GoalDetails from './Components/SavingPage';
import Header from './Components/Header';
import Footer from './Components/PageFooter';
import StockCalculator from './Components/StockTracker';

function App() {
  return (
    
    <Router>
      <Header></Header>
    <Routes>
          {/* <Route path="/" element={<LoginForm></LoginForm>}></Route>
          <Route exact path="/register" element={<RegisterForm></RegisterForm>} /> */}
          <Route exact path="/saving" element={<SaveGoalForm></SaveGoalForm>} />
          <Route exact path="/saving/:id" element={<GoalDetails></GoalDetails>} />
          <Route exact path="/stock" element={<StockCalculator></StockCalculator>} />
          {/* <Route exact path="/about-us" element={<AboutUsPage></AboutUsPage>} />
          <Route exact path="/contact-us" element={<ContactUsPage></ContactUsPage>} />
          <Route exact path="/job" element={<Job></Job>} /> */}
          
          {/* <Route path="/contact" component={ContactPage} /> */}
        
    </Routes>
    <Footer></Footer>
    </Router>
  );
}

export default App;
