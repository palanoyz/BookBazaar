import React, { useState, useEffect, useContext } from "react";
import "./bookdetails.css"
import Navbar from "../../components/layouts/navbar/Navbar";
import Footer from "../../components/layouts/footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { BookData } from "../../data/BookData";
import { DataContext, CartContext } from "../../App";
import Swal from "sweetalert2";
import { AxiosLib } from "../../lib/axios";

const BookDetails = () => {

    const { id } = useParams();
    const [data, setData] = useState({});

    const { userInfo } = useContext(DataContext);

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

    const addtocart = (bookID) => {
        try {
            AxiosLib.post(`/api/addToCart?userID=${userInfo.id}&bookID=${bookID}`);
        } catch (error) {
            console.log(error);
        }
    };

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
                            <p><b>Author :</b> {authorName}</p>
                            <p><b>Publisher :</b> {publisherName}</p>
                            <p><b>Category :</b> {categoryName}</p>
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