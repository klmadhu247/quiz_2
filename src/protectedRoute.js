import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, user }) => {
    if (!user || user.username !== "admin") {
        return <Navigate to="/" replace /> }
    return element;
};

export default ProtectedRoute;
