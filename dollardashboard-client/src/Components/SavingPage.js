import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FaTrashAlt, FaEdit, FaPlus} from 'react-icons/fa';
import "./SavingPage.css";
import Contributions from './Contributions';
import UpdateGoalModal from './SavingUpdateModal';

const GoalDetails = () => {
  const [goal, setGoal] = useState(null);
  const { id } = useParams();
  const [show, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [goalProgress, setGoalProgress] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [myFunction, setMyFunction] = useState(null);
  const navigate = useNavigate();

  const getGoal = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log("On saving")
      const response = await axios.get(`http://localhost:8000/api/saving/${id}`);
      setGoal(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {

    if(!localStorage.getItem('username')){
      console.log('noUser')
      navigate('/');
    }

    getGoal();
    setMyFunction(getGoal);
  }, [id]);

  const handleContribution = async () => {
    try {
      console.log('In contribution modal')
      const addContribution = {
        goalId: id,
        amount: goalProgress
      };
      await axios.post(`http://localhost:8000/api/contribution`, addContribution);
      setSuccess(true);
      setShowModal(false);
      getGoal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleContriModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleContributionAdd = () => {
    getGoal();
  }
  
  const handleUpdated = (updatedGoal) => {
    setSuccess(true);
    setShowModal(false);
    setGoal(updatedGoal)
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/saving/${id}`);
      setSuccess(true);
      navigate('/saving');
      // do something after deleting goal
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddContribution = async () => {
    await axios.delete(`/api/goals/${id}`);
    // do something after deleting goal
  };

  if (!goal) {
    return <div>Loading...</div>;
  }

  // calculate days remaining
  const today = new Date();
  const endDate = new Date(goal.endDate);
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div>
        {success && (
        <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
          Goal successfully updated!
        </Alert>
      )}
    
    <div className="card-container">
      <Card className="card">
        <Card.Body>
          <Card.Title className="card-title">{goal.goalName}</Card.Title>
          <Card.Text className="card-text">
                <div className="goal-info">
                    <div className="goal-info-item">
                    <span className="goal-info-label">Target:</span>
                    <span className="goal-info-value">${goal.target}</span>
                    </div>
                    <div className="goal-info-item">
                    <span className="goal-info-label">Progress:</span>
                    <span className="goal-info-value">${goal.progress}</span>
                    </div>
                    <div className="goal-info-item">
                    <span className="goal-info-label">Days remaining:</span>
                    <span className="goal-info-value">{diffDays}</span>
                    </div>
                </div>
            </Card.Text>
          <div className="card-button">
            <UpdateGoalModal goal={goal} onUpdate={handleUpdated}/>
            <div className="button-group">
            <Button variant="success" onClick={handleContriModal}>
              <FaPlus /> Add Contribution
            </Button>
            <Button variant="danger" onClick={() => setShowConfirmation(true)}>
              <FaTrashAlt /> Delete
            </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      
    </div>
    <Contributions goalId={goal._id} success={success} onDeleteContri={handleContributionAdd}></Contributions>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contribution to Your Saving</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicContribution">
            <Form.Label>Your Contribution</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter goal name"
              value={goalProgress}
              onChange={(event) => setGoalProgress(event.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleContribution}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <MyConfirmationModal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default GoalDetails;

const MyConfirmationModal = ({ show, onHide, onConfirm }) => {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this saving goal?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
