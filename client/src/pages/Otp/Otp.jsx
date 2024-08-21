import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import backgroundImage from "../../assets/bgblue.png";
import logo from "../../assets/SLTLogo.png";
import { validateOTP } from "../../utilities/helper";

// Renderer for the countdown
const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    // When countdown is complete, show this message
    return <span className="text-red-500">OTP expired. Please resend.</span>;
  } else {
    // Render countdown
    return (
      <span>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    );
  }
};

// Helper to get local storage value
const getLocalStorageValue = (key) => localStorage.getItem(key);

const Otp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [data, setData] = useState({ date: Date.now(), delay: 10000 });
  const [key, setKey] = useState(Date.now());
  const wantedDelay = 10000;
  const [countdownCompleted, setCountdownCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Resend OTP function
  const resendOtp = async () => {
    setIsResending(true);
    const { email, serviceNumber } = location.state;
    try {
      const response = await axios.post("http://localhost:5000/user/sendotp", {
        email,
        serviceNumber,
      });

      if (response.status === 200) {
        toast.success("OTP has been resent to your email.");
        const newExpirationTime = Date.now() + wantedDelay;
        localStorage.setItem("end_date", JSON.stringify(newExpirationTime)); // Set new expiration time
        setData({ date: Date.now(), delay: wantedDelay }); // Restart the countdown
        setCountdownCompleted(false); // Reset countdown state
        setKey(Date.now());
      } else {
        toast.error(response.response.data.error);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  // Effect to check for existing countdown on page load
  useEffect(() => {
    const savedDate = getLocalStorageValue("end_date");
    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delta = parseInt(savedDate, 10) - currentTime;

      if (delta > 0) {
        // Timer still valid, update countdown
        setData({ date: currentTime, delay: delta });
        setKey(Date.now());
      } else {
        // Timer expired, clear saved date
        localStorage.removeItem("end_date");
      }
    }
  }, []);

  const LoginUser = async (e) => {
    e.preventDefault();
    console.log(location.state);
    const email = localStorage.getItem("email");

    if (otp === "") {
      setHasError(true);
      toast.error("Enter Your OTP");
    } else if (!validateOTP(otp)) {
      setHasError(true);
      toast.error("Enter a Valid OTP");
    } else {
      setHasError(false);
      const data = {
        otp,
        email,
      };

      try {
        console.log(data);
        const response = await axios.post("http://localhost:5000/user/login", {
          data,
        });

        console.log(response);

        if (response.status === 200) {
          localStorage.removeItem("email");
          localStorage.removeItem("serviceNumber");
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
          const role = response.data.role;
          console.log(role);
          switch (role) {
            case "Super Admin":
              navigate("/admin");
              break;
            case "Secretariat Coordinator":
              navigate("/secrecoordinator");
              break;
            case "BCM Coordinator":
              navigate("/coordinator");
              break;
            case "Person Giving Approvals":
              navigate("/personsgivingapprovals");
              break;
            case "BCM Teams":
              navigate("/team");
              break;
            case "Employee":
              navigate("/employeedash");
              break;
            case "customer":
              navigate("/customer");
              break;
            default:
              navigate("/login");
              break;
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to verify OTP");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="p-8 rounded-lg shadow-lg overflow-hidden w-full max-w-xl bg-white">
        {/* Logo and Header */}
        <div className="text-center">
          <img src={logo} alt="Logo" className="h-16 mx-auto mb-4" />

          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 p-4">
            SLT Mobitel Awaiting You
          </h1>
          {/* <hr className="border-t-4 border-green-500 p-2" /> */}
          <p className="text-indigo-800 mb-6 font-semibold">
            Your OTP code was sent to you via Email
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="text-center mb-6">
          <Countdown
            key={key}
            date={data.date + data.delay}
            renderer={renderer}
            onStart={() => {
              // Save expiration time on start
              if (!localStorage.getItem("end_date")) {
                localStorage.setItem(
                  "end_date",
                  JSON.stringify(data.date + data.delay)
                );
              }
            }}
            onComplete={() => {
              setCountdownCompleted(true);
              // Clear local storage when countdown completes
              localStorage.removeItem("end_date");
            }}
          />
        </div>

        <form className="space-y-4" onSubmit={LoginUser}>
          <input
            type="text"
            name="otp"
            id="otp"
            onChange={(e) => setOtp(e.target.value)}
            onFocus={() => setHasError(false)}
            placeholder="Enter Your OTP"
            className={`shadow appearance-none border-2 block mx-auto rounded-md text-center w-full py-1 px-4 focus:outline-none ${
              hasError && !otp.trim() && !validateOTP(otp)
                ? "input-field-error"
                : "input-field-border"
            } `}
          />

          <p className="text-center text-sm text-gray-600">
            Didnt recieve OTP code?
          </p>

          {/* Button to resend OTP */}
          <button
            disabled={!countdownCompleted || isResending}
            className={`block mx-auto text-center ${
              !countdownCompleted || isResending
                ? "text-gray-700 opacity-60"
                : "text-blue-700 cursor-pointer hover:underline"
            }`}
            onClick={resendOtp}
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>

          <button
            className="block mx-auto w-full btn-primary px-8 py-2 rounded-full font-bold"
            // onClick={LoginUser}
            type="submit"
          >
            Verify & Continue
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Otp;
