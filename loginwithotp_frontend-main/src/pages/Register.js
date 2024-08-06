import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import logo from '../assets/logo.png';
import { registerfunction } from "../services/Apis";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [inputData, setInputData] = useState({
    fname: "",
    email: "",
    contact: "",
    password: ""
  });

  const navigate = useNavigate();

  // setinputvalue
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  }

  // register data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password } = inputData;

    if (fname === "") {
      toast.error("Enter Your Name");
    } else if (email === "") {
      toast.error("Enter Your Email");
    } else if (!email.includes("@")) {
      toast.error("Enter a Valid Email");
    } else if (password === "") {
      toast.error("Enter Your Password");
    } else if (password.length < 6) {
      toast.error("Password length minimum 6 characters");
    } else {
      const response = await registerfunction(inputData);

      if (response.status === 200) {
        setInputData({ ...inputData, fname: "", email: "", contact: "", password: "" });
        navigate("/");
      } else {
        toast.error(response.response.data.error);
      }
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white flex rounded-lg shadow-lg overflow-hidden w-3/4">
        <div className="w-1/2 bg-[#001A3E] text-white p-8 flex flex-col items-center justify-center relative">
          <div className="absolute bottom-0 right-0 w-0 h-0 bg-white rounded-tl-full"></div>
          <div className="z-10 text-center">
            <img src={logo} alt="SLTMobitel Logo" className="mb-4 mx-auto" />
          </div>
        </div>
        <div className="w-1/2 p-8">
          <div className="mb-6 text-center">
            <h1 className="text-blue-900 text-3xl font-semibold">Get Started!</h1>
            <p className="text-blue-900">Please fill your signup details below.</p>
          </div>
          <form>
            <div className="mb-4">
              <input
                type="text"
                name="fname"
                value={inputData.fname}
                onChange={handleChange}
                placeholder="User Name"
                className="mt-1 p-2 w-full border border-blue-900 rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={inputData.email}
                onChange={handleChange}
                placeholder="Email"
                className="mt-1 p-2 w-full border border-blue-900 rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="contact"
                value={inputData.contact}
                onChange={handleChange}
                placeholder="Contact Number"
                className="mt-1 p-2 w-full border border-blue-900 rounded-md"
              />
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  value={inputData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="mt-1 p-2 w-full border border-blue-900 rounded-md"
                />
                <div
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"} 
                </div>
              </div>
            </div>
            <div className="text-center mb-4">
              <button
                className="bg-gradient-to-r from-blue-900 via-blue-700 to-green-500 text-white px-8 py-3 rounded-md hover:bg-gradient-to-r hover:from-green-900 hover:via-green-700 hover:to-blue-600 hover:text-white transition duration-300"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
            <p className="mt-4 text-center">Already have an account? <NavLink to="/" className="text-blue-500">Log in</NavLink></p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Register;
