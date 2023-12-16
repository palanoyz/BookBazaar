import React from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";

const AdminPage = () => {
    return (
        <section>
            <div className="adminpage">    
                <Navbar darkTheme={true} />
                <Sidebar />         
                <div className="admin-content">
                    <h1>Dashboard</h1>
                </div>
            </div>   

        </section>
    )
}

export default AdminPage;