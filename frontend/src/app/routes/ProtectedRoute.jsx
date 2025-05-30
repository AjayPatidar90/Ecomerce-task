import { Navigate } from 'react-router-dom';
import { authToken } from '../utils/Tokenverify';

const ProtectedRoute = ({ element }) => {
    const token = authToken();

    if (!token) {
        return <Navigate to="/login" />;  // Redirect to login if no token
    }

    return element;  // Render the protected component if authenticated
};

export default ProtectedRoute;
