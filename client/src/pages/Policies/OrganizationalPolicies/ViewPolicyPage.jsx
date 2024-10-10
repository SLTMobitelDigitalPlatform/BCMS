import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import axios from "axios";
import "./joditEditor.css";

const ViewPolicyPage = () => {
  const { id } = useParams(); // Get the policy ID from the URL
  const [policy, setPolicy] = useState(null);
  const [introduction, setIntroduction] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const editor = useRef(null);

  // Jodit Editor configuration
  const config = useMemo(
    () => ({
      readonly: false, // Enables editing
      placeholder: "Start typing here...",
    }),
    []
  );

  // Fetch the policy details when the component loads
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/policy/${id}`);
        setPolicy(response.data);
        setIntroduction(response.data.introduction || "");
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
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating introduction", error);
    }
  };

  return (
    <div className="scrollable-container">
      <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg ">
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

              {isEditing ? (
                <JoditEditor
                  ref={editor}
                  value={introduction}
                  config={config}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => setIntroduction(newContent)} // Update introduction onBlur
                />
              ) : (
                // Show formatted introduction when not editing
                <div
                  className="border border-gray-300 p-4 rounded-md jodit-content"
                  dangerouslySetInnerHTML={{ __html: introduction }}
                />
              )}
            </div>

            {isEditing ? (
              // Save button in editing mode
              <button
                onClick={handleSave}
                className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700"
              >
                Save Introduction
              </button>
            ) : (
              // Edit button in viewing mode
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-500"
              >
                Edit Introduction
              </button>
            )}
          </>
        ) : (
          <p>Loading policy details...</p>
        )}
      </div>
    </div>
  );
};

export default ViewPolicyPage;
