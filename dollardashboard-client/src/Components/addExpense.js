import React,{ useState } from "react";
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { faMagnifyingGlass, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import SaveExpenseDate from "./saveExpenseDate";
import './addExpense.css';
// import UpdateExpense from "./updateExpense";


function NavScrollExample() {
    const [show, setShow] = useState(false);
    // const [showSearch, setShowSearch] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    
    const [category,setCategoryName] = useState('');
    const [amount,setAmount] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    // const [search, setSearch] = useState(''); 
    const apiUrl = 'http://127.0.0.1:8000/api'

    // const handleSearchShow = () => setShowSearch(true);
    // const handleSearchClose = () => setShowSearch(false);

    // const [activeTab, setActiveTab] = useState('1');
    // const toggle = tab => {
    //   if(activeTab !== tab) setActiveTab(tab);
    // }

    const handleSubmit = async (e) => {
      e.preventDefault();
      handleClose();
      console.log('inside handle submit')
      const transactionData = {
        category,
        amount,
        description,
        date,
      };
      try{
        const user = localStorage.getItem('token')
        console.log('user here')
        axios.defaults.headers.common['Authorization'] = `Bearer ${user}`
        const result = await axios.post(`${apiUrl}/transaction/addTransaction`,transactionData);
        console.log(result.data);
        handleShow(false)
      }catch(error){
        console.log(error)
      };
      
    } ;

    const [searchTerm, setSearchTerm] = useState('');
    const [transactions, setTransactions] = useState([]);
    
    const handleSearch = async (e) => {
      e.preventDefault();
      console.log('inside handle search')
      try {
        const user = localStorage.getItem('token')
        console.log(user)
        axios.defaults.headers.common['Authorization'] = `Bearer ${user}`
        const url = `http://localhost:8000/api/transaction/getTransactionByCategory?category=${searchTerm}`
        const response = await axios.get(url);
        console.log(response.data.data)
        setTransactions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };

    return (
      <div>
      <Navbar bg="light" expand="sm">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="mr-auto" onSubmit={handleSearch}>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleChange}
            />
            <Button variant="outline-success" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Form>
          <Button className="add-button" variant="outline-success" onClick={handleShow}>
            Add Expense
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-3">
        {transactions.map((transaction) => (
          <div key={transaction.title} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{transaction.category}</h5>
              <p className="card-text">{transaction.description}</p>
              <h6 className="card-subtitle mb-2 text-muted">{transaction.date}</h6>
              <p className="card-text">${transaction.amount}</p>
            </div>
          </div>
        ))}
        <Modal show={show} onClose={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="md" controlId="categoryDropdown" value={category} onChange={(e) => setCategoryName(e.target.value)}>
                        <Form.Label>Category</Form.Label>
                        <Form.Select aria-label="Category">
                            <option>Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Rentals">Rentals</option>
                            <option value="Utilities-Electricity">Utilities-Electricity</option>
                            <option value="Utilities-Gas">Utilities-Gas</option>
                            <option value="Utilities-Water">Utilities-Water</option>
                            <option value="Wifi bill">Wifi bill</option>
                            <option value="Education">Education</option>
                            <option value="Medical">Medical</option>
                            <option value="Tax">Tax</option>
                        </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="transactionAmount" value={amount} onChange={(e) => setAmount(e.target.value)}>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter amount"/>
                        </Form.Group>

                        <Form.Group values={description} onChange={(e) => setDescription(e.target.value)}>
                          <Form.Label>Note</Form.Label>
                          <Form.Control as="textarea" placeholder="Add Notes" />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicCheckbox" value={date} onChange={(e) => setDate(e.target.value)}>
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control type="date" name="DOT" placeholder="Date of Transaction"/>
                        </Form.Group>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button type="submit" variant="primary" onClick={handleSubmit}>Save Changes</Button>
                    </Form> 
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
            <SaveExpenseDate/>
      </div>
      </div>
      
        
        
      
  );
}

export default NavScrollExample;
