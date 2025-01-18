import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/layouts/navbar/Navbar";
import Footer from "../../components/layouts/footer/Footer";
import "./searchpage.css";
import { BookData } from "../../data/BookData";
import SearchResultCard from "../../components/cards/search result card/SearchResultCard";

const SearchPage = () => {
    const location = useLocation();

    useEffect(() => {
        let searchValue = [];

        searchValue = BookData.filter((data) => data.book_name.toLowerCase().includes(location.state.toLowerCase()));

        setSearchResult(searchValue);
    }, [])

    return (
        <section>
            <Navbar darkTheme={true} />

            <div className="search-result-container">
                <div className="container">

                    <h2>Search Result</h2>

                    {/* {searchResult.map((result) => (
                        <SearchResultCard key={result.id} bookData={result} />
                    ))} */}

                </div>
            </div>

            <Footer />
        </section>
    )
}

export default SearchPage;