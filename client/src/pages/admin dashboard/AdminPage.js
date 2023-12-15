import React from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";

const AdminPage = () => {
    return (
        <section>           
            <Navbar darkTheme={true} />
            <Sidebar />         
            <div className="admin-content">
                <h1>Dashboarddsdfsdafdsgsdrgsfdgfsdgrsgrgregregdsgsdgsdggrgey456utghhgjhgkjg</h1>
                <p>hello</p>
            </div>

        </section>
    )
}

export default AdminPage;