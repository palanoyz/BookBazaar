import React from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";

const AdminPage = () => {
    return (
        <section>
            
            <Navbar darkTheme={true} />
            <div className="adminpage">          
                <Sidebar />
                <div className="admin-content">
                    <h1>Dashboardddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</h1>
                </div>
            </div>

        </section>
    )
}

export default AdminPage;