import React, { useContext } from "react";
import "./productlistcard.css";
import { Link, useNavigate } from "react-router-dom";
import { AxiosLib } from "../../../lib/axios";
import { DataContext } from "../../../App";
import { FaCartPlus } from "react-icons/fa";

const ProductListCard = ({ data }) => {
    const navigate = useNavigate();

    const { userInfo } = useContext(DataContext);

    const addtocart = (bookID) => {
        try {
            AxiosLib.post(`/api/addToCart?userID=${userInfo.id}&bookID=${bookID}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {data?.map((item) => {
                return (
                    <div key={item._id} className="product-list-card">
                        <div className="product-list-img-container">
                            <img src={item.image} alt="product-list-image" className="product-list-image" />
                        </div>
                        <div className="product-list-details-container">
                            <h3>{item.title}</h3>
                            <p className="author">{item.authorInfo?.map((item) => item.name)}</p>
                            <p className="price">{item.price} THB</p>
                        </div>
                        <div className="card-btn-container">
                            <Link to={`/bookdetails/${item._id}`} className="product-list-button">See Details</Link>
                            <a onClick={addtocart} className="addtocart-btn"><FaCartPlus /></a>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ProductListCard;