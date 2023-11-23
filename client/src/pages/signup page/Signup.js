import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import AuthBgImg from "../../assets/auth-bg 2.jpg"
import Navbar from "../../components/layouts/navbar/Navbar";
import axios from "axios";

const Signup = () => {

    const navigate = useNavigate()

    const [SignUp, setSignUp] = useState({
        username: ''
        , email: ''
        , password: ''
    })
    
    const handleChange = (e) => {
        setSignUp({ ...SignUp, [e.target.name]: e.target.value })
    }

    const handelSignUp = (e) => {
        e.preventDefault()
        const createNewUser = {
            username: SignUp.username
            , email: SignUp.email
            , password: SignUp.password
        }
        axios.post("http://localhost:3000/signup", createNewUser)

        console.log(SignUp)
    }


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

                            <form onSubmit={handelSignUp}>              
                                <div className="form-group">
                                    <label>Username</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        placeholder="Enter your username"
                                        onChange={handleChange}
                                    />
                                </div>
                              
                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        className="form-input" 
                                        placeholder="Enter your email"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input 
                                        type="password" 
                                        className="form-input" 
                                        placeholder="Enter your password" 
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <input 
                                        type="submit" 
                                        className="button-primary" 
                                        value="Submit" 
                                    />
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Signup;