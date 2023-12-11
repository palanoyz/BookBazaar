import React, { useContext } from "react";
import "./cartitemscontainer.css";
import CartItemCard from "../../cards/cart item card/CartItemCard";
import { CartContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const CartItemsContainer = () => {
    const { cartItems, totalAmount } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <section className="cart-items-container">
            <div className="container">

                {totalAmount === 0 ? (
                    <h2>Your cart is empty.</h2>
                ) : (
                    <React.Fragment>                      
                        <h2>Cart</h2>

                        {cartItems.map((item) => (
                            <CartItemCard key={item.id} bookData={item} />
                        ))}

                        <h2>Total amount : ฿{totalAmount}</h2>

                        <button className="button-primary">Check out</button>
                    </React.Fragment>
                )}
               
            </div>
        </section>
    )
}

export default CartItemsContainer;