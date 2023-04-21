import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {

    const [userDetails, setDeatils] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        console.log("hello")
     
       },[])
    
    const base64String = btoa(new Uint8Array(userDetails.img.data.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
    

    return (
        <>
            <div>ProfilePage</div>
            <div>
               { base64String==undefined?
                   
                    <img src={`data:image/png;base64,${base64String}`}  width="300" />
                  :
                    <img src={`data:image/png;base64,${base64String}`} width="300" />
                   }
                
               
                <p id='userName'>{userDetails.name}</p>
                <p id='email'>{userDetails.email}</p>
                <p id='email'>{userDetails.password}</p>
                {/* <button onClick=''>update</button> */}
                <Button onClick={() => { navigate('/profileEdit') }}>Edit</Button>
            </div>
        </>

    )
}
