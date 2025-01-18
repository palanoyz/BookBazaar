import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import AuthBgImg from "../../assets/library.jpg"
import Navbar from "../../components/layouts/navbar/Navbar";
import { AxiosLib } from '../../lib/axios';
import Swal from "sweetalert2";

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
        e.preventDefault();
        try {           
            if (user.username === "") {
                Swal.fire({
                    icon: "error",
                    text: "Username cannot be empty!",
                });
                return false;
            }
            if (user.email === "") {
                Swal.fire({
                    icon: "error",
                    text: "Email cannot be empty!",
                });
                return false;
            }
            if (user.password === "") {
                Swal.fire({
                    icon: "error",
                    text: "Password cannot be empty!",
                });
                return false;
            }
            else if (user.password.length < 6) {
                Swal.fire({
                    icon: "error",
                    text: "Password must be at least 6 characters!",
                });
                return false;
            } 
            AxiosLib.post("/api/signup", user).then((res) => {
                console.log("success", res);
            });
            await navigate("/login");
        } catch (error) {
            console.log(error);
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

                                <div className="form-group-btn">
                                    <input
                                        type="submit"
                                        className="auth-btn"
                                        value="Submit"
                                    />
                                </div>
                            </form>

                            <p className="sign" >Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Signup;