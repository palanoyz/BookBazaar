import React, { useState, useEffect, useContext } from "react";
import "./detailsection.css";
import { useParams, useNavigate } from "react-router-dom";
import { BookData } from "../../../data/BookData";
import { DataContext, CartContext } from "../../../App";
import Swal from "sweetalert2";

const DetailSection = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [bookData, setBookData] = useState({});

    const user = useContext(DataContext);
    const {cartItems, setCartItems} = useContext(CartContext);

    useEffect(() => {
        let newData = BookData.filter((book) => book.id === parseInt(id));
        setBookData(newData[0]);
    },[])

    const handleAddToCart = () => {
        if(user) {
            setCartItems([...cartItems, bookData]);
            Swal.fire({
                icon: "success",
                title: "The book is added to the cart.",
            });
        } else {
            navigate('/login');
            Swal.fire({
                icon: "error",
                title: "Please Login or Sign up first.",
            });
        }
    }

    return (
        <section className="detail-section-container">
            <div className="container">
                <div className="flex-container">
                    <div className="book-img-container">
                        <img src={bookData.book_img} alt="book" />
                    </div>

                    <div className="book-detail-container">
                        <h2>{bookData.book_name}</h2>
                        <p><b>Author :</b> {bookData.author}</p>
                        <p><b>Publisher :</b> {bookData.author}</p>
                        <p className="book-description">{bookData.book_description}</p>
                        <h3>{bookData.price} THB</h3>
                        <a onClick={handleAddToCart} className="button-primary">Add to Cart</a>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default DetailSection;