import React from "react";
import "./sidebar.css"
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <ul className="sidebar">
                <li >
                    <Link to="/admin/dashboard" className="sidebar-link">Admin Dashboard</Link>
                </li>
                <li >
                    <Link to="/admin/addbook" className="sidebar-link">Add Books</Link>
                </li>
                <li>
                    <Link to="/admin/managebook" className="sidebar-link">Manage Books</Link>
                </li>
                <li>
                    <Link to="/admin/manageuser" className="sidebar-link">Manage Users</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;