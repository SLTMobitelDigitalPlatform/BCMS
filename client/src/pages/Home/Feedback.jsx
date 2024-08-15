import { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import Modal from "react-modal";
import ellipse from "../../assets/Ellipse2.png";

const Feedback = () => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  const closeModal = () => {
    setFeedbackSubmitted(null);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${ellipse})`,
        backgroundSize: "80%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* <div className="relative">
        <MdClose
          className="text-2xl text-slate-950 absolute top-0 right-0 hover:bg-red-300 rounded-full cursor-pointer"
          onClick={() => closeModal()}
        />
      </div> */}
      <h2 className="text-2xl font-semibold mb-10 text-center">
        Feedback Form
      </h2>
      <div className="w-full max-w-4xl mt-3 mx-auto flex flex-col  px-4 py-2 border-2 border-blue-500 rounded-lg">
        <form onSubmit={handleSubmit} className="p-8">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border-2 border-blue-500 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border-2 border-blue-500 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Subject</label>
            <input
              type="text"
              className="w-full px-3 py-2 border-2 border-blue-500 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              className="w-full px-3 py-2 border-2 border-blue-500 rounded-md"
              rows="4"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-10 flex justify-center">
            <button
              className="bg-gradient-to-r from-[#003E81] to-[#2ACF1C]
                       hover:from-[#2ACF1C] hover:to-[#003E81] transition duration-1000 ease-in-out
                        w-1/4 text-white font-semibold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
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
          className="max-w-md h-20 bg-white rounded-md mx-auto my-36 shadow-lg"
        >
          <div className="relative">
            <MdClose
              className="text-2xl text-slate-950 absolute top-2 right-2 hover:bg-red-300 rounded-full cursor-pointer"
              onClick={() => {
                setFeedbackSubmitted(false);
                closeModal();
              }}
            />
          </div>

          <div className="flex items-center p-6">
            <FaCheckCircle className="text-3xl mr-12 text-green-500" />
            <h3 className="text-lg font-semibold">
              Feedback Successfully Submitted
            </h3>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Feedback;
