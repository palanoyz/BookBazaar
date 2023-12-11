import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import AuthBgImg from "../../assets/auth-bg 2.jpg"
import Navbar from "../../components/layouts/navbar/Navbar";
import { AxiosLib } from '../../lib/axios'
import Swal from "sweetalert2";

const Login = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
        e.preventDefault();
        AxiosLib
            .post("/api/login", user)
            .then((res) => {
            console.log(res.data.result.role);
            if (res.data.result.role === "admin") {
                navigate("/admin/dashboard");
                window.location.reload();
            } else {
                navigate("/");
                window.location.reload();
            }
            })
            .catch((err) => {
                console.log(err);
                alert("Something went wrong!");
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong!",
                });
            });
        } catch (error) {
        console.log(error);
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

                            <form onSubmit={handleSubmit}>
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