import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";

const SavingGoals = () => {
  const [goals, setGoals] = useState([]);
  const [user, setUser] = useState("");
  const [goalProgress, setProgress] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log(token)
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
            'http://localhost:8000/api/saving/'
        );
        setGoals(response.data);
        console.log(response.data)
        setUser(response.data[0].user)
        console.log(user)
        

      } catch (error) {
        console.error(error);
      }
    };
    
    fetchGoals();
    // setProgress((goal.progress/goal.target)*100) ;
    // console.log(goalProgress);
  });

  return (
    <Wrapper>
      <Title>{user}'s Saving Goals</Title>
      <GoalsContainer>
        {goals.map((goal) => (
            <Link to={`http://localhost:3000/saving/${goal._id}`}>
            <Goal key={goal._id}>
            <GoalTitle>{goal.goalName}</GoalTitle>
            <CircularProgressbar value={(goal.progress/goal.target)*100} text={`${(goal.progress/goal.target)*100}%`} />
            </Goal>
            </Link>
          
    ))}
  </GoalsContainer>
</Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 2rem;
`;

const Goal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  width: 350px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const GoalTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

const ProgressContainer = styled.div`
  position: relative;
  width: 80%;
  height: 20%;
  margin-bottom: 1.5rem;
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: ${({ progress }) => `${progress}%`};
  height: 12px;
  background-color: #3f51b5;
  border-radius: 10px;
`;

const ProgressText = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CircularProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f5f5f5;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const CircularProgress = styled.div`
  position: relative;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: linear-gradient(to right, #3f51b5, #009688);
    transform: rotate(${({ progress }) => progress}deg);
    transform-origin: center;
  }
`;

const CircularProgressText = styled.span`
  position: absolute;
  font-size: 1.5rem;
  font-weight: bold;
`;

export default SavingGoals;