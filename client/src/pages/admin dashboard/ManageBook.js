import React, { useState, useEffect } from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
import { AxiosLib } from "../../lib/axios";
import AdminCardBook from "./components/AdminCardBook";

const ManageBook = () => {
    return (
        <section>
            <div className="adminpage">    
                <Navbar darkTheme={true} />
                <Sidebar />         
                <div className="admin-content">
                    <h1>Manage book</h1>
                </div>
            </div>   

        </section>
    )
}

export default ManageBook;