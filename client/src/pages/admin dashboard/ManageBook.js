import React from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";

const ManageBook = () => {
    return (
        <section>
            <Navbar darkTheme={true} />
            <div className="adminpage">
                <Sidebar />
            </div>
        </section>
    )
}

export default ManageBook;