import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./components/ErrorPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route element={<PrivateRoute allowedRoles={['ROLE_ADMIN']} />}>
                    <Route path="/admin" element={<AdminPage />} />
                </Route>
                <Route element={<PrivateRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />}>
                    <Route path="/user" element={<UserPage />} />
                </Route>
                <Route
                    path="/forbidden"
                    element={<ErrorPage />}
                />
                <Route
                    path="/unauthorized"
                    element={<ErrorPage />}
                />
            </Routes>
        </Router>

    );
}

export default App;
