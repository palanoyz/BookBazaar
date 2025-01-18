import React from 'react';
import '../accountpage.css';

const MyBookCard = ({ data }) => {
    return (
        <>
            {data.map((item) => {
                return (
                    <div key={item.bookID} className='mybook-card'>
                        <img src={item.bookImage} alt="" />
                    </div>
                );
            })}
        </>
    );
};


export default MyBookCard;