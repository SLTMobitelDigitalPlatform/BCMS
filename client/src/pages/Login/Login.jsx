import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import { FaSpinner } from "react-icons/fa";
import { validateEmail } from "../../utilities/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedServiceNumber = localStorage.getItem("serviceNumber");

    if (savedEmail && savedServiceNumber) {
      setEmail(savedEmail);
      setServiceNumber(savedServiceNumber);
      setRememberMe(true);
    }
  }, []);

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      setHasError(true);
      setLoading(false);
      toast.error("Please enter a valid email address.");
      return;
    }
    setHasError(false);

    if (!serviceNumber.trim()) {
      setHasError(true);
      setLoading(false);
      toast.error("Please enter your service number.");
      return;
    }
    setHasError(false);

    try {
      const response = await axios.post("http://localhost:5000/user/sendotp", {
        email,
        serviceNumber,
      });

      if (response.status === 200) {
        // Store login info if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("serviceNumber", serviceNumber);
        } else {
          // Clear local storage if "Remember Me" is unchecked
          localStorage.removeItem("email");
          localStorage.removeItem("serviceNumber");
        }

        setLoading(false);
        navigate("/otp", { state: { email, serviceNumber } });
      } else {
        setLoading(false);
        toast.error(response.data.error);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error during authentication. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 p-5">
      <div className="bg-white flex flex-col lg:flex-row rounded-lg shadow-lg w-full max-w-5xl">
        {/*SLT logo*/}
        <div className="lg:w-1/2 bg-indigo-950 text-white p-10 flex flex-col items-center justify-center relative rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none lg:rounded-br-[5rem]">
          <img src={logo} alt="SLTMobitel Logo" className="mb-10 w-96 h-auto" />
          <p className="text-4xl leading-normal tracking-wide font-bold text-center">
            Business Continuity Management System
          </p>
        </div>

        {/*Form*/}
        <div className="lg:w-1/2 bg-transparent p-10">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Welcome Back !
          </h1>

          <form onSubmit={sendOtp} className="space-y-8">
            {/*Email*/}
            <div className="relative">
              <input
                // className=" text-gray-700 "
                className={`shadow appearance-none border-2 rounded-xl w-full h-full py-2 px-4 focus:outline-none ${
                  hasError && !validateEmail(email)
                    ? "input-field-error"
                    : "input-field-border"
                } `}
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setHasError(false)}
              />
            </div>

            {/*Service Number*/}
            <div className="relative">
              <input
                className={`shadow appearance-none border-2 rounded-xl w-full h-full py-2 px-4 focus:outline-none ${
                  hasError && !serviceNumber.trim()
                    ? "input-field-error"
                    : "input-field-border"
                } `}
                id="serviceNumber"
                type="text"
                placeholder="Service Number"
                value={serviceNumber}
                onChange={(e) => setServiceNumber(e.target.value)}
                onFocus={() => setHasError(false)}
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="mr-3 accent-green-500 h-4 w-4"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe" className="text-sm">
                  Remember Me
                </label>
              </div>
            </div>

            {/*Login button*/}
            <div>
              <button
                className="btn-primary font-semibold w-full py-2 rounded-xl"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin inline text-xl mr-2" />
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>

          {/* <div className="mb-10 flex items-center my-4">
            <div className="flex-grow h-px bg-gradient-to-r from-[#2ACF1C] to-[#003E81]"></div>
            <span className="flex-shrink text-sm text-[#003E81] px-4">OR</span>
            <div className="flex-grow h-px bg-gradient-to-r from-[#2ACF1C] to-[#003E81]"></div>
          </div> */}

          <div className="mt-8 flex items-center justify-center space-x-4">
            <span className="h-px w-full bg-gradient-to-r from-[#2ACF1C] to-[#003E81]"></span>
            <p className="text-sm text-[#003E81]">OR</p>
            <span className="h-px w-full bg-gradient-to-r from-[#2ACF1C] to-[#003E81]"></span>
          </div>

          <div className="mt-8">
            <p className="text-center mb-8">
              Don’t Have an Account? Join Today!
            </p>
            <Link to="/subscribe">
              <button
                className="btn-secondary rounded-xl w-full font-semibold py-2 px-4"
                type="button"
              >
                Join with Us as a Visitor
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
