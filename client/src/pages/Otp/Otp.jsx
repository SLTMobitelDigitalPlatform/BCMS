import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import backgroundImage from "../../assets/bgblue.png";
import logo from "../../assets/SLTLogo.png";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
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
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

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
        <div className="w-full p-8">
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center">
              <img src={logo} alt="Logo" className="h-16" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 p-5">
              SLT Mobitel Awaiting You
            </h1>
            <hr className="border-t-4 border-green-500 p-2" />

            <p className="text-blue-900 p-2">
              Your OTP code was sent to you via Email
            </p>
          </div>
          <div>
            <p>
              Time Remaining:{" "}
              <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
              <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
            </p>
          </div>

          {/* Button to resend OTP */}
          <button
            disabled={seconds > 0 || minutes > 0}
            style={{ color: seconds > 0 || minutes > 0 ? "red" : "green" }}
            onClick={resendOtp}
          >
            Resend OTP
          </button>

          <form>
            <div className="mb-3 flex items-center justify-center">
              <input
                type="text"
                name="otp"
                id="otp"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter Your OTP"
                className="mt-1 p-2 w-80 border rounded-2xl border-black "
              />
            </div>
            <p className="flex items-center justify-center p-1">
              Didnt Recieve OTP code?
            </p>
            <Link
              onClick={resendOtp}
              //   onClick={handleResendCode}
              className="flex items-center justify-center text-blue-700 underline cursor-pointer p-2"
            >
              Resend Code
            </Link>
            <div className="text-center">
              <Link
                className="bg-gradient-to-r from-blue-900 to-green-500 text-white px-8 py-3 rounded-full font-bold w-64"
                onClick={LoginUser}
              >
                Verify & Continue
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Otp;
