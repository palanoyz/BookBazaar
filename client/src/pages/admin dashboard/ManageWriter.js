import React, { useState, useEffect } from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
import { AxiosLib } from "../../lib/axios";
import AdminCardBook from "./components/AdminCardBook";

const ManageWriter = () => {

    const [dataAuthor, setDataAuthor] = useState({
        name: "",
    });
    const [dataPublisher, setDataPublisher] = useState({
        name: "",
    });
    const [dataCategory, setDataCategory] = useState({
        name: "",
    });
    const [Author, setAuthor] = useState([]);
    const [Publisher, setPublisher] = useState([]);
    const [Category, setCategory] = useState([]);

    const handleChangeAuthor = (e) => {
        setDataAuthor({
            ...dataAuthor,
            [e.target.name]: e.target.value,
        });
    };
    const handleChangePublisher = (e) => {
        setDataPublisher({
            ...dataPublisher,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeCategory = (e) => {
        setDataCategory({
            ...dataCategory,
            [e.target.name]: e.target.value,
        });
    };

    const addAuthor = async () => {
        AxiosLib.post("/api/addAuthor", dataAuthor).then((res) => {
            console.log(res.data);
        });
    };
    const addPublisher = async () => {
        AxiosLib.post("/api/addPublisher", dataPublisher).then((res) => {
            console.log(res.data);
        });
    };

    const addCategory = async () => {
        AxiosLib.post("/api/addCatagory", dataCategory).then((res) => {
            console.log(res.data);
        });
    };

    // useEffect(() => {
    //     const getAuthor = async () => {
    //         const res = await AxiosLib.get("/admin/getAPC/author");
    //         setAuthor(res.data.result);
    //     };
    //     const getPublisher = async () => {
    //         const res = await AxiosLib.get("/admin/getAPC/publisher");
    //         setPublisher(res.data.result);
    //     };
    //     const getCategory = async () => {
    //         const res = await AxiosLib.get("/admin/getAPC/category");
    //         setCategory(res.data.result);
    //     };
    //     getAuthor();
    //     getPublisher();
    //     getCategory();
    // }, []);

    return (
        <section>

            <Navbar darkTheme={true} />
            <div className="adminpage">
                <Sidebar />
                <div className="admin-content">
                    <h1>Manage Writer</h1>
                </div>

            </div>

        </section>
    )
}

export default ManageWriter;