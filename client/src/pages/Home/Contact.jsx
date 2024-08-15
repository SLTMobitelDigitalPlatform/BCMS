import { IoArrowBackCircleOutline } from "react-icons/io5";
import ellipse from "../../assets/Ellipse2.png";
import contact from "../../assets/contact.png";
import { useNavigate } from "react-router-dom";

const Contact = () => {
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

        <div className="mx-20 my-10">
          <h1 className="text-5xl font-bold text-blue-800 pb-10">
            Get in Touch
          </h1>
          <p className="text-xl font-semibold">
            Your insights drive our improvements. Share your experience with our
            Business Continuity Management System.
          </p>
          <button
            className="bg-gradient-to-r from-[#003E81] to-[#2ACF1C] 
                           hover:from-[#2ACF1C] hover:to-[#003E81] transition duration-1000 ease-in-out
                           text-white font-semibold py-2 px-4 rounded-2xl mt-8"
          >
            Contact Us
          </button>
        </div>

        <img src={contact} className="w-1/4 h-auto m-5" />
      </div>

      <div className="mx-10 px-16 py-5 font-semibold border-2 border-blue-600">
        {/*  */}
        <h2>Visit us:</h2>
        <h3>At our nearest outlet: Find Mobitel Store near you</h3>
        {/*  */}
        <br />
        <h3>Email us:</h3>
        <h4>
          For Inquiries & Concerns:{" "}
          <a href="#" className="text-blue-600 underline hover:text-green-600">
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
    </div>
  );
};

export default Contact;
