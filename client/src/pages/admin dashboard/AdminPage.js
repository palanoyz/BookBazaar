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
                    <div className="dash-bg">
                        {/* <h1>Dashboard</h1> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminPage;