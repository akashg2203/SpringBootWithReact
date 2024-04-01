import axios from "axios";
import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function DeleteUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const deleteuser = async () => {
        if (window.confirm("Are You sure You Want to Delete this User?")) {
            try {
                const response = await axios.delete(`http://localhost:8080/user/${id}`);
                console.log(response.data);
                navigate("/Home");
            } catch (error) {
                console.error("Error during deletion:", error);
            }
        }
    };

    return (
        <div>
            <p>Are you sure you want to delete this user?</p>
            <button onClick={deleteuser}>Confirm Delete</button>
        </div>
    );
}

