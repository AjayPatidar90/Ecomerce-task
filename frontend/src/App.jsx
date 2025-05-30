import './index.css';
import MainRoute from './app/routes/Main.route';
import Login from './app/layouts/Auth/Login';
import Register from './app/layouts/Auth/Register';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './app/routes/ProtectedRoute';  // Import the ProtectedRoute component
import { authToken } from "./app/utils/Tokenverify"

function App() {
  const token = authToken();  // Get the token for checking authentication

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={<ProtectedRoute element={<MainRoute />} />}  // Protected Route with check
      />
    </Routes>
  );
}

export default App;
