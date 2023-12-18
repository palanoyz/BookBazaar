import React, { useState, useEffect } from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import { AxiosLib } from "../../lib/axios";
import UserCard from "./components/UserCard";

const ManageUser = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            AxiosLib
                .get("/admin/getalluser")
                .then((res) => {
                    setUserData(res.data);
                })
                .catch((err) => console.log(err));
        };
        getUser();
    }, []);

    return (
        <section>

            <Navbar darkTheme={true} />
            <div className="adminpage">               
                <Sidebar />
                <div className="admin-content">
                    <h2>Manage Users</h2>

                    <div>
                        <UserCard userData={userData} />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default ManageUser