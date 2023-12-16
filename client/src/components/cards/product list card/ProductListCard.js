import React, { useEffect, useContext, useState } from "react";
import "./productlistcard.css";
import { Link, useParams } from "react-router-dom";
import { AxiosLib } from "../../../lib/axios";
import { DataContext } from "../../../App";

const ProductListCard = ({ bookData }) => {



    return (
        <div className="product-list-card">
            <div className="product-list-img-container">
                <img src={bookData.book_img} alt="product-list-image" className="product-list-image" />
            </div>
            <div className="product-list-details-container">
                <h3>{bookData.book_name}</h3>
                <p className="author">{bookData.author}</p>
                <p className="price">{bookData.price} THB</p>
            </div>
            <div className="card-btn-container">
                <Link to={`/bookdetails/${bookData.id}`} className="product-list-button">See Details</Link>
            </div>
        </div>
    )
}

export default ProductListCard;