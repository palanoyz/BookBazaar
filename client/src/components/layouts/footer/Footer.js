import React from "react";
import "./footer.css";

const Footer = () => {
    return (
        <section className="footer-container">
            <div className="container">
                <h2 className="contact-head">Contact</h2>
            </div>

            <div className="contact">
                <a href="#"><img src="https://pngimg.com/d/facebook_logos_PNG19750.png" width="20px" /> Facebook</a>
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1024px-Instagram-Icon.png" width="20px" /> Instagram</a>
                <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/281/281769.png" width="20px" /> Email</a>
            </div>
        </section>
    )
}

export default Footer;