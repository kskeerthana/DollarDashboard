import './App.css';
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
          <Route exact path="/expenseTrack" element={<NavScrollExample></NavScrollExample>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
