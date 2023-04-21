import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";

export const ImageProfile = () => {
  
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8000/api/user/imageGet")
          .then((res) => setData(res.data))
          .catch((err) => console.log(err, "it has an error"));
      },[]);
  
    return (
    <div>
 <h1>Image uploading react</h1>
      {data.map((singleData) => {
       
        const base64String = btoa(new Uint8Array(singleData.img.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));

        return <img src={`data:image/png;base64,${base64String}`} width="300"/>
      })}

    </div>
  )
}
