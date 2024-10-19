import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Input, Button, message } from "antd";
import LoginImage from "../assets/login-3.svg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({ email: "", password: "" });

    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (!email) {
            errors.email = "Email is required";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Invalid email format";
            valid = false;
        }

        if (!password) {
            errors.password = "Password is required";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await axios.post("/user/login", { email, password });

            const { token , user } = response.data;

            Cookies.set("auth-token", token);
            Cookies.set("auth-role", user.role);
            
            message.success("Login successful!");

            window.location.href = "/"
        } catch (error) {
            message.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="md:w-2/5 w-full bg-white rounded-2xl border px-8 py-16 flex flex-col items-center">
                <img src={LoginImage} alt="Login" className="h-40 mb-8" />

                <div className="w-full text-center">
                    <h1 className="text-3xl font-semibold mb-2 text-gray-800 tracking-wide">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 tracking-wide">Please login to your account</p>
                </div>

                <div className="mt-8 w-full">
                    <label className="text-sm tracking-wide text-gray-600">Email Address</label>
                    <Input
                        placeholder="Enter your email"
                        className={`py-2 mt-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="mt-6 w-full">
                    <label className="text-sm tracking-wide text-gray-600">Password</label>
                    <Input.Password
                        placeholder="Enter your password"
                        className={`py-2 mt-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <Button
                    type="primary"
                    block
                    size="large"
                    className="mt-8 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    loading={loading}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </div>
        </div>
    );
}
