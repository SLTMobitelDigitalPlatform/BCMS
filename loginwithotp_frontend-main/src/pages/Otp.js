import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { userVerify } from "../services/Apis";

const Otp = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      toast.error("Enter Your OTP");
    } else if (!/^\d{6}$/.test(otp)) {
      toast.error("Enter a Valid OTP");
    } else {
      const data = {
        otp, email: location.state
      };

      const response = await userVerify(data);
      if (response.status === 200) {
        localStorage.setItem("userdbtoken", response.data.userToken);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-gradient-to-r from-blue-200 via-white to-green-200 p-8 rounded-lg shadow-lg overflow-hidden w-1/2">
        <div className="w-full p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-blue-900">OTP Verification</h1>
            <div className="w-16 h-16 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-500 w-16 h-16 mx-auto">
                <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="url(#grad1)" fill="none" />
                <polyline points="9 12 12 15 16 10" strokeWidth="2" stroke="url(#grad1)" fill="none" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "#00FF00", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#001A3E", stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="text-blue-900">Your OTP code was sent to you via Email</p>
          </div>
          <form>
            <div className="mb-4">
              <input
                type="text"
                name="otp"
                id="otp"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter Your OTP"
                className="mt-1 p-2 w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                style={{ borderImage: 'linear-gradient(to right, #001A3E, #00FF00) 1' }}
              />
            </div>
            <div className="text-center">
              <button
                className="bg-gradient-to-r from-blue-900 via-blue-700 to-green-500 text-white px-8 py-3 rounded-md hover:bg-gradient-to-r hover:from-green-900 hover:via-green-700 hover:to-blue-600 hover:text-white transition duration-300"
                onClick={LoginUser}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Otp;
