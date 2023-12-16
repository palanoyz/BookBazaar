import React, { useState, useEffect, useContext } from 'react';
import './accountpage.css';
import Navbar from '../../components/layouts/navbar/Navbar';
import Footer from '../../components/layouts/footer/Footer';
import { AxiosLib } from '../../lib/axios';
import Swal from 'sweetalert2';
import { DataContext } from '../../App';

const AccountPage = () => {
    const { userInfo } = useContext(DataContext);
    const [user, setUser] = useState({});
    const [newPassword, setNewPassword] = useState({
        id: userInfo.id,
        password: "",
        newpassword: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
        if (!userInfo.id) {
            return;
        }
        await AxiosLib
            .get(`/api/getAccount/${userInfo.id}`)
            .then((res) => {
                setUser(res.data);
            });
        };
        fetchUser();
    }, [userInfo.id]);

    // const handleChange = (e) => {
    //     setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     await AxiosLib
    //     .put("/api/changepassword", newPassword)
    //     .then((res) => {
    //         Swal.fire({
    //             icon: "success",
    //             title: "Success",
    //             text: "Your password has been changed!",
    //         });
    //         console.log(res.data);
    //     })
    //     .catch((err) => {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: "Something went wrong!",
    //         });
    //         console.log(err);
    //     });
    // };
        

    return (
        <section>
            <Navbar darkTheme={true} />
            <div className="account-page">           
                <h2>My Account</h2>
                <div className="user-info">
                    <p><b>Username:</b> {user.username}</p>
                    <p><b>Email:</b> {user.email}</p>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default AccountPage;