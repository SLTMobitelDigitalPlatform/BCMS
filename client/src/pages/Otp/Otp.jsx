import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import backgroundImage from "../../assets/bgblue.png";
import logo from "../../assets/SLTLogo.png";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);

  const resendOtp = async () => {
    setIsResending(true);
    const { email, serviceNumber } = location.state;
    try {
      const response = await axios.post("http://localhost:5000/user/sendotp", {
        email,
        serviceNumber, // Include serviceNumber in the request
      });

      if (response.status === 200) {
        toast.success("OTP has been resent to your email.");
      } else {
        toast.error(response.response.data.error);
      }
      setMinutes(5);
      setSeconds(0);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0 && seconds === 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      } else {
        clearInterval(interval); // Stop the countdown when both minutes and seconds reach 0
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  const LoginUser = async (e) => {
    e.preventDefault();
    console.log(location.state);
    const email = localStorage.getItem("email");

    if (otp === "") {
      toast.error("Enter Your OTP");
    } else if (!/^\d{6}$/.test(otp)) {
      toast.error("Enter a Valid OTP");
    } else {
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
            case "superadmin":
              navigate("/admin");
              break;
            case "secretariat coordinator":
              navigate("/secrecoordinator");
              break;
            case "coordinators":
              navigate("/coordinator");
              break;
            case "persons giving approvals":
              navigate("/personsgivingapprovals");
              break;
            case "bcmteams":
              navigate("/team");
              break;
            case "employee":
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

      //   const response = await userVerify(data);
      //   if (response.status === 200) {
      //     localStorage.setItem("userdbtoken", response.data.userToken);
      //     toast.success(response.data.message);
      //     setTimeout(() => {
      //       navigate("/dashboard");
      //     }, 5000);
      //   } else {
      //     toast.error(response.response.data.error);
      //   }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="p-8 rounded-lg shadow-lg overflow-hidden w-1/2 bg-white">
        {/* Logo and Header */}
        <div className="text-center">
          <img src={logo} alt="Logo" className="h-16 mx-auto" />

          <h1 className="text-4xl font-bold text-blue-900 p-5">
            SLT Mobitel Awaiting You
          </h1>
          <hr className="border-t-4 border-green-500 p-2" />
          <p className="text-blue-900 p-2">
            Your OTP code was sent to you via Email
          </p>
        </div>

        {/* Countdown Timer */}
        <p className="text-center mb-6">
          Time Remaining: <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </p>

        <form className="space-y-4">
          <input
            type="text"
            name="otp"
            id="otp"
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter Your OTP"
            className="block mx-auto p-2 w-80 border rounded-2xl border-black"
          />

          <p className="text-center">Didnt Recieve OTP code?</p>

          {/* <Link
              onClick={resendOtp}
              //   onClick={handleResendCode}
              className="flex items-center justify-center text-blue-700 underline cursor-pointer p-2"
            >
              Resend Code
            </Link> */}

          {/* Button to resend OTP */}
          <button
            disabled={isResending || seconds > 0 || minutes > 0}
            className={`block mx-auto text-center ${
              isResending || seconds > 0 || minutes > 0
                ? "text-gray-700 opacity-60"
                : "text-blue-700 cursor-pointer hover:underline"
            }`}
            onClick={resendOtp}
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>

          <Link
            className="block mx-auto w-64 bg-gradient-to-r from-blue-900 to-green-500 text-white px-8 py-3 rounded-full font-bold text-center"
            onClick={LoginUser}
          >
            Verify & Continue
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Otp;
