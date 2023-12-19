import React, { useState, useContext } from 'react';
import '../admin dashboard/admin.css';
import './accountpage.css';
import Navbar from '../../components/layouts/navbar/Navbar';
import { AxiosLib } from '../../lib/axios';
import Swal from 'sweetalert2';
import { DataContext } from '../../App';
import SidebarUser from './components/SidebarUser';

const ChangePassword = () => {
    const { userInfo } = useContext(DataContext);
    const [newPassword, setNewPassword] = useState({
        id: userInfo.id,
        password: "",
        newpassword: "",
        confirmpassword: "",
    });

    const handleChange = (e) => {
        setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newPassword.newpassword !== newPassword.confirmpassword) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Password not match!",
                });
                return false;
            }
            await AxiosLib
                .put("/api/changepassword", newPassword)
                .then((res) => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Password Changed!",
                    });
                    console.log(res);
                });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Old Password not match!",
            });
        }
    };


    return (
        <section>
            <Navbar darkTheme={true} />
            <div className="accountpage">
                <SidebarUser />
                <div className="account-content">
                    <h2>Change Password</h2>
                    <form onSubmit={handleSubmit} className="changepass-form">
                        <div className="form-input-book">
                            <label>Old password : </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-input-book">
                            <label>New password : </label>
                            <input
                                type="password"
                                name="newpassword"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-input-book">
                            <label>Confirm password : </label>
                            <input className="form-input-book-desc"
                                type="password"
                                name="confirmpassword"
                                onChange={handleChange}
                            />
                        </div>

                        <button className="changepass-button">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;