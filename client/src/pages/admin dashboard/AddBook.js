import React, { useState, useEffect } from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import { AxiosLib } from "../../lib/axios";
import Swal from "sweetalert2";

const AddBook = () => {

    const [dataAuthor, setDataAuthor] = useState([]);
    const [dataPublisher, setDataPublisher] = useState([]);
    const [dataBook, setDataBook] = useState({
        title: "",
        price: 0,
        author: "",
        publisher: "",
        description: "",
        image: "",
    });

    const handleChange = (e) => {
        setDataBook({
            ...dataBook,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", dataBook.title);
        formData.append("price", dataBook.price);
        formData.append("author", dataBook.author);
        formData.append("publisher", dataBook.publisher);
        formData.append("description", dataBook.description);
        formData.append("image", dataBook.image);

        AxiosLib
            .post("/api/postbook", formData)
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Your book has been posted",
                    footer: '<a href="#">Why do I have this issue?</a>',
                });
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const getPublisher = async () => {
            try {
                await AxiosLib.get("/api/getWriterBy/Publisher").then((res) => {
                    setDataPublisher(res.data.result);
                });
            } catch (error) {
                console.log(error);
            }
        };
        const getAuthor = async () => {
            try {
                await AxiosLib.get("/api/getWriterBy/Author").then((res) => {
                    setDataAuthor(res.data.result);
                });
            } catch (error) {
                console.log(error);
            }
        };
        getAuthor();
        getPublisher();
    }, []);

    const selectPublisher = dataPublisher.map((item) => {
        return (
            <option value={item._id} key={item._id}>
                {item.name}
            </option>
        );
    });

    const selectAuthor = dataAuthor.map((item) => {
        return (
            <option value={item._id} key={item._id}>
                {item.name}
            </option>
        );
    });


    return (
        <section>
            <div className="adminpage">
                <Navbar darkTheme={true} />
                <Sidebar />
                <div className="admin-content">
                    <h2>Add books to stock</h2>
                    <form className="addbook-form">
                        <div className="form-input-book">
                            <label>Title: </label>
                            <input
                                type="text"
                                name="nameBook"
                                onChange={handleChange}
                                placeholder="title"
                            />
                        </div>

                        <div className="form-input-book">
                            <label>Price: </label>
                            <input
                                type="number"
                                name="price"
                                onChange={handleChange}
                                placeholder="price"
                            />
                        </div>

                        <div className="form-input-book">
                            <label>Author: </label>
                            <select name="author" onChange={handleChange}>
                                <option >--Select Author--</option>
                                {selectAuthor}
                            </select>
                        </div>

                        <div className="form-input-book">
                            <label>Publisher: </label>
                            <select name="publisher" onChange={handleChange}>
                                <option >--Select Publisher--</option>
                                {selectPublisher}
                            </select>
                        </div>
            
                        <div className="form-input-book">
                            <label>Description: </label>
                            <input
                                type="text"
                                name="description"
                                onChange={handleChange}
                                placeholder="description"
                            />
                        </div>

                        <div className="form-input-book">
                            <label>Image: </label>
                            <input
                                type="text"
                                name="image"
                                onChange={handleChange}
                                placeholder="image url"
                            />
                        </div>

                        <button className="addbook-button" onClick={handleSubmit}>
                            submit
                        </button>
                    </form>
                </div>
            </div>

        </section>
    )
}

export default AddBook;