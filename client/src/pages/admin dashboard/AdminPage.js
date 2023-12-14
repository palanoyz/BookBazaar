import React from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";

const AdminPage = () => {
    return (
        <section>
            <Navbar darkTheme={true} />
            <div className="adminpage">
                <Sidebar />
                <p>dsadsadsad</p>
            </div>
        </section>
    )
}

export default AdminPage;