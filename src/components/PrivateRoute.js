import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
    const token = sessionStorage.getItem('tokenValue');
    const role = sessionStorage.getItem('role');

    if (!token) {
        return <Navigate to="/unauthorized" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/forbidden" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
