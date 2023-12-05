import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import AuthBgImg from "../../assets/auth-bg 2.jpg"
import Navbar from "../../components/layouts/navbar/Navbar";
import { AxiosLib } from '../../lib/axios'

const Login = () => {

    const navigate = useNavigate()

    const [Login, setLogin] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setLogin({ ...Login, [e.target.name]: e.target.value })
    }
    
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const result = await AxiosLib.post('/api/login', { email: Login.email, password: Login.password })
            if (result.status === 200) navigate('/')
        } catch (error) {
            alert('Email or Password is incorrect')
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

                            <form onSubmit={handleLogin}>
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

export default Login;