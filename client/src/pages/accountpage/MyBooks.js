import React, { useState, useEffect, useContext } from 'react';
import './accountpage.css';
import Navbar from '../../components/layouts/navbar/Navbar';
import { AxiosLib } from '../../lib/axios';
import { DataContext } from '../../App';
import SidebarUser from './components/SidebarUser';
import MyBookCard from './components/MyBookCard';

const MyBooks = () => {
    const { userInfo } = useContext(DataContext);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                await AxiosLib
                    .get(`/api/getmybooks?userID=${userInfo.id}`)
                    .then((res) => {
                        setBooks(res.data);
                    });
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooks();
    }, [userInfo]);


    return (
        <section>
            <Navbar darkTheme={true} />
            <div className="accountpage">
                <SidebarUser />
                <div className="account-content">
                    <h2>My Books Collection</h2>
                    <div className='bookcollection'>
                        <MyBookCard data={books} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyBooks;