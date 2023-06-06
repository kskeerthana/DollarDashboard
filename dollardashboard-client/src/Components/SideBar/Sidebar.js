import React, { useState } from 'react';
import './SideBar.css';
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
import { NavLink } from 'react-router-dom';


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    function handleIconClick() {
        localStorage.removeItem('username');
        localStorage.removeItem('token'); // call the function to remove the session
      }

    const menuItem = [
        {
            path: "/DashBoard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/profileEdit",
            name: "Profile",
            icon: <FaUserAlt />
        },
        {
            path: "/analytics",
            name: "ExpenseTrack",
            icon: <FaRegChartBar />
        },
        {
            path: "/comment",
            name: "ChatBot",
            icon: <FaCommentAlt />
        },
        {
            path: "/saving",
            name: "Saving Goal",
            icon: <FaShoppingBag />
        },
        {
            path: "/",
            name: "Logout",
            icon: <FaSignOutAlt />
        }
    ]
    return (
        <div className="container">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo"></h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            {item.name!='Logout' ? (
                                <>
                                    <div className="icon">{item.icon}</div>
                                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                                </>
                            ) : <><div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} onClick={handleIconClick} className="link_text">{item.name}</div> </>}
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;