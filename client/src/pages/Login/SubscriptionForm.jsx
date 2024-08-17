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
import bgInside from "../../assets/bg-subscriptionFormInside.png";

const SubscriptionForm = () => {
  const [subscribed, setSubscribed] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [province, setProvince] = useState("");
  const [company, setCompany] = useState("");
  const [subPreference, setSubPreference] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/register", {
        name,
        email,
        contactNumber,
        province,
        company,
        subPreference,
      });
      console.log(response);

      // toast.success("Subscription successful!");
      setSubscribed(true);
    } catch (error) {
      setError("There was an error with your subscription");
      toast.error("There was an error with your subscription");
    }
  };

  const closeModal = () => {
    setSubscribed(null);
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
      {/* <div
        className="w-2/3 flex flex-col items-center rounded-lg shadow-lg overflow-hidden"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      > */}
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
            className="w-full rounded-lg p-10 "
            style={{
              backgroundImage: `url(${bgInside})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className="text-2xl font-bold mb-10 text-center text-black">
              Subscription Form
            </h1>

            {/* Full Name */}
            <div className="relative mb-7 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] opacity-70 p-0.5 rounded-lg shadow-lg">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
              <input
                className="shadow appearance-none border rounded-md w-full py-2 px-10 text-gray-700 leading-tight focus:outline-white"
                id="fullName"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="relative mb-7 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] opacity-70 p-0.5 rounded-lg shadow-lg">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
              <input
                className="shadow appearance-none border rounded-md w-full py-2 px-10 text-gray-700 leading-tight focus:outline-white"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/*phone*/}
            <div className="relative mb-7 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] opacity-70 p-0.5 rounded-lg shadow-lg">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
              <input
                className="shadow appearance-none border rounded-md w-full py-2 px-10 text-gray-700 leading-tight focus:outline-white"
                id="phone"
                type="tel"
                placeholder="Mobile Number"
                pattern="07[0-9]{8}"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>

            {/* Province */}
            <div className="relative mb-7 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] opacity-70 p-0.5 rounded-lg shadow-lg">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
              {/* <input
                  className="shadow appearance-none border rounded-md w-full py-2 px-10 text-gray-700 leading-tight focus:outline-white"
                  id="province"
                  type="text"
                  placeholder="Province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                /> */}
              <select
                className="shadow appearance-none border rounded-md w-full py-2 px-10 text-gray-700 leading-tight focus:outline-white"
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
            <div className="relative mb-10 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] opacity-70 p-0.5 rounded-lg shadow-lg">
              <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
              <input
                className="shadow appearance-none border rounded-md w-full py-2 px-10 text-gray-700 leading-tight focus:outline-white"
                id="company"
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {/* Subscription Preference */}
            <div className="mb-7">
              <label className="block text-gray-700 font-bold mb-5">
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
                <label htmlFor="generalUpdates" className="text-gray-700">
                  General Updates
                </label>
              </div>

              {/* Emergency Notification */}
              <div className="flex items-center mb-2 ml-7">
                <input
                  type="checkbox"
                  id="emergencyNotification"
                  name="subscriptionPreference"
                  value="emergencyNotification"
                  className="mr-2 leading-tight  h-6 w-6"
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
                <label
                  htmlFor="emergencyNotification"
                  className="text-gray-700"
                >
                  Emergency Notification
                </label>
              </div>

              {/* Other */}
              <div className="flex items-center ml-7">
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
                <label htmlFor="other" className="text-gray-700">
                  Other
                </label>
              </div>
            </div>

            {/* Privacy Policy*/}
            <div className="mb-10">
              <label className="block text-gray-700 font-bold mb-5">
                Consent and Privacy Information:
              </label>

              <div className="flex items-center mb-5 ">
                <input
                  type="checkbox"
                  id="generalUpdates"
                  name="subscriptionPreference"
                  value="generalUpdates"
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

                <label htmlFor="generalUpdates" className="text-gray-700">
                  I agree to the
                  <a
                    href="/privacy-policy"
                    className="text-blue-700 hover:text-[#2ACF1C]"
                  >
                    {" "}
                    Privacy Policy
                  </a>{" "}
                  and
                  <a
                    href="/terms-of-service"
                    className="text-blue-700 hover:text-[#2ACF1C]"
                  >
                    {" "}
                    Terms of Service
                  </a>
                  .
                </label>
              </div>
            </div>

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

            {/* Unsubscribe Link */}
            <div className="flex justify-center">
              {/* <a
                  href="/unsubscribe"
                  className="text-gray-700 hover:text-[#2ACF1C] italic text-sm"
                >
                  Need to Unsubscribe?
                </a> */}
            </div>
          </form>

          <Modal
            isOpen={subscribed}
            contentLabel="Feedback Submitted"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl">
              {/* Close Button */}
              <MdClose
                className="text-2xl text-slate-950 absolute top-2 right-2 hover:bg-red-400 rounded-full cursor-pointer"
                onClick={() => {
                  setSubscribed(false);
                  navigate("/");
                  closeModal();
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
        </div>
      </div>
      {/* </div> */}
      <ToastContainer />
    </div>
  );
};

export default SubscriptionForm;
