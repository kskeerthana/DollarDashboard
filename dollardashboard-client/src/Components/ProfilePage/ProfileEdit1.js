import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';

export const ProfileEdit1 = () => {

    const [userDetails, setDetails] = useState([])
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [contact, setContact] = useState(0);

    useEffect(() => {
        getUserData();
    }, []);

    async function getUserData() {

        try {
            //const token = localStorage.getItem('token');
            //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2M3ODkxNzU2NTE1MjExY2VlNjI2NyIsImlhdCI6MTY4MTgzODQ3NywiZXhwIjoxNjg0NDMwNDc3fQ.2d8atxUPmcpHnEWdq3DAy4F6OUH5mriYCplgLCR03w0';
            const token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get('http://localhost:8000/api/user/me')
            console.log(response.data);
            setDetails(response.data);
            //setDetails(response.data);
            console.log(response.data.name);
            setName(response.data.name);

            console.log(response.data.age);
            setAge(response.data.age);

            console.log(response.data.gender);
            setGender(response.data.gender);

            console.log(response.data.contact);
            setContact(response.data.contact);

        } catch (error) {
            //setShowAlert(true)
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        //alert('Testing')
        e.preventDefault();
        try {
            //console.log('Testing')
            //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2M3ODkxNzU2NTE1MjExY2VlNjI2NyIsImlhdCI6MTY4MTgzODQ3NywiZXhwIjoxNjg0NDMwNDc3fQ.2d8atxUPmcpHnEWdq3DAy4F6OUH5mriYCplgLCR03w0';
            const token = localStorage.getItem('token')
            const googleSignIn = localStorage.getItem('googleLogIn')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.put('http://localhost:8000/api/user/edit', {
                name,
                age,
                gender,
                contact,
                googleSignIn
            });

            console.log(response.data);
            alert("User Updated");
            //navigate('/');
        } catch (error) {
            alert(error.response.data.message);
            //console.log(error)
            console.log(error.response)
        }

    }

    return (
        <>
            <div>ProfilePage</div>
            <div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label htmlFor="image-upload">
                            <FaUpload size={50} />
                        </Form.Label>
                        <Form.Control
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            // onChange={handleImageChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formContact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="number" placeholder="Enter contact" value={contact} onChange={(e) => setContact(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option>Choose...</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </Form.Control>
                    </Form.Group>
                    <div>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </div>
                    <div><Button variant="primary" onClick={() => navigate('/profile')}>
                        Cancel
                    </Button>

                    </div>



                </Form>

            </div>
        </>

    )
}
