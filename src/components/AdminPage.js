import {useNavigate} from 'react-router-dom';
import {admin} from "./api";
import {useEffect, useState} from "react";

import './style/AppStyles.css';

const AdminPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const firstName = sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');
    const email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role');

    const handleLogout = () => {
        sessionStorage.removeItem('tokenValue');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('lastName');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('role');

        // Redirect to the login page
        navigate('/');
    };

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const response = await admin();
                setResponseMessage(response);
            } catch (error) {
                setError("Something went wrong!");
            }
        };

        fetchResponse();
    }, []);

    return (
        <div className="Page">
            <div className="box">
                <h2>User Profile</h2>
                {error && <div className="error" id="errorMessage">{error}</div>}
                <div className="info">
                    <p>First Name: {firstName}</p>
                    <p>Last Name:{lastName}</p>
                    <p>Email: {email}</p>
                    <p>Role: {role}</p>
                    {responseMessage && <p>Server Response: {responseMessage}</p>}
                </div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default AdminPage;
