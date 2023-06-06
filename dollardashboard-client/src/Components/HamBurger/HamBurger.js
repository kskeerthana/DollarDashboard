import React from 'react'
import { Link } from 'react-router-dom';
// import './HamBurger.css'
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaSignOutAlt,
} from "react-icons/fa";
// import React, { useState } from 'react';

export const HamBurger = () => {

  return (
    <>
    <header className="header" style={{backgroundColor:'#36383F'}}>
        <a href="index.html"  className="logo">AR</a>
        <input  className="side-menu" type="checkbox" id="side-menu" />
        <label  className="hamb" for="side-menu"><span class="hamb-line"></span></label>
        <nav  className="nav">
            <ul c className="menu">
                <li><Link to="/profileEdit">Profie</Link></li>
                <li><Link to="/saving">Saving</Link></li>
                <li><Link to="/">Logout</Link></li>      
            </ul>
        </nav>
    </header>
    </>
  )
            
}
