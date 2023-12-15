import React from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";

const ManageUser = () => {
    return (
        <section>           
            <Navbar darkTheme={true} />
            <Sidebar />         
            <div className="admin-content">
                <h1>Manage user</h1>
            </div>
            
        </section>
    )
}

export default ManageUser