import React, { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/userApi";
import axios from "axios";

const OrgCallTreeTable = () => {
  const [items, setItems] = useState([]);
  const [parent, setParent] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    personName: "",
    parent: null,
  });
  const navigate = useNavigate();
  const { users, fetchUsers, fetchUserDetails } = useUsers();

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/callTreeOrg");
      const data = response.data;
      console.log(data);
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchParents = async () => {
    const response = await fetch(`http://localhost:5000/callTreeOrg`);
    const data = await response.json();
    const parentNames = data.map((parent) => ({
      id: parent._id,
      name: parent.title,
    }));
    console.log(parentNames);
    setParent(parentNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      parent: formData.parent === "" ? null : formData.parent,
    };

    try {
      if (isEditing) {
        await fetch(`http://localhost:5000/callTreeOrg/edit/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFormData),
        });
      } else {
        await fetch("http://localhost:5000/callTreeOrg/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFormData),
        });
        console.log("Check");
      }

      setFormData({
        title: "",
        personName: "",
        parent: null,
      });

      setIsEditing(false);
      setShowModal(false);
      fetchItems();
      navigate("/org-call-tree");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item._id);
    setShowModal(true);
    setFormData({
      title: item.title,
      personName: item.personName._id,
      parent: item.parent ? item.parent._id : null,
    });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/callTreeOrg/delete/${id}`, {
      method: "DELETE",
    });
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
    fetchParents();
    fetchUsers();
    fetchUserDetails();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8 overflow-y-auto h-screen">
      {/* Make the page scrollable */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Oganizational Call Tree Management
      </h2>
      {/* Button to open the modal */}
      <button
        className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => setShowModal(true)} // Open modal on button click
      >
        Create Call Tree Entry
      </button>
      {/* Modal for Create/Edit Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Call Tree Entry" : "Create Call Tree Entry"}
            </h2>
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              <input
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <select
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                value={formData.personName}
                onChange={(e) =>
                  setFormData({ ...formData, personName: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Person
                </option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>

              <select
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                value={formData.parent || ""}
                onChange={(e) =>
                  setFormData({ ...formData, parent: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Supervisor
                </option>
                {parent.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="p-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                  onClick={() => {
                    setShowModal(false);
                    setIsEditing(false); // Reset form state on modal close
                    setFormData({
                      title: "",
                      personName: "",
                      parent: null,
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-semibold text-gray-700 mt-5 mb-4">
        Call Tree Records
      </h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-auto mb-20">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Person Name</th>

            <th className="py-3 px-6 text-left">Supervisor</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item._id}
              className="border-b border-gray-200 doc-table-hover"
            >
              <td className="p-3">{item.title}</td>
              <td className="p-3">{item.personName?.name || "No Name"}</td>

              <td className="p-3">
                {item.parent ? item.parent.title : "No Supervisor"}
              </td>
              <td className="p-3">
                <button
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition ml-2"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrgCallTreeTable;
