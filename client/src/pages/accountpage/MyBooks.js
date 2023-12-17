import React, { useState, useEffect, useContext } from 'react';
import './accountpage.css';
import Navbar from '../../components/layouts/navbar/Navbar';
import { AxiosLib } from '../../lib/axios';
import Swal from 'sweetalert2';
import { DataContext } from '../../App';
import SidebarUser from './components/SidebarUser';
import MyBookCard from './components/MyBookCard';

const MyBooks = () => {
    const { userInfo } = useContext(DataContext);
    const [purchase, setPurchase] = useState([]);

    useEffect(() => {
        const getPurchase = async () => {
            try {
                await AxiosLib
                    .get(`/api/mybooks?userID=${userInfo.id}`)
                    .then((res) => {
                        setPurchase(res.data);
                    });
            } catch (err) {
                console.log(err);
            }
        };
        getPurchase();
    }, [userInfo]);

    console.log(purchase);


    return (
        <section>
            <Navbar darkTheme={true} />
            <div className="accountpage">
                <SidebarUser />
                <div className="account-content">
                    <h2>My Books Collection</h2>
                    <MyBookCard purchase={purchase} />
                </div>
            </div>
        </section>
    );
};

export default MyBooks;