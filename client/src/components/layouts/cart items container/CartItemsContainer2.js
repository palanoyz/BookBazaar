import React, { useContext } from "react";
import "./cartitemscontainer2.css";
import CartItemCard from "../../cards/cart item card/CartItemCard";
import { CartContext } from "../../../App";

const CartItemsContainer = () => {
    const { cartItems, totalAmount } = useContext(CartContext);

    return (
        <section className="cart-items-container">
            <div className="cart-checkout-container">

                {totalAmount === 0 ? (
                    <h2 className="empty-cart">Your cart is empty.</h2>
                ) : (
                    <React.Fragment>
                        <div className="cart-container">
                            <h2>Cart</h2>

                            {cartItems.map((item) => (
                                <CartItemCard key={item.id} bookData={item} />
                            ))}

                            <h2>Total amount : ฿{totalAmount}</h2>
                            {/* <button className="button-primary">Check out</button> */}
                        </div>       

                        <div className="checkout">
                            <h2>Checkout</h2>
                            <form>
                                <input type="text" name="name" placeholder="Name" />
                                <input type="email" name="email" placeholder="Email" />
                                <input type="tel" name="phone" placeholder="Phone Number" />
                                <input type="text" name="address" placeholder="Address" />
                                <input type="text" name="city" placeholder="City" />
                                <input type="number" name="zip_code" placeholder="Zip Code" />
                                <select name="payment_type">
                                    <option value="" disabled>Select payment method</option>
                                    <option value="qr_code">QR Code</option>
                                    <option value="cash_on_delivery">Cash on Delivery</option>
                                    <option value="credit_card">Credit Card</option>
                                </select>
                                <button className="button-primary">Order Now</button>
                            </form>
                        </div>
                    </React.Fragment>
                )}
               
            </div>
        </section>
    )
}

export default CartItemsContainer;