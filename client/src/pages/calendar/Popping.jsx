import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// This is necessary to set the root element for the modal
Modal.setAppElement("#root");

const Popping = ({ open, handleClose, event, fetchEvents }) => {
  const navigate = useNavigate();
  const { _id, describe, title, start, end } = event;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5000/currentuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/events/${_id}`);
      fetchEvents();
      handleClose();
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  const handleUpdate = () => {
    navigate(`/event/${_id}/update`);
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      className="relative w-full max-w-lg mx-auto mt-24 bg-white rounded-lg p-6 "
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div className="p-6">
        <div className="flex justify-between items-center border-b-2 border-blue-700 pb-4">
          <h2 className="text-xl font-semibold text-blue-800">{title}</h2>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-700 text-3xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">
          {describe ? (
            <p className="text-black">{describe}</p>
          ) : (
            <p className="text-gray-400">No Descriptions Yet</p>
          )}
        </div>
        <div className="flex justify-between mt-4 text-sm text-black">
          <p>From: {new Date(start).toLocaleString()}</p>
          <p>To: {new Date(end).toLocaleString()}</p>
        </div>
      </div>
      <div className="border-t-2 border-blue-700 pt-4 mt-4 mx-6 flex justify-center space-x-4">
        <button
          className="bg-gray-700 text-white hover:bg-gray-600 border-0 rounded-md py-2 px-4 mr-2"
          onClick={handleClose}
        >
          Close
        </button>
        {user &&
        (user.role === "Super Admin" ||
          user.role === "Secretariat Coordinator") ? (
          <>
            <button
              className="bg-green-500 text-white hover:bg-green-500 border-0 rounded-md py-2 px-4 mr-2"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="bg-red-600 text-white hover:bg-blue-500 border-0 rounded-md py-2 px-4"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        ) : null}
      </div>
    </Modal>
  );
};

export default Popping;
