import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import { ReactComponent as Cart } from "../../../assets/cart icon.svg";

const Navbar = ({ darkTheme, darkText }) => {

    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Make an API call to the backend to check authentication status
        const checkAuthentication = async () => {
            try {
                const response = await fetch("/api/check-auth", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // Include any additional headers or tokens if needed
                    },
                    credentials: "include", // Include credentials (cookies) for cross-origin requests
                });
        
                if (response.ok) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
            }
        };
    
        checkAuthentication();
    }, [user]);
    
    const handleLogout = async () => {
        
        setIsLoggedIn(false);
        navigate("/");
    };


    const showLoginAndSignup = (
        <nav className="nav-links-container">
            <Link to="/" className={`${darkText? 'nav-links-dark' : 'nav-links'}`}>Home</Link>
            <Link to="/books" className={`${darkText? 'nav-links-dark' : 'nav-links'}`}>Books</Link>
            <Link to="/login" className={`${darkText? 'nav-links-dark' : 'nav-links'}`}>Login</Link>
            <Link to="/signup" className={`${darkText? 'nav-links-dark' : 'nav-links'}`}>Sign up</Link>
        </nav>
    )

    const showLogoutAndCart = (
        <nav className="nav-links-container">
            <Link to="/" className={`${darkText? 'nav-links-dark' : 'nav-links'}`}>Home</Link>
            <Link to="/books" className={`${darkText? 'nav-links-dark' : 'nav-links'}`}>Books</Link>
            <a onClick={handleLogout} className={`${darkText? 'nav-links-dark' : 'nav-links'}`}>Logout</a>
            <Link to="/cart" className="cart-link"><Cart /></Link>
        </nav>
    )


    return (
        <section className={ `navbar-container ${darkTheme? 'background-dark relative' : 'background-transparent'}` }>
            <div className="container flex justify-between align-center">
                <Link to="/" className="logo">Book<span className="text-primary">Bazaar</span></Link>

                { user? showLogoutAndCart : showLoginAndSignup }

            </div>
        </section>
    )
}

export default Navbar;