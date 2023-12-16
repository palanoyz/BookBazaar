import React from "react";
import "./productlist.css";
import ProductListCard from "../../cards/product list card/ProductListCard";
import { BookData } from "../../../data/BookData";

const ProductList = () => {
    return (
        <div className="product-list-container">
            <div className="container">
                <h2>Recommended <span className="text-book">Books</span></h2>

                <div className="list-container">

                    {BookData.slice(2,3).map((book) => (
                        <ProductListCard key={book.id} bookData={book} />
                    ))}

                    {BookData.slice(14,17).map((book) => (
                        <ProductListCard key={book.id} bookData={book} />
                    ))}

                </div>
            </div>
        </div>
    )
}

export default ProductList;