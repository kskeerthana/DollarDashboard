import React from "react";
import './AboutUs.css';
import { NavigationBar } from '../NavigationBar/NavigationBarLand';
import Footer from "./Footer";

function AboutUs() {
  return (
    <>
    <NavigationBar></NavigationBar>
    <section>
      
      <h1>About Us</h1>
      <p>Welcome to our expense tracking website, where we help you take control of your finances by keeping track of your expenses. We understand that managing your money can be challenging, which is why we have created a user-friendly platform that allows you to easily track your expenses, set budgets, and analyze your spending habits. Our mission is to empower you with the tools you need to make informed financial decisions and reach your financial goals.
Our team consists of experienced professionals who are passionate about helping people achieve financial wellness. We believe that everyone deserves to have a clear understanding of their finances, regardless of their background or financial situation. That's why we have designed our website to be accessible and easy to use for anyone who wants to take control of their finances. Our team is committed to providing top-notch customer support, so you can always feel confident in using our platform.
.You can rest assured that your information is safe with us.</p>
    </section>
    {/* <Footer></Footer> */}
    </>
  );
}

export default AboutUs;