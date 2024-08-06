

import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import logo from '../assets/logo.png';
import { sentOtpFunction } from "../services/Apis";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [passShow, setPassShow] = useState(false);

    const navigate = useNavigate();

    // sendotp
    const sendOtp = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Enter Your Email!");
        } else if (!email.includes("@")) {
            toast.error("Enter a Valid Email!");
        } else if (password === "") {
            toast.error("Enter Your Password!");
        } else {
            setSpinner(true);
            const data = { email, password };

            const response = await sentOtpFunction(data);

            if (response.status === 200) {
                setSpinner(false);
                navigate("/user/otp", { state: email });
            } else {
                setSpinner(false);
                toast.error(response.response.data.error);
            }
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white flex rounded-lg shadow-lg overflow-hidden w-3/4">
                <div className="w-1/2 bg-[#001A3E] text-white p-8 flex flex-col items-center justify-center relative">
                    <div className="absolute bottom-0 right-0 w-0 h-0 bg-white rounded-tl-full"></div>
                    <div className="z-10 text-center">
                         <img src={logo} alt="SLTMobitel Logo" className="mb-4 mx-auto" /> 
                        {/* <h1 className="text-3xl font-bold mb-2">SLTMOBITEL</h1>
                        <h2 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
                            Business Continuity Management System
                        </h2> */}
                    </div>
                </div>
                <div className="w-1/2 p-8">
                    <div className="mb-6 text-center">
                        <h1 className="text-blue-900 text-3xl font-semibold">Welcome! Log In</h1>
                        <p className="text-blue-900">Please fill your login details below.</p>
                    </div>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your Email Address"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type={!passShow ? "password" : "text"}
                                    name="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Your Password"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                                <div
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                    onClick={() => setPassShow(!passShow)}
                                >
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                            <div className="text-right mt-2">
                                <NavLink to="/forgot-password" className="text-blue-500">Forgot password?</NavLink>
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                className="bg-gradient-to-r from-blue-900 via-blue-700 to-green-500 text-white px-8 py-3 rounded-md hover:bg-gradient-to-r hover:from-green-900 hover:via-green-700 hover:to-blue-600 hover:text-white transition duration-300"
                                onClick={sendOtp}
                            >
                                Login
                                {spinner && <Spinner animation="border" className="ml-2" />}
                            </button>
                        </div>
                        <p className="mt-4 text-center">Don't have an account? <NavLink to="/register" className="text-blue-500">Sign up</NavLink></p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Login;
