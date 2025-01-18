import React from "react";
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
                <h3 className="cart-item-price">{bookData.price} THB</h3>

                <Link to={`/bookdetails/${bookData.id}`} className="detail-button">See Details</Link>
            </div>
        </section>
    )
}

export default SearchResultCard;