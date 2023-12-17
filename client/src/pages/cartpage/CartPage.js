import React, { useContext } from "react";
import "./cartpage.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Footer from "../../components/layouts/footer/Footer";
import { CartContext } from "../../App";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../../components/cards/cart item card/CartItemCard";

const CartPage = () => {
    const { cartItems, totalAmount } = useContext(CartContext);
    const navigate = useNavigate();
    return (
        <section>
            <Navbar darkTheme={true} />

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

                            <h2>Total amount : {totalAmount} THB</h2>

                            <button className="button-primary">Check out</button>
                        </React.Fragment>
                    )}

                </div>
            </section>

            <Footer />
        </section>
    )
}

export default CartPage;