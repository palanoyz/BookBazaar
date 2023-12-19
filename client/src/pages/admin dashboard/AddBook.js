import React, { useState, useEffect } from "react";
import "./admin.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import { AxiosLib } from "../../lib/axios";
import Swal from "sweetalert2";

const AddBook = () => {

    const [dataAuthor, setDataAuthor] = useState([]);
    const [dataPublisher, setDataPublisher] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataBook, setDataBook] = useState({
        title: "",
        author: "",
        publisher: "",
        category: "",
        price: 0,
        image: "",
        description: "",
    });

    const handleChange = (e) => {
        setDataBook({
            ...dataBook,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            title: dataBook.title,
            author: dataBook.author,
            publisher: dataBook.publisher,
            category: dataBook.category,
            price: dataBook.price,
            image: dataBook.image,
            description: dataBook.description,
        };

        AxiosLib
            .post("/admin/addBook", requestData)
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "The book has been added to the stock.",
                });
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const getAuthor = async () => {
            try {
                await AxiosLib.get("/admin/getwriter/author").then((res) => {
                    setDataAuthor(res.data.result);
                });
            } catch (error) {
                console.log(error);
            }
        };
        const getPublisher = async () => {
            try {
                await AxiosLib.get("/admin/getwriter/publisher").then((res) => {
                    setDataPublisher(res.data.result);
                });
            } catch (error) {
                console.log(error);
            }
        };
        const getCategory = async () => {
            try {
                await AxiosLib.get("/admin/getwriter/category").then((res) => {
                    setDataCategory(res.data.result);
                });
            } catch (error) {
                console.log(error);
            }
        };
        getAuthor();
        getPublisher();
        getCategory();
    }, []);


    const selectAuthor = dataAuthor.map((item) => {
        return (
            <option value={item._id} key={item._id}>
                {item.name}
            </option>
        );
    });

    const selectPublisher = dataPublisher.map((item) => {
        return (
            <option value={item._id} key={item._id}>
                {item.name}
            </option>
        );
    });

    const selectCategory = dataCategory.map((item) => {
        return (
            <option value={item._id} key={item._id}>
                {item.name}
            </option>
        );
    });


    return (
        <section>
            <Navbar darkTheme={true} />
            <div className="adminpage">
                <Sidebar />
                <div className="admin-content">
                    <h2>Post Books</h2>
                    <form className="addbook-form">
                        <div className="form-input-book">
                            <label>Title : </label>
                            <input
                                type="text"
                                name="title"
                                onChange={handleChange}
                                placeholder="title"
                            />
                        </div>

                        <div className="form-input-book">
                            <label>Author : </label>
                            <select name="author" onChange={handleChange}>
                                <option>--Select Author--</option>
                                {selectAuthor}
                            </select>
                        </div>

                        <div className="form-input-book">
                            <label>Publisher : </label>
                            <select name="publisher" onChange={handleChange}>
                                <option>--Select Publisher--</option>
                                {selectPublisher}
                            </select>
                        </div>

                        <div className="form-input-book">
                            <label>Category : </label>
                            <select name="category" onChange={handleChange}>
                                <option>--Select Category--</option>
                                {selectCategory}
                            </select>
                        </div>

                        <div className="form-input-book">
                            <label>Price : </label>
                            <input
                                type="number"
                                name="price"
                                onChange={handleChange}
                                placeholder="price"
                                min="0"
                            />
                        </div>

                        <div className="form-input-book">
                            <label>Image : </label>
                            <input
                                type="text"
                                name="image"
                                onChange={handleChange}
                                placeholder="image url"
                            />
                        </div>

                        <div className="form-input-book">
                            <label>Description : </label>
                            <input className="form-input-book-desc"
                                type="text"
                                name="description"
                                onChange={handleChange}
                                placeholder="description"
                            />
                        </div>

                        <button className="addbook-button" onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </section>
    )
}

export default AddBook;