import React from "react";
import { AxiosLib } from "../../../lib/axios";

const WriterCard = ({ data, type }) => {
    return (
        <section>
            {data.map((item) => (
                <div key={item._id} className="writer-card">
                    <p>{item.name}</p>
                    <button className="delete-writer-btn" onClick={() => {
                        AxiosLib
                            .delete(`/admin/deletewriter/${type}/${item._id}`)
                            .then(() => {
                                window.location.reload();
                            });
                    }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </section>
    )
}

export default WriterCard;