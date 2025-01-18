import React from "react";
import "./admincardbook.css";
import { AxiosLib } from "../../../lib/axios";

const AdminCardBook = ({ databook }) => {

    const deleteBook = (bookID) => {
        AxiosLib
            .delete(`/admin/deletebook/${bookID}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };


    return (
        <>
            {databook?.map((item) => {
                return (
                    <div key={item._id} className="aproduct-list-card">
                        <div className="aproduct-list-img-container">
                            <img src={item.image} alt="product-list-image" className="aproduct-list-image" />
                        </div>
                        <div className="aproduct-list-details-container">
                            <h3>{item.title}</h3>
                            <p className="author">{item.authorInfo?.map((item) => item.name)}</p>
                            <p className="price">{item.price} THB</p>
                        </div>
                        <div className="acard-btn-container">
                            <a onClick={() => deleteBook(item._id)} className="aproduct-list-button">Delete</a>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default AdminCardBook;