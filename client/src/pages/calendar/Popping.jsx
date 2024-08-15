import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <Modal show={open} onHide={handleClose} className="rounded-lg shadow-lg">
      <Modal.Header closeButton className="border-b border-gray-200">
        <Modal.Title className="text-xl font-semibold text-gray-800">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-6">
        {describe ? (
          <p className="text-gray-600">{describe}</p>
        ) : (
          <p className="text-gray-400">No Descriptions Yet</p>
        )}
        <div className="flex justify-between mt-4">
          <p className="text-sm text-gray-500">
            From: {new Date(start).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            To: {new Date(end).toLocaleString()}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-t border-gray-200">
        <Button
          className="bg-gray-700 text-white hover:bg-gray-600 border-0 rounded-md py-2 px-4 mr-2"
          onClick={handleClose}
        >
          Close
        </Button>
        {user &&
        (user.role === "superadmin" ||
          user.role === "secretariat coordinator") ? (
          <>
            <Button
              className="bg-green-600 text-white hover:bg-green-500 border-0 rounded-md py-2 px-4 mr-2"
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-500 border-0 rounded-md py-2 px-4"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        ) : (
          " "
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Popping;
