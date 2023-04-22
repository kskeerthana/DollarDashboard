import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import './Contribution.css';

const Contributions = ({ goalId, success, onDeleteContri }) => {
  const [contributions, setContributions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contributionToDelete, setContributionToDelete] = useState(null);
  const [contributionCount, setContributionCount] = useState(1);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/contribution/${goalId}`);
        setContributions(response.data);
        console.log(response.data)
        console.log(contributions)
      } catch (error) {
        console.error(error);
      }
    };

    fetchContributions();
  }, [goalId, success]);

  const handleDeleteClick = (contribution) => {
    setContributionToDelete(contribution);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
     await axios.delete(`http://localhost:8000/api/contribution/${contributionToDelete._id}`);
      setContributions(contributions.filter((c) => c._id !== contributionToDelete._id));
      
      setShowDeleteModal(false);
      onDeleteContri();
    } catch (error) {
      console.error(error);
      // handle error
    }
    setContributionToDelete(null);
  };

  return (
    <div className="transaction-history-container">
      {contributions.map((contribution) => {
        return (
          <Card key={contribution._id} className="transaction-card">
            <Card.Body>
              <div className="transaction-details">
                <div className="transaction-amount">
                  ${contribution.amount}
                </div>
                <div className="transaction-date">
                  {new Date(contribution.createdAt).toLocaleDateString()}
                </div>
                <div className="transaction-delete">
                  <FaTrash onClick={() => handleDeleteClick(contribution)} />
                </div>
              </div>
            </Card.Body>
          </Card>
        )
      })}
      
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Contribution</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this contribution?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Contributions;
