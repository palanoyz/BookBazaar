import React from "react";
import { AxiosLib } from "../../../lib/axios";
// import Swal from "sweetalert2";

const AdminCardBook = ({ databook }) => {

    const id = databook.map((book) => book._id);

    console.log(id);

    return (
        <section>

        </section>
    );
}

export default AdminCardBook;