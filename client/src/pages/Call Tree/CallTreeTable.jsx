import { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/userAPI";
import { useUsers } from "../../hooks/useUsers";
import { useNavigate } from "react-router-dom";

function CallTreeTable() {
  const [items, setItems] = useState([]);
  const [parent, setParent] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control the popup/modal
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    personName: "",
    mobileNumber: "",
    parent: null,
    section: "",
  });

  const { users, fetchUsers, fetchUserDetails } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
    fetchParents();
    fetchUsers();
    fetchUserDetails();
  }, []);

  const fetchItems = async () => {
    const loggedInUser = await getCurrentUser();
    const userSection = loggedInUser.data.section._id;

    const response = await fetch(
      `http://localhost:5000/callTree?section=${userSection}`
    );
    const data = await response.json();
    setItems(data);
  };

  const fetchParents = async () => {
    const loggedInUser = await getCurrentUser();
    const userSection = loggedInUser.data.section._id;

    const response = await fetch(
      `http://localhost:5000/callTree?section=${userSection}`
    );
    const data = await response.json();
    const parentNames = data.map((parent) => ({
      id: parent._id,
      name: parent.title,
    }));
    setParent(parentNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedInUser = await getCurrentUser();
    const userSection = loggedInUser.data.section._id;

    const updatedFormData = {
      ...formData,
      section: userSection,
      parent: formData.parent === "" ? null : formData.parent,
    };

    try {
      if (isEditing) {
        await fetch(`http://localhost:5000/callTree/edit/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFormData),
        });
      } else {
        await fetch("http://localhost:5000/callTree/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFormData),
        });
      }

      setFormData({
        title: "",
        description: "",
        personName: "",
        mobileNumber: "",
        parent: null,
      });
      setIsEditing(false);
      setShowModal(false); // Close the modal on form submit
      fetchItems();
      navigate("/testcalltree");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item._id);
    setShowModal(true); // Open the modal when editing
    setFormData({
      title: item.title,
      description: item.description,
      personName: item.personName._id,
      mobileNumber: item.mobileNumber,
      parent: item.parent ? item.parent._id : null,
    });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/callTree/delete/${id}`, {
      method: "DELETE",
    });
    fetchItems();
  };

  return (
    <div className="max-w-7xl mx-auto p-8 overflow-y-auto h-screen">
      {" "}
      {/* Make the page scrollable */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Call Tree Management
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
              <input
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
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
              <input
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
              />
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
                      description: "",
                      personName: "",
                      mobileNumber: "",
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
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Person Name</th>
            <th className="py-3 px-6 text-left">Mobile Number</th>
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
              <td className="p-3">{item.description}</td>
              <td className="p-3">{item.personName?.name || "No Name"}</td>
              <td className="p-3">{item.mobileNumber}</td>
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
}

export default CallTreeTable;
