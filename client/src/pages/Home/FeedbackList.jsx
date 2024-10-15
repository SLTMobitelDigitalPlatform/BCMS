import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch feedback data from the backend
    fetch("http://localhost:5000/feedbacks") // Update with your actual endpoint
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error("Error fetching feedbacks:", error));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Customer Feedbacks</h1>
      <div className="m-2 bg-sky-900 text-white w-36 p-2 rounded-lg">
        <Link to="/customers">Customer Table</Link>
      </div>
      {feedbacks.length > 0 ? (
        <div className="grid gap-6">
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">{feedback.name}</h2>
              <p className="text-gray-600 mb-1">
                <strong>Date:</strong>{" "}
                {moment(feedback.date).format("Do MMM YYYY, h:mm A")}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Email:</strong> {feedback.email}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Subject:</strong> {feedback.subject}
              </p>
              <p className="text-gray-800">{feedback.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
};

export default FeedbackList;
