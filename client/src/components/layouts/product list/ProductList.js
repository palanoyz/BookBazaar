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

                    <ProductListCard data={data?.slice(2, 3)} />
                    <ProductListCard data={data?.slice(14, 17)} />

                </div>
            </div>
        </div>
    )
}

export default ProductList;