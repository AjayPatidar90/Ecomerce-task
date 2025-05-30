import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Registerinfo } from "../../services/Auth";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phoneNo: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().min(3, "At least 3 characters").required("Full Name is required"),
            email: Yup.string().email("Invalid email format").required("Email is required"),
            phoneNo: Yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits").required("Phone number is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
            confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                const data = {
                    FullName: values.fullName,
                    Email: values.email,
                    PhoneNo: values.phoneNo,
                    Password: values.password,
                };
                const res = await Registerinfo(data);

                if (res.status) {
                    Swal.fire({
                        icon: "success",
                        title: "Registered successfully!",
                        text: res.msg,
                        timer: 2000,
                        timerProgressBar: true,
                    }).then(() => navigate("/login"));
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Registration failed",
                        text: res.msg,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                }
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    text: err.message || "Please try again",
                });
            }
        },
    });

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #e0f7fa, #fce4ec)",
                padding: "20px",
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    padding: "30px",
                    width: "100%",
                    maxWidth: "500px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h3 style={{ textAlign: "center", marginBottom: "25px", fontWeight: "600" }}>
                    Create Your Account
                </h3>

                <form onSubmit={formik.handleSubmit}>
                    {/* Full Name */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px", display: "block", fontWeight: "500" }}>
                            <FaUser style={{ marginRight: "8px" }} />
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: formik.touched.fullName && formik.errors.fullName ? "1px solid red" : "1px solid #ccc",
                            }}
                            {...formik.getFieldProps("fullName")}
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                            <div style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                                {formik.errors.fullName}
                            </div>
                        )}
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px", display: "block", fontWeight: "500" }}>
                            <FaEnvelope style={{ marginRight: "8px" }} />
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: formik.touched.email && formik.errors.email ? "1px solid red" : "1px solid #ccc",
                            }}
                            {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                                {formik.errors.email}
                            </div>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px", display: "block", fontWeight: "500" }}>
                            <FaPhone style={{ marginRight: "8px" }} />
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phoneNo"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: formik.touched.phoneNo && formik.errors.phoneNo ? "1px solid red" : "1px solid #ccc",
                            }}
                            {...formik.getFieldProps("phoneNo")}
                        />
                        {formik.touched.phoneNo && formik.errors.phoneNo && (
                            <div style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                                {formik.errors.phoneNo}
                            </div>
                        )}
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px", display: "block", fontWeight: "500" }}>
                            <FaLock style={{ marginRight: "8px" }} />
                            Password
                        </label>
                        <div style={{ display: "flex" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                style={{
                                    flex: 1,
                                    padding: "10px",
                                    borderRadius: "6px 0 0 6px",
                                    border: formik.touched.password && formik.errors.password ? "1px solid red" : "1px solid #ccc",
                                    borderRight: "none",
                                }}
                                {...formik.getFieldProps("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    border: "1px solid #ccc",
                                    borderLeft: "none",
                                    borderRadius: "0 6px 6px 0",
                                    padding: "0 12px",
                                    backgroundColor: "#f0f0f0",
                                    cursor: "pointer",
                                }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                                {formik.errors.password}
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div style={{ marginBottom: "25px" }}>
                        <label style={{ marginBottom: "5px", display: "block", fontWeight: "500" }}>
                            <FaLock style={{ marginRight: "8px" }} />
                            Confirm Password
                        </label>
                        <div style={{ display: "flex" }}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                style={{
                                    flex: 1,
                                    padding: "10px",
                                    borderRadius: "6px 0 0 6px",
                                    border: formik.touched.confirmPassword && formik.errors.confirmPassword ? "1px solid red" : "1px solid #ccc",
                                    borderRight: "none",
                                }}
                                {...formik.getFieldProps("confirmPassword")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{
                                    border: "1px solid #ccc",
                                    borderLeft: "none",
                                    borderRadius: "0 6px 6px 0",
                                    padding: "0 12px",
                                    backgroundColor: "#f0f0f0",
                                    cursor: "pointer",
                                }}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <div style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                                {formik.errors.confirmPassword}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
