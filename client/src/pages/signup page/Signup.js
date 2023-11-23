import React from "react";
import "./signup.css";
import AuthBgImg from "../../assets/auth-bg 2.jpg"
import Navbar from "../../components/layouts/navbar/Navbar";
import AuthForm from "../../components/forms/auth form/AuthForm";

const Signup = () => {
    return (
        <React.Fragment>
            <Navbar darkText={true} />
            <section className="signup-container">
                <div className="signup-img-container">
                    <img src={AuthBgImg} alt="authentication-bg" />
                </div>
                <div className="signup-content-container">
                    <div className="container">
                        <div className="content-wrapper">
                            <h2>Sign Up</h2>
                            <p>Create a new account</p>

                            <AuthForm buttonName="Sign Up" />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Signup;