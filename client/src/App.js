import React, { useState, useEffect, createContext } from "react";
import {Routes, Route } from 'react-router-dom';

import HomePage from "./pages/homepage/HomePage";
import BooksPage from "./pages/bookspage/BooksPage";
import BooksDetailsPage from "./pages/bookdetailspage/BookDetails";
import Login from "./pages/loginpage/Login";
import Signup from "./pages/signup page/Signup";
import CartPage from "./pages/cartpage/CartPage";
import SearchPage from "./pages/searchpage/SearchPage";

export const UserContext = createContext({});
export const CartContext = createContext({});

const App = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        let total = 0;
        cartItems.forEach((item) => {
            total = total + item.price;
        })

        setTotalAmount(total);
    },[cartItems])

    return(
        <UserContext.Provider value={authenticatedUser}>
            <CartContext.Provider value={{cartItems, totalAmount, setCartItems}}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/book-details/:id" element={<BooksDetailsPage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </CartContext.Provider>
        </UserContext.Provider>
    )
}

export default App;