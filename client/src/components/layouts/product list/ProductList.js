import React, { useState, useEffect } from "react";
import "./productlist.css";
import ProductListCard from "../../cards/product list card/ProductListCard";
import { AxiosLib } from "../../../lib/axios";

const ProductList = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await AxiosLib.get("/api/getallbooks");
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="product-list-container">
            <div className="container">
                <h1>Recommended <span className="text-book">Books</span></h1>
                <div className="list-container">

                    <ProductListCard data={data?.slice(1, 2)} />
                    <ProductListCard data={data?.slice(10, 14)} />

                </div>
            </div>

            <div className="container">
                <h1><span className="text-book">New Release</span> Books</h1>
                <div className="list-container">

                    <ProductListCard data={data?.slice(22, 27)} />

                </div>
            </div>
        </div>
    )
}

export default ProductList;