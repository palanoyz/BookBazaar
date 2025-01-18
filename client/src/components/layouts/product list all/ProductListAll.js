import React, { useEffect, useState } from "react";
import "./productlistall.css";
import ProductListCard from "../../cards/product list card/ProductListCard";
import { AxiosLib } from "../../../lib/axios";

const ProductListAll = () => {

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
    <section className="product-list-all-container">
      <div className="container">
        <div className="grid-container">

          <ProductListCard data={data} />

        </div>
      </div>
    </section>
  )
}

export default ProductListAll;