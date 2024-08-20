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
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "../../assets/bgblue.png";
import bgInside from "../../assets/Ellipse2.png";

const SubscriptionForm = () => {
  const [subscribed, setSubscribed] = useState(false);

  const [unsubscribed, setUnsubscribed] = useState(false);
  const [unsubEmail, setUnsubEmail] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [province, setProvince] = useState("");
  const [company, setCompany] = useState("");
  const [subPreference, setSubPreference] = useState("");
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      // setError("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      setError("Please enter a valid email address.");
      return;
    }

    if (!validateContactNumber(contactNumber)) {
      toast.error("Please enter a valid contact number.");
      // setError("Please enter a valid contact number.");
      return;
    }

    if (!province || province === "Select Province") {
      toast.error("Please select a province.");
      // setError("Please select a province.");
      return;
    }

    if (!company.trim()) {
      toast.error("Please enter your company name.");
      // setError("Please enter your company name.");
      return;
    }

    if (subPreference.length === 0) {
      toast.error("Please select at least one subscription preference.");
      // setError("Please select at least one subscription preference.");
      return;
    }

    if (!isPrivacyPolicyChecked) {
      toast.error("Please agree to the Privacy Policy and Terms of Service.");
      // setError("Please agree to the Privacy Policy and Terms of Service.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/customer/register",
        {
          name,
          email,
          contactNumber,
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

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  };

  const validateContactNumber = (contactNumber) => {
    const regex = /^(\+94|0)?7\d{8}$/;
    return regex.test(contactNumber);
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();

    if (!validateEmail(unsubEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

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
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Form Container */}
      <div className="bg-white p-10 rounded-lg w-3/5 m-10">
        <h1 className="text-2xl font-bold mb-8 text-center text-black">
          Subscribe with Us
        </h1>
        <p className="text-lg font-semibold mb-4 text-left text-black">
          Welcome to Our BCMS Updates and Notifications Subscription Page!
        </p>
        <p className="text-lg font-normal mb-10 text-left text-black">
          Stay informed about the latest updates, changes, and important
          notifications related to our Business Continuity Management System
          (BCMS). By subscribing, you will receive timely information to keep
          you prepared and informed.
        </p>

        <div className="mb-5 border-2 rounded-xl p-0.5 bg-gradient-to-r from-[#2ACF1C] to-[#003E81]">
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-lg p-10 bg-white"
            style={{
              backgroundImage: `url(${bgInside})`,
              backgroundSize: "90%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <h1 className="text-2xl font-bold mb-10 text-center text-black">
              Subscription Form
            </h1>

            {/* Full Name */}
            {/* <div className="relative mb-7 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] p-0.5 rounded-lg shadow-lg"> */}
            <div className="relative mb-7 rounded-lg">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                className="shadow appearance-none rounded-md w-full h-full py-2 px-10 border-2 border-blue-500 leading-tight focus:outline-green-500"
                id="fullName"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* </div> */}

            {/* Email */}
            <div className="relative mb-7 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] p-0.5 rounded-lg shadow-lg">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                className="shadow appearance-none border rounded-md w-full h-full py-2 px-10 leading-tight focus:outline-white"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/*phone*/}
            <div className="relative mb-7 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] p-0.5 rounded-lg shadow-lg">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                className="shadow appearance-none border rounded-md w-full h-full py-2 px-10 leading-tight focus:outline-white"
                id="phone"
                type="tel"
                placeholder="Mobile Number"
                // pattern="07[0-9]{8}"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>

            {/* Province */}
            <div className="relative mb-7 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] p-0.5 rounded-lg shadow-lg">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              {/* <input
                  className="shadow appearance-none border rounded-md w-full h-full py-2 px-10 leading-tight focus:outline-white"
                  id="province"
                  type="text"
                  placeholder="Province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                /> */}
              <select
                className="shadow appearance-none border rounded-md w-full h-full py-2 px-10 leading-tight focus:outline-white"
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
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
            <div className="relative mb-7 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] p-0.5 rounded-lg shadow-lg">
              <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                className="shadow appearance-none border rounded-md w-full h-full py-2 px-10 leading-tight focus:outline-white"
                id="company"
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {/* Subscription Preference */}
            <div className="mb-7">
              <label className="block font-bold mb-5">
                Subscription Preference:
              </label>

              {/* General Updates */}
              <div className="flex items-center mb-2 ml-7">
                <input
                  type="checkbox"
                  id="generalUpdates"
                  name="subscriptionPreference"
                  value="generalUpdates"
                  className="mr-2 leading-tight h-6 w-6"
                  // style={{
                  //   accentColor: "#003E81",
                  // }}
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
              <div className="flex items-center mb-2 ml-7">
                <input
                  type="checkbox"
                  id="emergencyNotification"
                  name="subscriptionPreference"
                  value="emergencyNotification"
                  className="mr-2 leading-tight  h-6 w-6"
                  // style={{
                  //   accentColor: "#003E81",
                  // }}
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

              {/* Other */}

              <div className="relative mb-7 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] p-0.5 rounded-lg shadow-lg ml-7 w-4/5">
                <input
                  className="shadow appearance-none border rounded-md w-full h-full p-2 leading-tight focus:outline-white"
                  id="otherPreference"
                  type="text"
                  placeholder="Specify other preference..."
                  value={subPreference}
                  onChange={(e) => setSubPreference(e.target.value)}
                />
              </div>

              {/* <div className="flex items-center ml-7">
                <input
                  type="checkbox"
                  id="other"
                  name="subscriptionPreference"
                  value="other"
                  className="mr-2 leading-tight h-6 w-6"
                  style={{
                    accentColor: "#003E81",
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSubPreference((prev) =>
                      prev.includes(value)
                        ? prev.filter((v) => v !== value)
                        : [...prev, value]
                    );
                  }}
                />
                <label htmlFor="other" className=">
                  Other
                </label>
              </div> */}
            </div>

            {/* Privacy Policy*/}
            <div className="mb-8">
              <label className="block font-bold mb-5">
                Consent and Privacy Information:
              </label>

              <div className="flex items-center mb-5 ">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  name="privacyPolicy"
                  value="privacyPolicy"
                  className="mr-2 leading-tight h-6 w-6"
                  onChange={(e) => setIsPrivacyPolicyChecked(e.target.checked)}
                  // required
                  // style={{
                  //   accentColor: "#003E81",
                  // }}
                  // onChange={(e) => {
                  //   const value = e.target.value;
                  //   setSubPreference((prev) =>
                  //     prev.includes(value)
                  //       ? prev.filter((v) => v !== value)
                  //       : [...prev, value]
                  //   );
                  // }}
                />

                <label htmlFor="privacyPolicy">
                  I agree to the
                  <a
                    href="/privacy-policy"
                    className="text-blue-700 hover:text-green-500"
                  >
                    {" "}
                    Privacy Policy
                  </a>{" "}
                  and
                  <a
                    href="/terms-of-service"
                    className="text-blue-700 hover:text-green-500"
                  >
                    {" "}
                    Terms of Service
                  </a>
                  .
                </label>
              </div>
            </div>

            {/* {error && <p className="text-red-500 text-center pb-2">{error}</p>} */}

            {/* Subscribe Button */}
            <div className="mb-1 flex justify-center">
              <button
                className="bg-gradient-to-r from-[#003E81] to-[#2ACF1C] 
                           hover:from-[#2ACF1C] hover:to-[#003E81] transition duration-1000 ease-in-out
                           w-1/4 text-white font-semibold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
            {/* <div className="flex justify-center">
              <button
                className="hover:text-blue-500"
                onClick={openUnsubscriptionModal}
              >
                Need to Unsubscribe?
              </button>
            </div> */}
          </form>

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
                className="flex flex-col items-center space-y-6 my-5 mx-12"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Unsubscribe from Notifications
                </h3>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg focus:outline-none"
                  value={unsubEmail}
                  onChange={(e) => setUnsubEmail(e.target.value)}
                />
                {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
                <button
                  // type="submit"
                  className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-700"
                  // onClick={closeUnsubscriptionModal}
                >
                  Unsubscribe
                </button>
              </form>
            </div>
          </Modal>
        </div>

        {/* Unsubscribe Link */}
        <div className="flex justify-center">
          <button
            className="hover:text-blue-500"
            onClick={openUnsubscriptionModal}
          >
            Need to Unsubscribe?
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SubscriptionForm;

// setError("There was an error with your subscription");
// toast.error("There was an error with your subscription");
