import React, { useContext, useState } from "react";
import "./cartitemcard.css";
import { CartContext } from "../../../App";

const CartItemCard = ({ bookData }) => {
    
    const { cartItems, setCartItems } = useContext(CartContext);
    // const [quantity, setQuantity] = useState(1);

    // const handleIncrease = () => {
    //     setQuantity(quantity + 1)
    // }

    // const handleDecrease = () => {
    //     if (quantity > 0) {
    //         setQuantity(quantity - 1);
    //     } else if (quantity === 0) {
    //         setCartItems(cartItems.filter((item) => item.id !== bookData.id));
    //     }
    // }

    const handleRemove = () => {
        setCartItems(cartItems.filter((item) => item.id !== bookData.id));
    }

    return (
        <section className="cart-item">
            <div className="cart-item-img-container">
                <img src={bookData.book_img} alt="cart-item-img" className="cart-item-img" />
            </div>
            <div className="cart-item-content-container">
                <h2>{bookData.book_name}</h2>
                <p>{bookData.author}</p>
                <h3 className="cart-item-price">{bookData.price} THB</h3>

                {/* <div className="quantity-controls">
                    <button onClick={handleDecrease} className="quantity-button">-</button>
                    <label className="quantity-label">{quantity}</label>
                    <button onClick={handleIncrease} className="quantity-button">+</button>
                </div> */}

                <button onClick={handleRemove} className="delete-button">Remove from cart</button>
            </div>
        </section>
    )
}

export default CartItemCard;