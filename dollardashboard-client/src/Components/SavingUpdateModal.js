import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { FaExclamation, FaEdit } from 'react-icons/fa';

function UpdateGoalModal({ goal, onUpdate }) {
  const [show, setShow] = useState(false);
  const [goalName, setGoalName] = useState(goal.goalName);
  const [target, setTarget] = useState(goal.target);
  const [endDate, setEndDate] = useState(new Date(goal.endDate));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = async () => {
    try {
        console.log('In update modal')
      const updatedGoal = {
        ...goal,
        goalName,
        target,
        endDate,
      };
      await axios.put(`http://localhost:8000/api/saving/${goal._id}`, updatedGoal);
      onUpdate(updatedGoal);
      setShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FaEdit /> Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicGoalName">
            <Form.Label>Goal Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter goal name"
              value={goalName}
              onChange={(event) => setGoalName(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicTarget">
            <Form.Label>Target</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter target"
              value={target}
              onChange={(event) => setTarget(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEndDate">
            <Form.Label>End Date</Form.Label>
            <br />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateGoalModal;
