import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";


function ProfileP() {
    const [userDetails, setDetails] = useState([])
    const [base64String,setBase64] = useState(undefined)
     async function getUserData() {
        try {
            //const token = localStorage.getItem('token');

            //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2M3ODkxNzU2NTE1MjExY2VlNjI2NyIsImlhdCI6MTY4MTgzODQ3NywiZXhwIjoxNjg0NDMwNDc3fQ.2d8atxUPmcpHnEWdq3DAy4F6OUH5mriYCplgLCR03w0';
            const token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log("axios.defaults.headers")
            const response = await axios.get('http://localhost:8000/api/user/me')
            
            setDetails(response.data)
            const base64String = btoa(new Uint8Array(response.data.img.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, ''))
            setBase64(base64String)
    
          console.log(base64String)
        } catch (error) {
            //setShowAlert(true)
            console.log(error)
        }
    }
    
 useEffect(()=>{
    
    getUserData()
   
   
    
 },[])
//  const base64String="hello"
  
    return (  
        <>
            <div>ProfilePage</div>
            <div>
                {/* {data.map((singleData) => {

                    const base64String = btoa(new Uint8Array(singleData.img.data.data).reduce(function (data, byte) {
                        return data + String.fromCharCode(byte);
                    }, ''));

                    return <img src={`data:image/png;base64,${base64String}`} width="300" />
                })} */}
                
               { base64String==undefined?
                   
                    <img src={`asdasd`}  width="300" />
                  :
                    <img src={`data:image/png;base64,${base64String}`} width="300" />
                   }
                
               
                <p id='userName'>{userDetails.name}</p>
                <p id='email'>{userDetails.email}</p>
                <p id='email'>{userDetails.password}</p>
                {/* <button onClick=''>update</button> */}
                <Button onClick={() => { Navigate('/profileEdit') }}>Edit</Button>
            </div>
        </>

    ) ;
}

export default ProfileP;