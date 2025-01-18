import React, { useState, useEffect, useContext } from "react";
import "./bookdetails.css"
import Navbar from "../../components/layouts/navbar/Navbar";
import Footer from "../../components/layouts/footer/Footer";
import { useParams } from "react-router-dom";
import { DataContext } from "../../App";
import Swal from "sweetalert2";
import { AxiosLib } from "../../lib/axios";

const BookDetails = () => {

    const { id } = useParams();
    const [data, setData] = useState({});

    const { userInfo } = useContext(DataContext);
    const token = userInfo?.loginState || false;
    const role = userInfo?.role || "";

    useEffect(() => {
        try {
            const fetchData = async () => {
                AxiosLib.get(`/api/getbook/${id}`).then((res) => {
                    setData(res.data);
                });
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [data, id]);

    const authorName = data.authorInfo?.map((item) => item.name);
    const publisherName = data.publisherInfo?.map((item) => item.name);
    const categoryName = data.categoryInfo?.map((item) => item.name);
    

    const addtocart = () => {
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
                AxiosLib.post(`/api/addToCart?userID=${userInfo.id}&bookID=${id}`)
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
        <section>
            <Navbar darkTheme={true} />

            <section className="detail-section-container">
                <div className="container">
                    <div className="flex-container">
                        <div className="book-img-container">
                            <img src={data.image} alt="book" />
                        </div>

                        <div className="book-detail-container">
                            <h2>{data.title}</h2>
                            <p><b className="detail-text">Author :</b> {authorName}</p>
                            <p><b className="detail-text">Publisher :</b> {publisherName}</p>
                            <p><b className="detail-text">Category :</b> {categoryName}</p>
                            <p className="book-description">{data.description}</p>
                            <h3>{data.price} THB</h3>
                            <a onClick={addtocart} className="button-primary">Add to Cart</a>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </section>
    )
}

export default BookDetails;