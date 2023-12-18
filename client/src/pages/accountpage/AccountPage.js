import React, { useState, useEffect, useContext } from 'react';
import './accountpage.css';
import Navbar from '../../components/layouts/navbar/Navbar';
import { AxiosLib } from '../../lib/axios';
import { DataContext } from '../../App';
import SidebarUser from './components/SidebarUser';

const AccountPage = () => {
    const { userInfo } = useContext(DataContext);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            if (!userInfo.id) {
                return;
            }
            await AxiosLib
                .get(`/api/getuser/${userInfo.id}`)
                .then((res) => {
                    setUser(res.data);
                });
        };
        fetchUser();
    }, [userInfo.id]);


    return (
        <section>
            <Navbar darkTheme={true} />
            <div className="accountpage">
                <SidebarUser />
                <div className="account-content">
                    <div className='account-card'>
                        <h2>Account Informations</h2>
                        <p><b>Username:</b> {user.username}</p>
                        <p><b>Email:</b> {user.email}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountPage;