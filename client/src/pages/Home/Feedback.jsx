import { useState } from "react";
import { MdChat, MdClose, MdTopic } from "react-icons/md";
import { FaCheckCircle, FaEnvelope, FaUser } from "react-icons/fa";
import Modal from "react-modal";
import ellipse from "../../assets/Ellipse.png";
import feedback from "../../assets/feedback.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      const data = await response.json();
      console.log(data.message);
      setFeedbackSubmitted(true);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  const closeModal = () => {
    setFeedbackSubmitted(null);
  };

  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${ellipse})`,
        backgroundSize: "60%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="pt-5 pl-5">
        <IoArrowBackCircleOutline
          className="text-3xl text-slate-950 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="flex flex-1">
        <div className="w-full md:w-1/2 flex flex-col p-12">
          <h1 className="text-4xl md:text-5xl text-blue-800 font-bold mb-4">
            Cutomer Feedback
          </h1>

          <p className="text-xl font-semibold mb-4">
            Your insights drive our improvements. Share your experience with our
            Business Continuity Management System.
          </p>

          <img
            src={feedback}
            alt="Feedback"
            className="w-full md:w-8/12 m-auto"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col p-12">
          <h2 className="text-2xl text-center font-bold mb-4">Feedback Form</h2>

          <div className="border-2 border-gray-300 rounded-md">
            <form onSubmit={handleSubmit} className="p-10 space-y-4">
              {/* Name */}
              <div className="relative mb-5">
                <FaUser className="text-2xl absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  className="w-full pl-14 py-2 border-2 border-blue-500 rounded-md"
                  placeholder="Name"
                  // required
                />
              </div>

              {/* Email */}
              <div className="relative mb-4">
                <FaEnvelope className="text-2xl absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  className="w-full pl-14 py-2 border-2 border-blue-500 rounded-md"
                  placeholder="Email"
                  // required
                />
              </div>

              {/* Subject */}
              <div className="relative mb-4">
                <MdTopic className="text-2xl absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  className="w-full pl-14 py-2 border-2 border-blue-500 rounded-md"
                  placeholder="Subject"
                  // required
                />
              </div>

              {/* Message */}
              <div className="relative mb-4">
                <MdChat className="text-2xl absolute left-3 top-6 transform -translate-y-1/2" />
                <textarea
                  className="w-full pl-14 py-2 border-2 border-blue-500 rounded-md"
                  rows="4"
                  placeholder="Message"
                  // required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center p-4">
                <button
                  className="bg-gradient-to-r from-[#003E81] to-[#2ACF1C]
                  hover:from-[#2ACF1C] hover:to-[#003E81] transition duration-1000 ease-in-out
                   w-full md:w-1/4 text-white font-semibold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>

            <Modal
              isOpen={feedbackSubmitted}
              contentLabel="Feedback Submitted"
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
              <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
                {/* Close Button */}
                <MdClose
                  className="text-2xl text-slate-950 absolute top-2 right-2 hover:bg-red-400 rounded-full cursor-pointer"
                  onClick={() => {
                    setFeedbackSubmitted(false);
                    closeModal();
                  }}
                />

                {/* Content */}
                <div className="flex flex-col items-center">
                  <FaCheckCircle className="text-3xl mb-4 text-green-500" />
                  <h3 className="text-lg font-bold">
                    Feedback Successfully Submitted!
                  </h3>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

{
  /* <div className="relative">
                <MdClose
                  className="text-2xl text-slate-950 absolute top-2 right-2 hover:bg-red-400 rounded-full cursor-pointer"
                  onClick={() => {
                    setFeedbackSubmitted(false);
                    closeModal();
                  }}
                />
              </div>

              <div className="flex items-center p-6">
                <FaCheckCircle className="text-3xl mr-12 text-green-500" />
                <h3 className="text-lg font-bold mx-auto">
                  Feedback Successfully Submitted !
                </h3>
              </div> */
}
