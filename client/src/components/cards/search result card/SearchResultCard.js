import React, { useContext, useState } from "react";
import "./searchresultcard.css";
import { Link } from "react-router-dom";

const SearchResultCard = ({ bookData }) => {
    return (
        <section className="cart-item">
            <div className="cart-item-img-container">
                <img src={bookData.book_img} alt="cart-item-img" className="cart-item-img" />
            </div>
            <div className="cart-item-content-container">
                <h2>{bookData.book_name}</h2>
                <p>{bookData.author}</p>
                <h3 className="cart-item-price">฿{bookData.price}</h3>

                <Link to={`/book-details/${bookData.id}`} className="detail-button">Product Details</Link>
            </div>
        </section>
    )
}

export default SearchResultCard;