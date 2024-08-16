import { IoArrowBackCircleOutline } from "react-icons/io5";
import ellipse from "../../assets/Ellipse2.png";
import contact from "../../assets/contact.png";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import { useState } from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";

const Contact = () => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  const closeModal = () => {
    setFeedbackSubmitted(null);
  };

  const navigate = useNavigate();

  return (
    <div
      className="h-full m-5"
      style={{
        backgroundImage: `url(${ellipse})`,
        backgroundSize: "80%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-between">
        <IoArrowBackCircleOutline
          className="text-3xl text-slate-950 cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <div className="m-10">
          <h1 className="text-5xl font-bold text-blue-800 pb-10">
            Get in Touch
          </h1>
          <p className="text-xl font-semibold">
            Your insights drive our improvements. Share your experience with our
            Business Continuity Management System.
          </p>
          {/* <button
            className="bg-gradient-to-r from-[#003E81] to-[#2ACF1C] 
                           hover:from-[#2ACF1C] hover:to-[#003E81] transition duration-1000 ease-in-out
                           text-white font-semibold py-2 px-4 rounded-2xl mt-8"
          >
            Contact Us
          </button> */}
        </div>

        <img src={contact} className="w-1/4 h-auto m-5" />
      </div>

      <div className="flex mx-8 border-2 border-blue-600">
        <div className="px-8 py-6 font-semibold">
          <h2>Visit us:</h2>
          <h3>At our nearest outlet: Find Mobitel Store near you</h3>
          {/*  */}
          <br />
          <h3>Email us:</h3>
          <h4>
            For Inquiries & Concerns:{" "}
            <a
              href="#"
              className="text-blue-600 underline hover:text-green-600"
            >
              info@mobitel.lk
            </a>
          </h4>
          {/*  */}
          <br />
          <h3>Mail us:</h3>
          <h4>Regarding inquiries or concerns to Manager</h4>
          {/*  */}
          <br />
          <h3>Mobitel Corporate Office</h3>
          <h4>No.148/15, Lesley RanagalaMawatha,</h4>
          <h4>Baseline Road,</h4>
          <h4>Colombo 08,</h4>
          <h4>Sri Lanka.</h4>
          {/*  */}
          <br />
          <h3>Call us:</h3>
          <h4>
            24 Hour Customer Service-Hotline :
            <span className="text-blue-600"> +94 (0)712755777</span> or dial
            <span className="text-blue-600"> 1717 </span>
            from any network in Sri Lanka
          </h4>
          <h4>For Sinhala : Press1</h4>
          <h4>For Tamil : Press2</h4>
          <h4>For English : Press3</h4>
          <h4>
            24 Hour Roaming Service Hotline :
            <span className="text-blue-600"> +94 (0) 714555555</span>
          </h4>
          <h4>
            General Line :
            <span className="text-blue-600"> +94 (0) 112330550</span>
          </h4>
          <h4>(9.00 am to 5.00 pm) Weekdays</h4>

          {/*  */}
          <br />
          <h3>Service Difficulties?</h3>
          <a href="#" className="text-blue-600 underline hover:text-green-600">
            Click Here
          </a>
          {/*  */}
        </div>

        <div className="m-auto rounded-xl p-10 border-2">
          <h1 className="text-2xl font-bold mb-8 text-center text-black">
            Contact Us
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="relative mb-7 bg-gradient-to-r from-[#2ACF1C] to-[#003E81] opacity-70 p-0.5 rounded-lg shadow-lg">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
              <input
                className="shadow appearance-none border rounded-md w-full py-2 px-10 text-gray-700 leading-tight focus:outline-white"
                id="fullName"
                type="text"
                placeholder="Name"
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
              />
            </div>

            {/* <div className="mb-7 p-0.5 rounded-lg shadow-lg"> */}
            <textarea
              className="shadow appearance-none border rounded-md w-full py-2 px-10 text-gray-700 leading-tight focus:outline-white"
              id="phone"
              type="text"
              placeholder="Message"
            />

            {/* Subscribe Button */}
            <div className="mt-8 flex justify-center">
              <button
                className="bg-gradient-to-r from-[#003E81] to-[#2ACF1C] 
                           hover:from-[#2ACF1C] hover:to-[#003E81] transition duration-1000 ease-in-out
                           w-1/2 text-white font-semibold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Contact Us
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
            isOpen={feedbackSubmitted}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
              },
            }}
            contentLabel="Feedback Submitted"
            className="max-w-xl h-auto bg-white rounded-md mx-auto my-36 shadow-lg"
          >
            <div className="relative">
              <MdClose
                className="text-2xl text-slate-950 absolute top-2 right-2 hover:bg-red-400 rounded-full cursor-pointer"
                onClick={() => {
                  setFeedbackSubmitted(false);
                  closeModal();
                }}
              />
            </div>

            <div className="flex items-center p-6">
              <FaCheckCircle className="text-3xl mr-10 text-green-500" />
              <div className="text-center mr-12">
                <h3 className="text-xl font-bold mb-2">
                  Thank you for reaching out!
                </h3>
                <p className="font-semibold text-lg">
                  We've received your message and will get back to you as soon
                  as possible
                </p>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
