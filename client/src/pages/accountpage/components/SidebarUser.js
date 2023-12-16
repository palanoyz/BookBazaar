import React from "react";
import "./sidebaruser.css"
import { Link, NavLink } from "react-router-dom";

const SidebarUser = () => {
    return (
        <div className="sidebaruser-container">
            <h2>Menu</h2>
            <ul className="sidebaruser">
                <li>
                    <Link to="/" className="sidebaruser-link">Admin Dashboard</Link>
                </li>
                <li>
                    <Link to="/" className="sidebaruser-link">Add Books</Link>
                </li>
                <li>
                    <Link to="/" className="sidebaruser-link">Manage Books</Link>
                </li>
                <li>
                    <Link to="/" className="sidebaruser-link">Manage Author & Publisher</Link>
                </li>
                <li>
                    <Link to="/" className="sidebaruser-link">Manage Users</Link>
                </li>
            </ul>
        </div>
    )
}

export default SidebarUser;