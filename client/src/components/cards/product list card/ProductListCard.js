import React, { useContext } from "react";
import "./productlistcard.css";
import { Link } from "react-router-dom";
import { AxiosLib } from "../../../lib/axios";
import { DataContext } from "../../../App";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const ProductListCard = ({ data }) => {

    const { userInfo } = useContext(DataContext);
    const token = userInfo?.loginState || false;
    const role = userInfo?.role || "";

    const addtocart = (bookID) => {
        try {
            if (role === 'admin') {
                Swal.fire({
                    icon: 'error',
                    title: 'You are admin...',
                })
            } else if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please login first!',
                })
            } else {
                AxiosLib.post(`/api/addToCart?userID=${userInfo.id}&bookID=${bookID}`)
                    .then(Swal.fire({
                        icon: 'success',
                        title: 'The book is added to cart!',
                    }))
            }
        } catch (error) {
            console.log(error);
        }
    }


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

                            <a onClick={(e) => {
                                e.stopPropagation();
                                addtocart(item._id);
                            }} className="addtocart-btn">
                                <FaCartPlus />
                            </a>

                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ProductListCard;