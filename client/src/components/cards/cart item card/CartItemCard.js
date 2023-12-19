import React from "react";
import "./cartitemcard.css";
import { AxiosLib } from "../../../lib/axios";

const CartItemCard = ({ dataCart }) => {

    const handleRemove = async (CartID) => {
        await AxiosLib.delete(`/api/deleteBookinCart/?id=${CartID}`);
        window.location.reload();
    }

    return (

        dataCart.map((item) => {
            return (
                <>
                <section key={item.bookID} className="cart-item">
                    <div className="cart-item-img-container">
                        <img src={item.bookImage} alt="cart-item-img" className="cart-item-img" />
                    </div>
                    <div className="cart-item-content-container">
                        <h2>{item.bookName}</h2>
                        <p>{item.authorName}</p>
                        <h3 className="cart-item-price">{item.bookPrice} THB</h3>

                        <button onClick={() => handleRemove(item._id)} className="delete-button">Remove</button>
                    </div>
                </section>
                </>
            )
        })
    )
}

export default CartItemCard;