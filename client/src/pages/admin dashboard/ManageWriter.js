import React, { useState, useEffect } from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import { AxiosLib } from "../../lib/axios";
import WriterCard from "./components/WriterCard";

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
        AxiosLib.post("/admin/addAuthor", dataAuthor).then((res) => {
            console.log(res.data);
            window.location.reload();
        });
    };
    const addPublisher = async () => {
        AxiosLib.post("/admin/addPublisher", dataPublisher).then((res) => {
            console.log(res.data);
            window.location.reload();
        });
    };

    const addCategory = async () => {
        AxiosLib.post("/admin/addCategory", dataCategory).then((res) => {
            console.log(res.data);
            window.location.reload();
        });
    };

    useEffect(() => {
        const getAuthor = async () => {
            const res = await AxiosLib.get("/admin/getwriter/author");
            setAuthor(res.data.result);
        };
        const getPublisher = async () => {
            const res = await AxiosLib.get("/admin/getwriter/publisher");
            setPublisher(res.data.result);
        };
        const getCategory = async () => {
            const res = await AxiosLib.get("/admin/getwriter/category");
            setCategory(res.data.result);
        };
        getAuthor();
        getPublisher();
        getCategory();
    }, []);

    return (
        <section>
            <Navbar darkTheme={true} />
            <div className="adminpage">
                <Sidebar />
                <div className="admin-content">
                    <h2>Manage Writer</h2>

                    <div className="add-writer-form-container">
                        <form onSubmit={addAuthor} className="add-writer-form">
                            <h3>Add Author</h3>
                            <div className="add-writer-form-input">
                                <label>Name: </label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChangeAuthor}
                                    placeholder="Author name"
                                />
                            </div>
                            <button className="add-writer-btn">Add</button>
                        </form>

                        <form onSubmit={addPublisher} className="add-writer-form">
                            <h3>Add Publisher</h3>
                            <div className="add-writer-form-input">
                                <label>Name: </label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChangePublisher}
                                    placeholder="Publisher name"
                                />
                            </div>
                            <button className="add-writer-btn">Add</button>
                        </form>

                        <form onSubmit={addCategory} className="add-writer-form">
                            <h3>Add Category</h3>
                            <div className="add-writer-form-input">
                                <label>Name : </label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChangeCategory}
                                    placeholder="Category name"
                                />
                            </div>
                            <button className="add-writer-btn">Add</button>
                        </form>
                    </div>

                    <div className="apc-container">
                        <div>
                            <h2>Author</h2>
                            <div className="apc-typecard">
                                <WriterCard data={Author} type={"author"} />
                            </div>
                        </div>
                        <div>
                            <h2>Publisher</h2>
                            <div className="apc-typecard">
                                <WriterCard data={Publisher} type={"publisher"} />
                            </div>
                        </div>
                        <div>
                            <h2>Category</h2>
                            <div className="apc-typecard">
                                <WriterCard data={Category} type={"category"} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ManageWriter;