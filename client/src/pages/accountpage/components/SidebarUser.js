import React from "react";
import "./sidebaruser.css"
import { Link, NavLink } from "react-router-dom";

const SidebarUser = () => {
    return (
        <div className="sidebaruser-container">
            <h2>Menu</h2>
            <ul className="sidebaruser">
                <li>
                    <Link to="/account" className="sidebaruser-link">Change Password</Link>
                </li>
                <li>
                    <Link to="/account" className="sidebaruser-link">My Books</Link>
                </li>
            </ul>
        </div>
    )
}

export default SidebarUser;