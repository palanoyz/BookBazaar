import React from "react";
import "./footer.css";
import fb from "../../../assets/Facebook_Logo.png";
import gmail from "../../../assets/gmail-icon-free.png";
import ig from "../../../assets/Instagram_icon.png";
import twt from "../../../assets/twitter-x.png";

const Footer = () => {
    return (
        <div class="footer-basic">
            <footer>
                <div class="social">
                    <a>
                        <img src={ig} alt="Instagram" />
                        <i class="icon ion-social-instagram"></i>
                    </a>
                    <a>
                        <img src={gmail} alt="Gmail" />
                        <i class="icon ion-social-Gmail"></i>
                    </a>
                    <a>
                        <img src={twt} alt="Twitter" />
                        <i class="icon ion-social-twitter"></i>
                    </a>
                    <a>
                        <img src={fb} alt="Facebook" />
                        <i class="icon ion-social-facebook"></i>
                    </a>
                </div>
                <ul class="list-inline">
                    <li class="list-inline-item"><a href="#">Home</a></li>
                    <li class="list-inline-item"><a>Services</a></li>
                    <li class="list-inline-item"><a>About</a></li>
                    <li class="list-inline-item"><a>Terms</a></li>
                    <li class="list-inline-item"><a>Privacy Policy</a></li>
                </ul>
                <p class="copyright">Copyright © 2023 BookBazaar.</p>
            </footer>
        </div>
    )
}

export default Footer;