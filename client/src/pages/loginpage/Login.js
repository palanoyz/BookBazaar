import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import AuthBgImg from "../../assets/auth-bg 2.jpg"
import Navbar from "../../components/layouts/navbar/Navbar";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate()

    const [Login, setLogin] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    }
    
    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const loginDataToSend = {
                email: Login.email,
                password: Login.password,
            };

            const response = await axios.post("http://localhost:5000/login", loginDataToSend,
            {
                withCredentials: true,
                headers: {
                "Content-Type": "application/json",
                },
            });

            console.log(response.data);
            // navigate(`/${response.data.username}`);
            navigate(`/`);
        } catch(error) {
            console.error("Login failed:", error);
        }
    };


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
                            <h2>Login</h2>

                            <form onSubmit={handleLogin}>
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

export default Login;