import React from 'react'
import AboutUs from "./AboutUs";
import LandingPage from './LandingPage';
import TeamsSection from "./TeamsSection";
import Footer from "./Footer";
import Header from "./Header";
//mport { LandingPage1 } from './components/LandingPage1';
import { NavigationBar} from '../NavigationBar/NavigationBarLand'

export const LandingPage1 = () => {
  return (
    <>
    <div>
    {/* <Header /> */}
    <NavigationBar></NavigationBar>
    <AboutUs />
    <LandingPage/>
    <TeamsSection />
    <Footer />
  </div>
    </>
   
  )
}
