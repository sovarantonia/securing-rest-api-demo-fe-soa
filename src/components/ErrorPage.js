import {useLocation} from "react-router-dom";

import './style/AppStyles.css';

const ErrorPage = () => {
    const location = useLocation();

    const path = location.pathname;
    let message = "An error occurred."; // Default message


    if (path === "/forbidden") {
        message = "You do not have permission to access this page. You must be admin.";
    } else if (path === "/unauthorized") {
        message = "You need to log in to access this page.";
    }

    return (
        <div className="Page">
            <div className="box">
                <h2>Error</h2>
                <div className="error">
                    <p>{message}</p>
                </div>
                <button onClick={() => window.history.back()}>Go Back</button>
            </div>
        </div>
    );
};

export default ErrorPage;
