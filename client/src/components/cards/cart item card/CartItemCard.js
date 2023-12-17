import React, { useContext, useState } from "react";
import "./cartitemcard.css";
import { CartContext } from "../../../App";
import { AxiosLib } from "../../../lib/axios";

const CartItemCard = ({ dataCart }) => {

    const { cartItems, setCartItems } = useContext(CartContext);

    const handleRemove = async (CartID) => {
        await AxiosLib.delete(`/api/deleteBookinCart/?id=${CartID}`);
        window.location.reload();
    }

    return (
        // <section className="cart-item">
        //     <div className="cart-item-img-container">
        //         <img src="" alt="cart-item-img" className="cart-item-img" />
        //     </div>
        //     <div className="cart-item-content-container">
        //         <h2>titlt</h2>
        //         <p>author</p>
        //         <h3 className="cart-item-price">0 THB</h3>

        //         <button onClick={handleRemove} className="delete-button">Remove from cart</button>
        //     </div>
        // </section>

        dataCart.map((item) => {
            return (
                <div
                    key={item.bookID}
                    className="flex border-2 gap-4 border-black h-[242px] py-2 px-8 w-[952px] font-semibold"
                >
                    <div className="h-full w-[140px]">
                        <img src={item.bookImage} alt="" className="h-full w-full" />
                    </div>
                    <div className="flex flex-col my-2 gap-3 h-full w-full ">
                        <h3 className="line-clamp-[2] text-xl ">{item.bookName}</h3>
                        <p className="text-lg">
                            Publisher <span className="text-primary">{item.publisherName}</span>
                        </p>
                        <p className="text-xl">{item.bookPrice} THB</p>
                        <div className="text-end mt-5">
                            <button className="h-full text-primary" onClick={() => handleRemove(item._id)}>Remove</button>
                        </div>
                    </div>
                </div>
            );
        })
    )
}

export default CartItemCard;