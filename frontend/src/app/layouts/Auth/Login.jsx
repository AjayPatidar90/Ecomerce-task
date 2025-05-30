import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/Auth';

export default function Login() {
    const [userData, setUserData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false); // 👁️ Eye toggle
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
        validate(name, value);
    };

    const validate = (name, value) => {
        const newErrors = { ...errors };
        if (!value) {
            newErrors[name] = `${name} is required`;
        } else {
            delete newErrors[name];
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateAllFields = () => {
        let isValid = true;
        for (const key in userData) {
            if (!validate(key, userData[key])) {
                isValid = false;
            }
        }
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateAllFields()) return;

        try {
            const res = await login(userData);
            if (res.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: res.message,
                });
                navigate('/');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: res.message,
                });
            }
        } catch (error) {
            console.log("error in login user", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-2 text-gray-600"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                        <button
                            type="button"
                            className="text-sm text-green-600 hover:underline"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </button>
                    </div>

                    <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
