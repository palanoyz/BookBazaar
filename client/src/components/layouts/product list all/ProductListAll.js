import React, { useEffect, useState, useContext } from "react";
import "./productlistall.css";
import ProductListCard from "../../cards/product list card/ProductListCard";
import { BookData } from "../../../data/BookData";
import { DataContext } from "../../../App";
import { useParams } from "react-router-dom";
import { AxiosLib } from "../../../lib/axios";

const ProductListAll = () => {



    return (
        <section className="product-list-all-container">
            <div className="container">
                <div className="grid-container">

                    {BookData.map((book) => {
                        return (
                            <div className="grid-item">
                                <ProductListCard key={book.id} bookData={book} />
                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}

export default ProductListAll;