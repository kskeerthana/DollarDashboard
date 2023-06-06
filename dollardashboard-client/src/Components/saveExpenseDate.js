import axios from 'axios';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Card, Modal, Nav, Button, ButtonGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import './saveExpense.css'


function SaveExpenseDate() {

  const [transactionId, setTransactionId] = useState("")
  const [updateDetails, setUpdateDetails] = useState({
    category:"",
    amount:"",
    description:"",
    date:""
  })

  const handleChange = (e) =>{
    e.preventDefault();
    setUpdateDetails({
      ...updateDetails,
      [e.target.name]: e.target.value
    })

    console.log(updateDetails)
    }

  
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const { id } = useParams();
  
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true); 

  const [showDel, setShowDel] = useState(false);
  const handleDelClose = () => setShowDel(false);
  const handleDelShow = () => setShowDel(true); 

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [success, setSuccess] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);
  
  

  useEffect(() => {
    console.log("in expense")
    // Fetch transactions for the selected month
    if (selectedMonth) {
      fetchTransactions(selectedMonth);
    }
  }, [selectedMonth]);

  const fetchTransactions = async (month) => {
    // Call an API to fetch transactions for the selected month
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const startOfMonth = new Date(year, monthIndex, 1).toISOString().slice(0, 10);
    const endOfMonth = new Date(year, monthIndex + 1, 0).toISOString().slice(0, 10);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(token)
    console.log('printing date',startOfMonth,endOfMonth)
    const url = `http://localhost:8000/api/transaction/getTransaction/?startDate=${startOfMonth}&endDate=${endOfMonth}`;
    const response = await axios.get(url);
    console.log(response.data.data)
    setTransactions(response.data.data);
  };

  const handleMonthClick = (label) => {
    const currentDate = new Date();
    let selectedDate;

    switch (label) {
      case 'This Month':
        selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        break;
      case 'Last Month':
        selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        break;
      case 'Future':
        selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        break;
      default:
        selectedDate = null;
    }

    setSelectedMonth(selectedDate);
  };

  const handleCardClick = (transaction) => {
    console.log('click!')
    setSelectedTransaction(transaction);
    handleShow();
  };

  const handleUpdated = (updatedGoal) => {
    setShowModal(false);
    setTransactions(updatedGoal)
  };
  
  const handleShowModal = async() => {
    setShowModal(true);
    //Axios call for Update here
    
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/transaction/deleteTransaction/${id}`);
      setSuccess(true);
      // do something after deleting goal
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const total = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    setTotalAmount(total);
  }, [transactions]);

  
 

  // const handleUpdate = async(t) => {
    
  // }

  return(
    <><div style={{}}></div>
  <Card className="card-container" style={{margin:'auto'}}>
    <Card.Header>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link onClick={() => handleMonthClick('This Month')}>This Month</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleMonthClick('Last Month')}>Last Month</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleMonthClick('Future')}>Future</Nav.Link>
        </Nav.Item>
      </Nav>
    </Card.Header>
    <Card.Body>
        {transactions.length === 0 ? (
          <p>No transactions for {selectedMonth?.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
        ) : (
          <ul className="list-group">
            <h5>Transactions total for this month: {totalAmount}</h5>
            {transactions.map((transaction) => (
                <div key={transaction._id}>
                    <Card.Text><h4>{transaction.category}</h4></Card.Text>
                    <Card.Text className='muted'>{transaction.description}</Card.Text>
                    <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Expense</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                      <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select aria-label="Category" name="category" value={updateDetails.category} onChange={handleChange}>
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
                      <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control name="amount" value={updateDetails.amount} onChange={handleChange} type="number" placeholder="Enter amount"/>
                      </Form.Group>

                        <Form.Group name="description">
                            <Form.Label>Note</Form.Label>
                            <Form.Control name="description" value={updateDetails.description} onChange={handleChange} as="textarea" placeholder="Add Notes" />
                        </Form.Group>
                                    
                        <Form.Group className="mb-3">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control name="date" value={updateDetails.date} onChange={handleChange} type="date" placeholder="Date of Transaction"/>
                        </Form.Group>
                        </Form>    
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={async (e) =>{
                          e.preventDefault();
                          console.log(transaction._id)
                            const token = localStorage.getItem('token');
                            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                            console.log('id and updated expense',transaction._id,updateDetails)
                            try{
                              await axios.put(`http://localhost:8000/api/transaction/editTransaction/${transaction._id}`, updateDetails);
                              setShowModal(false);
                            }
                            catch(error){
                              console.error(error)
                            }
                      }}>
                        Update Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal show={showDel} onHide={handleDelClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete this saving goal?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleDelClose}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={async (e) =>{
                        e.preventDefault();
                          console.log(transaction._id)
                            const token = localStorage.getItem('token');
                            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                            console.log('delete id',transaction._id)
                            try{
                              await axios.delete(`http://localhost:8000/api/transaction/deleteTransaction/${transaction._id}`);
                              setShowDel(false);
                            }
                            catch(error){
                              console.error(error)
                            }
                      }}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
                    <ListGroup transaction="list-group-flush">
                      <ListGroup.Item>
                        <h4>{transaction.amount}$</h4><br/>
                        
                        {transaction.date = new Date(transaction.date).toLocaleDateString()}
                        <div className="button-group-container">
                          <ButtonGroup aria-label="Transaction Actions">
                            <Button variant="success" onClick={handleShowModal}>Edit</Button>
                            <Button variant="danger" onClick={handleDelShow}>Delete</Button>
                        </ButtonGroup>
                      </div>
                    </ListGroup.Item>
                    </ListGroup>
                </div>
            ))}
      </ul>
      )}
      </Card.Body>
      </Card>
      </>
  );
}

export default SaveExpenseDate;  
