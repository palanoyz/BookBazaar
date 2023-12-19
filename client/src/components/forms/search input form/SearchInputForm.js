import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "./searchinputform.css";
import { AxiosLib } from "../../../lib/axios";

const SearchInputForm = ({ darkTheme }) => {

    // const navigate = useNavigate();
    const [searchField, setSearchField] = useState('');
    const [search, setSearch] = useState([])


    useEffect(() => {
        const fetchSearch = async () => {
            AxiosLib.get("/api/getallbooks").then((res) => {
                setSearch(res.data);
            });
        };
        fetchSearch();
    }, []);

    const handleSearch = (e) => {
        setSearchField(e.target.value);
    };

    function searchBooks(keyword) {
        if (!keyword) {
            return [];
        }
        const results = search.filter((book) => {
            const title = book.title.toLowerCase();
            return title.includes(keyword.toLowerCase());
        });
        return results;
    }


    // const redirectToSearch = () => {
    //     if (searchField === '') {}
    //     else {           
    //         navigate('/search', {state:searchField});
    //     }
    // }

    return (
        <div className={`search-input-form-container ${darkTheme ? 'dark-box-shadow' : 'light-box-shadow'}`}>
            <input
                type="text"
                className="search-input"
                placeholder="Search Books"
                value={searchField}
                onChange={handleSearch}
            />
            {/* <button onClick={redirectToSearch} className="search-button">Search</button> */}
            <button className="search-button">Search</button>
        </div>
    )
}

export default SearchInputForm;