import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from 'react-router-dom';
import { AxiosLib } from './lib/axios'
import ScrollToTop from "./ScrollToTop";

import HomePage from "./pages/homepage/HomePage";
import BooksPage from "./pages/bookspage/BooksPage";
import BooksDetailsPage from "./pages/bookdetailspage/BookDetails";
import Login from "./pages/loginpage/Login";
import Signup from "./pages/signup page/Signup";
import CartPage from "./pages/cartpage/CartPage";
// import SearchPage from "./pages/searchpage/SearchPage";
import AdminPage from "./pages/admin dashboard/AdminPage";
import ManageBook from "./pages/admin dashboard/ManageBook";
import ManageUser from "./pages/admin dashboard/ManageUser";
import AccountPage from "./pages/accountpage/AccountPage";
import AddBook from "./pages/admin dashboard/AddBook";
import ManageWriter from "./pages/admin dashboard/ManageWriter";
import ChangePassword from "./pages/accountpage/ChangePassword";
import MyBooks from "./pages/accountpage/MyBooks";


export const DataContext = createContext();
export const CartContext = createContext();

const App = () => {

    const [userInfo, setUserInfo] = useState({
        id: "",
        username: "",
        email: "",
        loginState: false,
        role: "",
    });
    
    useEffect(() => {
        AxiosLib
        .get("/api/checkToken")
        .then((res) => {
            setUserInfo({
                id: res.data.token.id,
                username: res.data.token.username,
                email: res.data.token.email,
                loginState: true,
                role: res.data.token.role,
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }, [userInfo]);


    return(
        <ScrollToTop>
        <DataContext.Provider value={{ userInfo, setUserInfo }}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/cart" element={<CartPage />} />
                {/* <Route path="/search" element={<SearchPage />} /> */}
                <Route path="/bookdetails/:id" element={<BooksDetailsPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account/profile" element={<AccountPage />} />
                <Route path="/account/changepassword" element={<ChangePassword />} />
                <Route path="/account/mybooks" element={<MyBooks />} />

                <Route path="/admin/dashboard" element={<AdminPage />} />
                <Route path="/admin/addbook" element={<AddBook />} />
                <Route path="/admin/managebook" element={<ManageBook />} />
                <Route path="/admin/manageuser" element={<ManageUser />} />
                <Route path="/admin/managewriter" element={<ManageWriter />} />

                <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>
        </DataContext.Provider>
        </ScrollToTop>
    )
}

export default App;