import React from "react";
import "./showcase.css"
import Navbar from "../navbar/Navbar";
import SearchInputForm from "../../forms/search input form/SearchInputForm";

const Showcase = () => {
    return (
        <section className="showcase-container">
            <Navbar darkTheme={false} />

            <div className="overlay"></div>
            <div className="showcase-content">
                <h1>Welcome to the <span className="text-primary">World of MANGA</span></h1>
                
                <SearchInputForm darkTheme={true} />
            </div>
        </section>
    )
}

export default Showcase;