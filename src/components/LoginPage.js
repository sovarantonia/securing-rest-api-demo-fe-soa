import {useState} from "react";
import {login} from "./api";
import {useNavigate} from "react-router-dom";

import './style/LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Enter your email and password');
            return;
        }

        try {
            const response = await login(email, password);

            if (response.tokenValue) {

                const role = sessionStorage.getItem('role');
                if (role === 'ROLE_ADMIN') {
                    navigate('/admin');
                } else {
                    navigate('/user');
                }
            } else {
                setError('Unexpected error, please try again');
            }
        } catch (error) {
            setError('Error logging in: ' + error.message);
        }
    }

    return (
        <div className="LoginPage">
            <form onSubmit={handleSubmit} className={"form"} id="loginForm">
                {error && <div className="error" id="errorMessage">{error}</div>}
                <h2>Login</h2>
                <input type="email" id="emailInput" value={email} onChange={(e) => setEmail(e.target.value)}
                       placeholder="Email" required/>
                <input type="password" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password" required/>
                <button type="submit" id="loginButton">Login</button>
            </form>
        </div>
    )
}
export default LoginPage;