import React from 'react';
import '../accountpage.css';

const MyBookCard = ({ purchase }) => {
    return (
        <section>
            {purchase?.map((book) => {
                return (
                    <div key={book._id}>
                        {book.book?.map((item) => (
                            <div key={item._id}>
                                <div>
                                    <img src={item.image} alt="" />
                                </div>
                                <div>
                                    <h1>{item.title}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })}
        </section>
    );
};

export default MyBookCard;