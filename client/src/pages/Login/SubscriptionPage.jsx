import { Link } from "react-router-dom";
import logo from "../../assets/SLTLogo.png";
import backgroundImage from "../../assets/bgblue.png";

const SubscriptionPage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <div className="flex flex-col items-center space-y-4">
          <img src={logo} alt="SLT Logo" className="h-16" />
          <h1 className="text-2xl font-bold text-center text-blue-900">
            Welcome to SLT's Business Continuity App!
          </h1>
          <p className="text-center text-gray-700">
            As a visitor or customer, you can stay informed and connected with
            our latest updates, insights and resources.
          </p>
          <Link
            to="/subscribeForm"
            className="bg-gradient-to-r from-blue-900 to-green-500 text-white font-bold py-2 px-4 rounded-full w-full text-center"
          >
            Subscribe With Us
          </Link>
          <Link to="/" className="text-blue-600 hover:underline">
            Already Subscribed? Visit Our Home Page
          </Link>
          <div className="border-t w-full pt-4">
            <h2 className="text-lg font-semibold text-center text-blue-900">
              Overview of what subscribers will gain access to:
            </h2>
            <ul className="text-gray-700 list-disc list-inside mt-2">
              <li>Exclusive newsletters and updates</li>
              <li>Access to our knowledgebase and resources</li>
              <li>Information on our risk management practices</li>
              <li>Special offers and promotions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
