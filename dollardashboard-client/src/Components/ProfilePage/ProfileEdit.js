import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
// import { imageHolder } from '../ProfilePage/ImageHolder/profileImageHolder.png'
import imageHolder from '../ProfilePage/ImageHolder/profileImageHolder.png';
import './profileEdit.css';
import Sidebar from '../SideBar/Sidebar';
//import { HamBurger } from '../HamBurger/HamBurger';
import { NavigationBar } from '../NavigationBar/NavigationBar'

export const ProfileEdit = () => {

    const [userDetails, setDetails] = useState([])
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [contact, setContact] = useState(0);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const [userUpdated, setUserUpdated] = useState(false);
    const [base64String, setBase64] = useState(undefined);

    useEffect(() => {
        if (!localStorage.getItem('username')) {
            console.log('noUser')
            navigate('/');
        }
        getUserData();
        console.log('hello')
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

            const base64String = btoa(new Uint8Array(response.data.img.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, ''))
            setBase64(base64String)



        } catch (error) {
            //setShowAlert(true)
            console.log(error)
        }
    }


    const uploadImageOnClick = async (e) => {

        //alert('Image Upload')
        console.log(image)
        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const formData = new FormData();
        formData.append('imageName', imageName);
        formData.append('testImage', image);


        const responseImage = await axios.post('http://localhost:8000/api/user/imageUpload', formData).then((response) => {
            console.log(response.data);
            //alert('Image Upload 1')
        })
            .catch((error) => {
                console.log(error);
            });

    }

    const handleSubmit = async (e) => {
        //alert('Testing')
        e.preventDefault();
        try {
            const token = localStorage.getItem('token')
            const googleSignIn = localStorage.getItem('googleLogIn')
            console.log(image)
            const formData = new FormData();
            formData.append('imageName', imageName);
            formData.append('testImage', image);


            // Validate name field
            if (name.trim() === '') {
                alert('Please enter a name');
                return;
            }

            // Validate age field
            if (isNaN(age) || age <= 0 || age > 120) {
                alert('Please enter a valid age');
                return;
            }

            // Validate contact field
            if (!/^\d{10}$/.test(contact)) {
                alert('Please enter a valid phone number with 10 digits');
                return;
            }

            // Validate gender field
            if (gender === 'Choose...') {
                alert('Please select a gender');
                return;
            }


            const responseImage = await axios.post('http://localhost:8000/api/user/imageUpload', formData).then((response) => {
                console.log(response.data);
                //alert('Image Upload 1')
            })
                .catch((error) => {
                    console.log(error);
                });



            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.put('http://localhost:8000/api/user/edit', {
                name,
                age,
                gender,
                contact,
                googleSignIn,

            });

            console.log(response.data);
            setUserUpdated(userUpdated, true)
            alert("User Updated");
            getUserData();
            //navigate('/');
        } catch (error) {
            alert(error.response.data.message);
            //console.log(error)
            console.log(error.response)
        }

    }

    return (
        <>
                    {/* <HamBurger></HamBurger> */}
                    <NavigationBar></NavigationBar>
                    <h1 class="header-title">User Profile Page</h1>
                    <div>

                        <Form onSubmit={handleSubmit} className='profileEditForm'>
                            <div className='dispImageOuter'>
                                {base64String == undefined ? <img src={imageHolder} width="300" className='profileImage' /> : <img src={`data:image/png;base64,${base64String}`} width="300" className='profileImage' />}

                                <Form.Group controlId="formName">
                                    <Form.Label htmlFor="image-upload" className='uploadImage' >
                                        <FaUpload size={20} />
                                    </Form.Label>
                                    <Form.Control
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => { setImage(e.target.files[0]); setImageName(e.target.files[0].name); }}
                                    />
                                </Form.Group>
                            </div>
                            <Form.Group controlId="formName">
                                <Form.Label style={{ color: 'white' }}>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} style={{ border: "none", borderBottom: "1px solid black" }} />
                            </Form.Group>

                            <Form.Group controlId="formAge">
                                <Form.Label style={{ color: 'white' }}>Age</Form.Label>
                                <Form.Control type="number" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)} style={{ border: "none", borderBottom: "1px solid black" }} />
                            </Form.Group>

                            <Form.Group controlId="formContact">
                                <Form.Label style={{ color: 'white' }}>Contact</Form.Label>
                                <Form.Control type="number" placeholder="Enter contact" value={contact} onChange={(e) => setContact(e.target.value)} style={{ border: "none", borderBottom: "1px solid black" }} />
                            </Form.Group>

                            <Form.Group controlId="formGender">
                                <Form.Label style={{ color: 'white' }}>Gender</Form.Label>
                                <Form.Control as="select" defaultValue="Choose..." value={gender} onChange={(e) => setGender(e.target.value)} style={{ border: "none", borderBottom: "1px solid black" }}>
                                    <option>Choose...</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </Form.Control>
                            </Form.Group>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ flexGrow: 0 }}></div>
                                <div style={{ display: 'inline-block' }}>
                                    <Button variant="primary" type="submit" style={{ width: '100px' }} >Save</Button>
                                </div>
                                <div style={{ display: 'inline-block', marginTop: '12px' }}>
                                    <Button variant="primary" onClick={() => navigate('/dashboard')} style={{ width: '100px', padding: '7px' }} >Cancel</Button>
                                </div>
                                <div style={{ flexGrow: 0 }}></div>
                            </div>


                        </Form>
                    </div>
                </>

                )
}

export default ProfileEdit;