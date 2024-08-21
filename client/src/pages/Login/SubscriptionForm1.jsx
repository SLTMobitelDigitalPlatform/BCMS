import axios from "axios";
import { useState } from "react";
import {
  FaBuilding,
  FaCheckCircle,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "../../assets/bgblue.png";
import ellipse from "../../assets/Ellipse2.png";
import { validateEmail, validateMobileNumber } from "../../utilities/helper";

const SubscriptionForm1 = () => {
  const [subscribed, setSubscribed] = useState(false);

  const [unsubscribed, setUnsubscribed] = useState(false);
  const [unsubEmail, setUnsubEmail] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [province, setProvince] = useState("");
  const [company, setCompany] = useState("");
  const [subPreference, setSubPreference] = useState("");
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);

  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [hasNoSubEmail, setHasNoSubEmail] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setHasError(true);
      toast.error("Please enter your name.");
      return;
    }
    setHasError(false);

    if (!validateEmail(email)) {
      setHasError(true);
      toast.error("Please enter a valid email address.");
      setError("Please enter a valid email address.");
      return;
    }
    setHasError(false);

    if (!validateMobileNumber(mobileNumber)) {
      setHasError(true);
      toast.error("Please enter a valid mobile number.");
      return;
    }
    setHasError(false);

    if (!province || province === "Select Province") {
      setHasError(true);
      toast.error("Please select a province.");
      return;
    }
    setHasError(false);

    if (!company.trim()) {
      setHasError(true);
      toast.error("Please enter your company name.");
      return;
    }
    setHasError(false);

    if (subPreference.length === 0) {
      toast.error("Please select at least one subscription preference.");
      return;
    }

    if (!isPrivacyPolicyChecked) {
      toast.error("Please agree to the Privacy Policy and Terms of Service.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/customer/register",
        {
          name,
          email,
          mobileNumber,
          province,
          company,
          subPreference,
        }
      );
      console.log(response);
      toast.success(response);
      setSubscribed(true);
      setError("");
    } catch (error) {
      toast.error(error);
      console.log(error);
      setError("There was an error with your subscription");
    }
  };

  // const validateEmail = (email) => {
  //   const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  //   return regex.test(email);
  // };

  // const validateMobileNumber = (mobileNumber) => {
  //   const regex = /^(\+94|0)?7\d{8}$/;
  //   return regex.test(mobileNumber);
  // };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();

    if (!validateEmail(unsubEmail)) {
      setHasNoSubEmail(true);
      setError("Please enter a valid email address to unsubscribe.");
      return;
    }
    setHasNoSubEmail(false);

    try {
      const response = await axios.delete(
        "http://localhost:5000/customer/delete",
        { data: { email: unsubEmail } }
      );

      if (response.status === 200) {
        console.log("Unsubscribed successfully");
        setError("");
        closeUnsubscriptionModal();
        toast.success(`${unsubEmail} unsubscribed successfully!`);
      } else {
        console.error("Failed to unsubscribe");
        setError("Failed to unsubscribe");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("There was an error unsubscribing");
    }
  };

  const closeSubscriptionModal = () => {
    setSubscribed(false);
  };

  const openUnsubscriptionModal = () => {
    setUnsubscribed(true);
  };

  const closeUnsubscriptionModal = () => {
    setUnsubEmail("");
    setUnsubscribed(false);
  };

  return (
    <div
      className="flex justify-center min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Form Container */}
      <div className="bg-white rounded-lg w-full m-4 max-w-2xl py-5 px-8 space-y-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Subscribe with Us
        </h1>
        <p className="text-lg font-medium text-center text-gray-700">
          Welcome to Our BCMS Updates and Notifications Subscription Page!
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg py-4 px-8 shadow-md space-y-5"
          style={{
            backgroundImage: `url(${ellipse})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {/* Full Name */}
          <div className="relative">
            <FaUser className="icon" />
            <input
              className={` input-field ${
                hasError && !name.trim()
                  ? "input-field-error"
                  : "input-field-border"
              } `}
              id="fullName"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setHasError(false)}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="icon" />
            <input
              className={`input-field ${
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

          {/*Mobile Phone*/}
          <div className="relative">
            <FaPhone className="icon" />
            <input
              className={`input-field ${
                hasError && !validateMobileNumber(mobileNumber)
                  ? "input-field-error"
                  : "input-field-border"
              } `}
              id="phone"
              type="tel"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              onFocus={() => setHasError(false)}
            />
          </div>

          {/* Province */}
          <div className="relative">
            <FaMapMarkerAlt className="icon" />

            <select
              className={`input-field ${
                hasError && !province
                  ? "input-field-error"
                  : "input-field-border"
              } `}
              id="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              onFocus={() => setHasError(false)}
            >
              <option value="" disabled>
                Select Province
              </option>
              <option value="Central">Central</option>
              <option value="Eastern">Eastern</option>
              <option value="Northern">Northern</option>
              <option value="North Central">North Central</option>
              <option value="North Western">North Western</option>
              <option value="Sabaragamuwa">Sabaragamuwa</option>
              <option value="Southern">Southern</option>
              <option value="Uva">Uva</option>
              <option value="Western">Western</option>
            </select>
          </div>

          {/* Company */}
          <div className="relative">
            <FaBuilding className="icon" />
            <input
              className={`input-field ${
                hasError && !company
                  ? "input-field-error"
                  : "input-field-border"
              } `}
              id="company"
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onFocus={() => setHasError(false)}
            />
          </div>

          {/* Subscription Preference */}
          <div className="">
            <label className="font-semibold block">
              Subscription Preference:
            </label>

            <div className="flex flex-wrap gap-20">
              {/* General Updates */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="generalUpdates"
                  name="subscriptionPreference"
                  value="generalUpdates"
                  className="checkbox"
                  onChange={(e) => {
                    const value = e.target.value;
                    setSubPreference((prev) =>
                      prev.includes(value)
                        ? prev.filter((v) => v !== value)
                        : [...prev, value]
                    );
                  }}
                />
                <label htmlFor="generalUpdates">General Updates</label>
              </div>

              {/* Emergency Notification */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="emergencyNotification"
                  name="subscriptionPreference"
                  value="emergencyNotification"
                  className="checkbox"
                  onChange={(e) => {
                    const value = e.target.value;
                    setSubPreference((prev) =>
                      prev.includes(value)
                        ? prev.filter((v) => v !== value)
                        : [...prev, value]
                    );
                  }}
                />
                <label htmlFor="emergencyNotification">
                  Emergency Notification
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Policy*/}
          <div className="">
            <label className="block font-semibold">
              Consent and Privacy Information:
            </label>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="privacyPolicy"
                name="privacyPolicy"
                value="privacyPolicy"
                className="checkbox"
                onChange={(e) => setIsPrivacyPolicyChecked(e.target.checked)}
              />

              <label htmlFor="privacyPolicy">
                I agree to the
                <Link
                  to="/privacy-policy"
                  className="text-blue-700 hover:text-green-500"
                >
                  {" "}
                  Privacy Policy{" "}
                </Link>
                and
                <Link
                  to="/terms-of-service"
                  className="text-blue-700 hover:text-green-500"
                >
                  {" "}
                  Terms of Service
                </Link>
                .
              </label>
            </div>
          </div>

          {/* Subscribe Button */}
          <div className="flex justify-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-full"
              //   type="submit"
            >
              Subscribe
            </button>
          </div>
        </form>

        {/* Unsubscribe Link */}
        <div className="flex justify-center">
          <button
            className="text-blue-500 hover:text-green-500"
            onClick={openUnsubscriptionModal}
          >
            Need to Unsubscribe?
          </button>
        </div>
      </div>

      {/* Modal for subscribing */}
      <Modal
        isOpen={subscribed}
        contentLabel="Subscription Submitted"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl">
          {/* Close Button */}
          <MdClose
            className="text-2xl text-slate-950 absolute top-2 right-2 hover:bg-red-400 rounded-full cursor-pointer"
            onClick={() => {
              // setSubscribed(false);
              closeSubscriptionModal();
              navigate("/");
            }}
          />

          {/* Content */}
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-3xl mb-4 text-green-500" />
            <h3 className="text-lg font-bold mb-4">
              Thank You for Subscribing!
            </h3>
            <p className="text-center font-semibold">
              You will now receive updates and notifications related to our
              BCMS.
            </p>
          </div>
        </div>
      </Modal>

      {/* Modal for unsubscribing */}
      <Modal
        isOpen={unsubscribed}
        ariaHideApp={false}
        contentLabel="Subscription Terminated"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl">
          {/* Close Button */}
          <MdClose
            className="text-2xl text-slate-950 absolute top-2 right-2 hover:bg-red-400 rounded-full cursor-pointer"
            onClick={() => {
              closeUnsubscriptionModal();
            }}
          />

          {/* Content */}
          <form
            onSubmit={handleUnsubscribe}
            className="flex flex-col items-center space-y-3 my-4 mx-12"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Unsubscribe from Notifications
            </h3>
            {/* Email */}

            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition duration-200 ${
                hasNoSubEmail && !validateEmail(unsubEmail)
                  ? "input-field-error"
                  : "input-field-border"
              } `}
              value={unsubEmail}
              onChange={(e) => setUnsubEmail(e.target.value)}
              onFocus={() => setHasNoSubEmail(false)}
            />
            {hasNoSubEmail && <p className="text-red-500">{error}</p>}
            <button className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-700">
              Unsubscribe
            </button>
          </form>
        </div>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default SubscriptionForm1;
