import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import { ReactComponent as Cart } from "../../../assets/cart icon.svg";
import { AxiosLib } from '../../../lib/axios'

const Navbar = ({ darkTheme, darkText }) => {

    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    const handleLogout = async () => {
        try {
            const result = await AxiosLib.post('/api/user/logout')
            if (result.status === 200) return showLoginAndSignup
        } catch (error) {
            console.log(error)
        }
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

                { isLoggedIn? showLogoutAndCart : showLoginAndSignup }

            </div>
        </section>
    )
}

export default Navbar;