import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import AuthBgImg from "../../assets/auth-bg 2.jpg"
import Navbar from "../../components/layouts/navbar/Navbar";
import { AxiosLib } from '../../lib/axios'

const Signup = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value, });
    };

    const handelSignUp = async (e) => {
        e.preventDefault()
        try {
            const res = await AxiosLib.post("/api/signup", user)
            console.log("success", res);
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
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
                                        name="username"
                                        type="text" 
                                        className="form-input" 
                                        placeholder="Enter your username"
                                        onChange={handleChange}
                                    />
                                </div>
                              
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        name="email"
                                        type="email" 
                                        className="form-input" 
                                        placeholder="Enter your email"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        name="password"
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