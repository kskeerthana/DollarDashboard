import React from 'react'
import { HamBurger } from '../HamBurger/HamBurger'
import { NavigationBar } from '../NavigationBar/NavigationBar'
import Sidebar from '../SideBar/Sidebar'
import { Navbar, Nav } from 'react-bootstrap';
import ProfileEdit from '../ProfilePage/ProfileEdit';

export const DashBoard = () => {
  return (
    <div>
    {/* <NavigationBar></NavigationBar> */}
    <ProfileEdit></ProfileEdit>
    </div>
    
  )
}
