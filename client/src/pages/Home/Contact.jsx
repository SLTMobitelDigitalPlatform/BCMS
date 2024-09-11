import { IoArrowBackCircleOutline } from "react-icons/io5";
import ellipse from "../../assets/Ellipse2.png";
import contact from "../../assets/contact.png";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEnvelope, FaPhone, FaUser} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useState } from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";

const Contact = () => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setFeedbackSubmitted(true);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.phone.match(/^07[0-9]{8}$/)) {
      errors.phone = "Enter a valid mobile number (e.g., 0712345678)";
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Enter a valid email address";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    return errors;
  };

  const closeModal = () => {
    setFeedbackSubmitted(null);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "", 
    }));
  };

  return (
    <div
      className="h-full m-5"
      // style={{
      //   backgroundImage: `url(${ellipse})`,
      //   backgroundSize: "80%",
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "center",
      // }}
    >

      <div className="flex justify-between items-center">
        {/* Back arrow icon for navigation */}
        <IoArrowBackCircleOutline
          className="text-3xl text-slate-950 cursor-pointer"
          onClick={() => navigate(-1)}
        />

        {/* Heading*/}
        <div className="flex-grow text-center m-10">
          <h1 className="text-5xl font-bold text-blue-800">
            Get in Touch
          </h1>
        </div>

        <div className="w-8"></div> 

      </div>

      <div className="px-10 py-6 flex justify-center space-x-6 md:space-x-12 lg:space-x-24 xl:space-x-48">

        {/* First Container */}
        <div >
          <h3 className="font-semibold text-xl">PHONE</h3>
          <br />
          <h4 className="text-sm">
            24 Hour Customer Service-Hotline :
            <br />
            <a href="tel:+94712755777" className="text-blue-600 hover:text-green-600"> +94 712755777</a> or dial
            <a href="tel:1717" className="text-blue-600 hover:text-green-600"> 1717 </a>
            <br />
            from any network in Sri Lanka
          </h4>
          <h4 className="text-sm">For Sinhala : Press1</h4>
          <h4 className="text-sm">For Tamil : Press2</h4>
          <h4 className="text-sm">For English : Press3</h4>
          <br />
          <h4 className="text-sm">
            24 Hour Roaming Service Hotline :
            <br />
            <a href="tel:+94714555555" className="text-blue-600 hover:text-green-600"> +94 714555555</a>
          </h4>
          <h4 className="text-sm">
            General Line :
            <a href="tel:+94714555555" className="text-blue-600 hover:text-green-600"> +94 714555555</a>
          </h4>
        </div>

        {/* Second Container */}
        <div >
          <h3 className="font-semibold text-xl">GENERAL INQUIRIES</h3>
          <br />
          <h4 className="text-sm">Mobitel Corporate Office</h4>
          <h4 className="text-sm">No.148/15, Lesley RanagalaMawatha,</h4>
          <h4 className="text-sm">Baseline Road,</h4>
          <h4 className="text-sm">Colombo 08,</h4>
          <h4 className="text-sm">Sri Lanka.</h4>
          <br />
          <a
            href="mailto:info@mobitel.lk"
            className="text-blue-600 hover:text-green-600 text-sm"
          >
            <em>info@mobitel.lk</em>
          </a>
        </div>

        {/* Third Container */}
        <div >
          <h3 className="font-semibold text-xl">HOURS OF OPERATION</h3>

          <br />
          <h4 className="text-sm">9.00 am to 5.00 pm (Weekdays)</h4>

          <br />
          <h4 className="text-sm">Visit us at our nearest outlet:</h4>
          <h4 className="text-sm">
            <a
              href="https://www.mobitel.lk/store-find"
              className="text-blue-600 hover:text-green-600"
            >
              <em>Find Mobitel Store</em>
            </a>
            &nbsp;near you
          </h4>

          <br />
          <h4 className="text-sm">Service Difficulties?</h4>
          <a href="#" className="text-blue-600 underline hover:text-green-600 text-sm">
            <em> Click Here</em>
          </a>
        </div>

      </div>

      <div className="my-12 mx-40 rounded-xl border-2 bg-gradient-to-r from-[#2ACF1C] to-[#003E81]">
        <div className="m-0.5 rounded-lg pt-10 px-14 bg-white bg-opacity-95"
             style={{
                backgroundImage: `url(${contact})`,
                backgroundSize: "20%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom right",
              }}
        >

          <h1 className="text-2xl font-medium mb-3 text-center text-black">
            CONTACT FORM
          </h1>

          <p className="mb-5 text-md text-center text-black text-opacity-70">
            Your insights drive our improvements. Share your experience with our
            Business Continuity Management System.
            <br/><br/>
          </p>

          <form onSubmit={handleSubmit}>

            <div className="flex space-x-6">
              {/* Name */}
              <div className="relative mb-5 p-0.5 rounded-lg w-1/2">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 opacity-80" />
                <input
                  className="shadow appearance-none border rounded-md w-full py-2 px-10 text-gray-700 leading-tight focus:outline-white"
                  id="fullName"
                  type="text"
                  placeholder="Name"
                  

                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/*Phone*/}
              <div className="relative mb-5 p-0.5 rounded-lg w-1/2">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 opacity-80" />
                <input
                  className="shadow appearance-none border rounded-md w-full py-2 px-10 text-gray-700 leading-tight focus:outline-white"
                  id="phone"
                  type="tel"
                  placeholder="Mobile Number"
                  pattern="07[0-9]{8}"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative mb-5 p-0.5 rounded-lg">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 opacity-80" />
                <input
                  className="shadow appearance-none border rounded-md w-full py-2 px-10 text-gray-700 leading-tight focus:outline-white"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
            </div>

            {/*Message*/}
            <div className="relative mb-5 p-0.5 rounded-lg ">
              <FaMessage className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-700 opacity-80" />
              <textarea
                className="shadow appearance-none border rounded-md w-full py-2 px-10 text-gray-700 leading-tight focus:outline-white"
                id="message"
                type="text"
                placeholder="Message"
              />
            </div>

            {/* Send Button */}
            <div className="mt-8 pb-28 flex justify-right">
              <button
                className="bg-gradient-to-r from-[#003E81] to-[#2ACF1C] 
                            hover:from-[#2ACF1C] hover:to-[#003E81] transition duration-1000 ease-in-out
                            w-2/12 h-8 text-white rounded-lg focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Send
              </button>
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
              <FaCheckCircle className="text-5xl mr-10 mb-20 text-green-500" />
              <div className="text-center mr-12">
                <h3 className="text-xl font-semibold mb-2">
                  Thank you for reaching out!
                </h3><br/>
                <p className="text-lg">
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