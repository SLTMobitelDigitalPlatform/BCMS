import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewPolicyPage = () => {
  const { id } = useParams(); // Get the policy ID from the URL
  const [policy, setPolicy] = useState(null); // State to hold the policy data
  const [introduction, setIntroduction] = useState(""); // State for the introduction

  // Fetch the policy details when the component loads
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/policy/${id}`);
        setPolicy(response.data);
        setIntroduction(response.data.introduction || ""); // Set the introduction state
      } catch (error) {
        console.error("Error fetching policy details", error);
      }
    };
    fetchPolicy();
  }, [id]);

  // Handle updating the introduction field
  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:5000/policy/${id}/introduction`, {
        introduction: introduction, // Payload for the introduction field
      });
      alert("Introduction updated successfully!");
    } catch (error) {
      console.error("Error updating introduction", error);
    }
  };

  return (
    <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">
        View Policy
      </h2>
      {policy ? (
        <>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Policy Details</h3>
            <p>
              <strong>Issue Number:</strong> {policy.issueNumber}
            </p>
            <p>
              <strong>Issue Date:</strong>{" "}
              {new Date(policy.issueDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Revision Number:</strong> {policy.riviseNumber}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Introduction</h3>
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="w-full h-40 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Save Introduction
          </button>
        </>
      ) : (
        <p>Loading policy details...</p>
      )}
    </div>
  );
};

export default ViewPolicyPage;
