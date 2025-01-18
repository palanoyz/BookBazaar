import React, { useState, useEffect } from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import { AxiosLib } from "../../lib/axios";
import AdminCardBook from "./components/AdminCardBook";

const ManageBook = () => {
    const [databooks, setDatabooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            AxiosLib
                .get("/api/getallbooks")
                .then((res) => {
                    setDatabooks(res.data);
                })
                .catch((err) => console.log(err));
        };
        getBooks();
    }, []);


    return (
        <section>

            <Navbar darkTheme={true} />
            <div className="adminpage">
                <Sidebar />
                <div className="admin-content">
                    <h2>Manage Books</h2>
                    <div className="admincardbook-container">
                        <AdminCardBook databook={databooks} />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default ManageBook;