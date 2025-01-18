import React, { useContext, useState, useEffect } from "react";
import "./cartpage.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import Footer from "../../components/layouts/footer/Footer";
import CartItemCard from "../../components/cards/cart item card/CartItemCard";
import { AxiosLib } from "../../lib/axios";
import { DataContext } from "../../App";
import Swal from "sweetalert2";

const CartPage = () => {
    const { userInfo } = useContext(DataContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await AxiosLib.get(
                `/api/getBookInCart?userID=${userInfo.id}`
            );
            setData(res.data.matching);
        };
        fetchData();
    }, [userInfo.id])

    const renderData = data.map((item) => item);

    const calculateTotalPrice = () => {
        let total = 0;
        data.forEach((item) => {
            total += parseInt(item.bookPrice);
        });
        return total;
    }

    let bookID = [];

    data.forEach((item) => {
        bookID.push(item.bookID);
    })

    const handleDeleteCheckout = async (userID) => {
        try {
            await AxiosLib.delete(`/api/deleteBookAfterCheckout?id=${userID}`);
        } catch (error) {
            console.log(error);
        }
    }

    const checkout = async () => {
        const data = {
            userID: userInfo.id,
            bookID: bookID,
            totalAmount: calculateTotalPrice(),
        };
        if (data.totalAmount === 0) {
            Swal.fire({
                icon: 'error',
                title: 'No products in the cart',
                confirmButtonText: 'OK',
            })
        } else {
            await AxiosLib.post("/api/checkout", data).then(() => {
                handleDeleteCheckout(userInfo.id).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thank you for your order!',
                        text: 'Enjoy reading :)',
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed || result.isDismissed) {
                            window.location.reload();
                        }
                    });
                });
            });
        }
    }


    return (
        <section>
            <Navbar darkTheme={true} />

            <section className="cart-items-container">
                <div className="container">

                    <CartItemCard dataCart={renderData} />
                    <h3>{data.length} items in cart</h3>
                    <h3>Total: {calculateTotalPrice()} THB</h3>
                    <button onClick={checkout} className="button-primary">Check out</button>

                </div>
            </section>

            <Footer />
        </section>
    )
}

export default CartPage;