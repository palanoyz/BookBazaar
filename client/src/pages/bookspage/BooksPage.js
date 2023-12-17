import React, { useEffect, useContext, useState } from "react";
import "./bookspage.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import SearchInputForm from "../../components/forms/search input form/SearchInputForm";
import ProductListAll from "../../components/layouts/product list all/ProductListAll";
import Footer from "../../components/layouts/footer/Footer";
import { AxiosLib } from "../../lib/axios";
import { DataContext } from "../../App";
import { useParams } from "react-router-dom";

const BooksPage = () => {
    return (
        <section>
            <Navbar darkTheme={true} />

            <div className="search-container">
                <h2>Find the <span className="text-book">Books</span> you want</h2>
                {/* <SearchInputForm darkTheme={false} /> */}
            </div>

            <ProductListAll />
            <Footer />
        </section>
    )
}

export default BooksPage;