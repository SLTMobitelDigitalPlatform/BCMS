import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import "../../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  // const [otp, setOtp] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    if (email === "") {
      toast.error("Enter Your Email!");
    } else if (!email.includes("@")) {
      toast.error("Enter a Valid Email!");
    } else if (serviceNumber === "") {
      toast.error("Enter Your Service Number!");
    } else {
      const response = await axios.post("http://localhost:5000/user/sendotp", {
        email,
        serviceNumber,
      });

      if (response.status === 200) {
        localStorage.setItem("email", email);
        localStorage.setItem("serviceNumber", serviceNumber);
        navigate("/otp", { state: { email, serviceNumber } });
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:5000/user/sendotp", {
  //       email,
  //       serviceNumber,
  //     });
  //     const { token, role } = response.data;
  //     localStorage.setItem("token", token);
  //     toast.success("Login successful!");

  //     if (rememberMe) {
  //       localStorage.setItem("email", email);
  //     } else {
  //       localStorage.removeItem("email");
  //     }

  //     switch (role) {
  //       case "Super Admin":
  //         window.location.href = "/admin";
  //         break;
  //       case "secretariatcoordinator":
  //         window.location.href = "/secrecoordinator";
  //         break;
  //       case "BCM Coordinator":
  //         window.location.href = "/coordinator";
  //         break;
  //       case "personsgivingapprovals":
  //         window.location.href = "/personsgivingapprovals";
  //         break;
  //       case "BCM teams":
  //         window.location.href = "/team";
  //         break;
  //       case "employee":
  //         window.location.href = "/employeedash";
  //         break;
  //       case "customer":
  //         window.location.href = "/customer";
  //         break;
  //       default:
  //         setError("Invalid role");
  //         break;
  //     }
  //   } catch (error) {
  //     setError("Invalid email or OTP");
  //     toast.error("Invalid email or OTP");
  //   }
  // };

  return (
    <section className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="w-8/12 bg-white flex rounded-lg shadow-lg overflow-hidden w-3/4 h-5/6">
        {/*SLT logo*/}
        <div
          className="w-1/2 bg-[#001A3E] text-white p-8 flex flex-col items-center justify-center relative"
          style={{ borderBottomRightRadius: "5rem" }}
        >
          <div className="absolute bottom-0 right-0 w-0 h-0 bg-white rounded-tl-full"></div>
          <div className="z-10 text-center">
            <img
              src={logo}
              alt="SLTMobitel Logo"
              className="mb-20 mx-auto w-76 h-24"
            />
            <p className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
              Business Continuity Management System
            </p>
          </div>
        </div>

        {/*Form*/}
        <div className="w-1/2 bg-transparent p-10 rounded-lg px-16">
          <h1 className="text-2xl font-bold mb-1 text-center text-[#003E81] ">
            Welcome Back !
          </h1>
          <p className="text-xs font-semibold mb-14 text-center text-[#003E81]">
            Please fill your login details below.
          </p>

          <form onSubmit={sendOtp}>
            {/*email*/}
            <div className="mb-5 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] opacity-70 p-0.5 rounded-lg shadow-lg">
              <input
                className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/*service number*/}
            <div className="mb-4 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] opacity-70 p-0.5 rounded-lg shadow-lg ">
              <input
                className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight "
                id="serviceNumber"
                type="text"
                placeholder="Service Number"
                value={serviceNumber}
                onChange={(e) => setServiceNumber(e.target.value)}
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="mb-10 flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
                style={{ accentColor: "#003E81" }}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-[#003E81] text-sm ">
                Remember Me
              </label>
            </div>

            {error && <p className="text-red-500 text-xs italic"></p>}

            {/*sign in button*/}
            <div className="mb-5 flex items-center justify-between">
              <button
                className="bg-gradient-to-r from-[#003E81] to-[#2ACF1C] 
                           hover:from-[#2ACF1C] hover:to-[#003E81] transition duration-1000 ease-in-out
                           w-full text-white font-semibold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>

          {/*separator*/}
          <div className="mb-10 flex items-center my-4">
            <div className="flex-grow h-px bg-gradient-to-r from-[#2ACF1C] to-[#003E81]"></div>
            <span className="flex-shrink text-sm text-[#003E81] px-4">OR</span>
            <div className="flex-grow h-px bg-gradient-to-r from-[#2ACF1C] to-[#003E81]"></div>
          </div>

          {/* google & microsoft buttons
          <div className="flex items-center justify-center space-x-4">
            <button className="px-2">
              <img src={google} alt="Sign in with Google" className="w-8 h-8" />
            </button>
            <button className="px-2">
              <img
                src={microsoft}
                alt="Sign in with Microsoft"
                className="w-8 h-8"
              />
            </button>
          </div> */}

          <p className="mb-16 text-center text-[#003E81] mt-4">
            Don’t Have an Account?
            <a href="/subscribe" className="text-[#2ACF1C] hover:underline">
              {" "}
              Join Today!
            </a>
          </p>

          <div className="mt-10 text-center">
            <Link to="/subscribe">
              <button
                className="bg-gradient-to-r from-[#003E81] to-[#2ACF1C] 
                           hover:from-[#2ACF1C] hover:to-[#003E81] transition duration-1000 ease-in-out
                           w-full text-white font-semibold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                type="button"
              >
                Join with Us as a Visitor
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
