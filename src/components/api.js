import axios from 'axios';

const API_URL = 'http://localhost:8080';
// Axios instance to automatically attach Authorization header if token is present
const api = axios.create({
    baseURL: API_URL,
});

// Interceptor to add the JWT token to the Authorization header on each request
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('tokenValue');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Login API call
export const login = async (email, password) => {
    try {

        const response = await api.post('/login', {email, password});

        // Destructure the response to get token and user details
        const { tokenValue, firstName, lastName, email: userEmail, role } = response.data;

        sessionStorage.setItem('tokenValue', tokenValue);
        sessionStorage.setItem('firstName', firstName);
        sessionStorage.setItem('lastName', lastName);
        sessionStorage.setItem('email', userEmail);
        sessionStorage.setItem('role', role);

        return response.data; // Return the user data along with token

    } catch (error) {
        console.error('Login error:', error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Login failed');
        }
        throw new Error('Login failed');
    }
};

export const myUser = async () => {
    try {
        const response = await api.get(`user/my-user`);
        return response.data;
    } catch (error) {
        console.error('Error response:', error);
        if (error.response && error.response.data) {
            throw new Error(JSON.stringify(error.response.data));
        } else {
            throw new Error('Failed deleting account');
        }
    }
}

export const admin = async () => {
    try {
        const response = await api.get(`user/admin`);
        return response.data;
    } catch (error) {
        console.error('Error response:', error);
        if (error.response && error.response.data) {
            throw new Error(JSON.stringify(error.response.data));
        } else {
            throw new Error('Failed deleting account');
        }
    }
}