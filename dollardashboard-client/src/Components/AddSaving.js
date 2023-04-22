import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "./animation.css"
import 'react-datepicker/dist/react-datepicker.css';
import SavingGoals from './SavingGoals';

const SaveGoalForm = () => {
  const [goalName, setGoalName] = useState('');
  const [target, setTargetAmount] = useState('');
  const [endDate, setGoalEndDate] = useState(new Date());
//   const [userId, setUserId] = useState(localStorage.getItem('token'));

  const handleSaveGoal = async (e) => {
    e.preventDefault();

    const goalData = {
      goalName,
      target,
      endDate,
    };

    try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log(token , goalData)
        const response = await axios.post('http://localhost:8000/api/saving/', goalData);
          console.log(response.data);

          const data = await response.json();
            console.log(data)
        // setAuthenticated(true);
    //   const data = await response.json();
    //   console.log(data)
    // localStorage.setItem('username', response.data.name);
    //   localStorage.setItem('token', response.data.token); // Store JWT in localStorage
    //   navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
        console.log(error)
    }

    // const response = await fetch('/api/save-goal', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(goalData),
    // });

    ;
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1 className="form-heading">Start Your Saving Goal Today</h1>
        <Form className="form" onSubmit={handleSaveGoal}>
          <Form.Group controlId="formGoalName">
            <Form.Label>Goal Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter goal name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTargetAmount">
            <Form.Label>Target Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter target amount"
              value={target}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formGoalEndDate">
            <Form.Label>Goal End Date</Form.Label>
            <DatePicker
              className="form-control"
              selected={endDate}
              onChange={(date) => setGoalEndDate(date)}
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit" className="btn-save">
              Save Goal
            </Button>
          </div>
        </Form>
      </div>
      <SavingGoals/>
    </div>

  );
};

export default SaveGoalForm;
