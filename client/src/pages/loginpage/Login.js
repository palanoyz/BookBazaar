import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import AuthBgImg from "../../assets/auth-bg 2.jpg"
import Navbar from "../../components/layouts/navbar/Navbar";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate()

    const [Login, setLogin] = useState(
        {
        email: ''
        , password: ''
        })

    const handleChange = (e) => {
        setLogin({ ...Login, [e.target.name]: e.target.value })
    }

    const handelLogin = async (e) => {
        try {
            e.preventDefault()
            const LoginData = {
                email: Login.email
                , password: Login.password
            }
            await axios.post('http://localhost:3000/login', LoginData, {
                withCredentials: true,
                headers: {
                'Content-Type': 'application/json'
                },
            }).then(res => {
                console.log(res.data);
                navigate(`/Homepage/${res.data.username}`);
            }).catch(err => {
                console.log(err);
            })
        }
        catch (err) {
            console.log(err);
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
                            <h2>Login</h2>

                            <form onSubmit={handelLogin}>
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