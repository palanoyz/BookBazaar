import React from "react";
import "./usercard.css";
import { AxiosLib } from "../../../lib/axios";

const UserCard = ({ userData }) => {
    return (
        <div className="usercard-container">           
            {userData.map((user) => (
                <div key={user._id} className="usercard">
                    <p>Username : {user.username}</p>
                    <p>Email : {user.email}</p>

                    <button onClick={() => {
                        AxiosLib
                            .delete(`/admin/deleteuser/${user._id}`)
                            .then((res) => {
                                console.log(res);
                                window.location.reload();
                            })
                            .catch((err) => console.log(err));
                    }} className="delete-user-btn">Delete</button>

                </div>
            ))}
        </div>
    )
}

export default UserCard;