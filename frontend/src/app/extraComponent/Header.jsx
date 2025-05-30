import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // You can replace this with your cart icon if needed
import { FaUserCircle } from "react-icons/fa";  // For the profile icon (you can use any other icon)
import { authToken } from "../utils/Tokenverify"
const Header = () => {
    const navigate = useNavigate();
    const token = authToken();  // Get the token for checking authentication

    console.log("token", token.role)

    // State for user data and cart count
    const [userData, setUserData] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownVisible(prev => !prev);
    };

    // Handle logout
    const handleLogout = () => {
        // Clear user session (this may include clearing cookies or localStorage)
        localStorage.removeItem("token");  // Example: Remove token from localStorage
        navigate("/login");  // Redirect to login page
    };

    return (
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 bg-white text-gray-700 z-50 shadow-md">
            <img src="/assets/img/logo.svg" alt="Logo" />

            {/* Navigation Links */}
            <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
                <Link to="/" className="hover:text-gray-900 transition">Home</Link>
                <Link to="/Shop" className="hover:text-gray-900 transition">Shop</Link>
                <Link to="/about" className="hover:text-gray-900 transition">About Us</Link>
                <Link to="/contact" className="hover:text-gray-900 transition">Contact</Link>
                {token.role == "ADMIN" && <Link to="/products" className="hover:text-gray-900 transition">products</Link>}

            </div>

            {/* Profile Icon */}
            <div className="relative">
                <FaUserCircle
                    size={30}
                    className="cursor-pointer"
                    onClick={toggleDropdown} // Toggle dropdown on click
                />

                {/* Dropdown Menu for Profile and Logout */}
                {isDropdownVisible && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg text-gray-700 z-50">
                        <div className="p-2">
                            {/* Profile Option (can be expanded with more features like Settings) */}
                            <Link to="/user/profile" className="block px-4 py-2 text-sm hover:bg-gray-200">
                                Profile
                            </Link>

                            {/* Logout Option */}
                            <button
                                onClick={handleLogout}
                                className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
