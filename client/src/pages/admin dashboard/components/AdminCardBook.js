import React from "react";
import { AxiosLib } from "../../../lib/axios";
// import Swal from "sweetalert2";

const AdminCardBook = ({ databook }) => {

    const id = databook.map((book) => book._id);

    console.log(id);

    return (
        <section>
            {databook.map((book) => (
                <div key={book._id} className="card-item">
                    <div>
                        <img src={book.image} alt="" />
                    </div>
                    <p>{book.title}</p>
                    {/* <p>{book.author}</p> */}
                    <p>{book.price}</p>
                    {/* <p>{book.description}</p> */}
                    <p>{book.category}</p>
                    <button onClick={
                        ()=>{
                        AxiosLib
                        .delete(`/api/deletebook/${book._id}`)
                        .then((res) => {
                            console.log(res);
                            window.location.reload();
                        })
                        .catch((err) => console.log(err));
                        }
                    }>delete</button>
                    <button>edit</button>
                </div>
            ))}
        </section>
    );
}

export default AdminCardBook;