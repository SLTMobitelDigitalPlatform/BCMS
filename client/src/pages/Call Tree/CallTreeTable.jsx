import React, { useState, useEffect } from "react";
import { getCurrentUser, getUsers } from "../../services/userAPI";

function CallTreeTable() {
  const [items, setItems] = useState([]);
  const [parent, setParent] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    personName: "",
    mobileNumber: "",
    parent: null,
    section: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const users = response.data.map((user) => ({
        userId: user._id,
        userName: user.name,
      }));
      console.log(users);
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchParents();
    fetchUsers();
  }, []);

  const fetchItems = async () => {
    const loggedInUser = await getCurrentUser();
    const userSection = loggedInUser.data.section._id;

    const response = await fetch(
      `http://localhost:5000/callTree?section=${userSection}`
    );
    const data = await response.json();
    console.log(data);
    setItems(data);
  };

  const fetchParents = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // First ensure the form data is up-to-date before submission
    const loggedInUser = await getCurrentUser();
    const userSection = loggedInUser.data.section._id;

    const updatedFormData = {
      ...formData,
      section: userSection,
      parent: formData.parent === "" ? null : formData.parent, // Ensure parent is null if not selected
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

      // Clear the form and reset the state
      setFormData({
        title: "",
        description: "",
        personName: "",
        mobileNumber: "",
        parent: null, // Reset parent to null after submission
      });
      setIsEditing(false);
      fetchItems(); // Refresh the items list after submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item._id);
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
    <div>
      <div className="border">
        <form className="mt-5" onSubmit={handleSubmit}>
          <input
            className="w-[200px] p-2 rounded-lg bg-slate-100"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <input
            className="w-[200px] p-2 rounded-lg bg-slate-100"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {/* <input
            className="w-[200px] p-2 rounded-lg bg-slate-100"
            type="text"
            placeholder="Person Name"
            value={formData.personName}
            onChange={(e) =>
              setFormData({ ...formData, personName: e.target.value })
            }
          /> */}
          <select
            className="w-[200px] p-2 rounded-lg bg-slate-100"
            type="text"
            id="personName"
            placeholder="Name"
            value={formData.personName}
            onChange={(e) =>
              setFormData({ ...formData, personName: e.target.value })
            }
          >
            <option value="" disabled>
              Name
            </option>
            {users.map((option) => (
              <option key={option.userId} value={option.userId}>
                {option.userName}
              </option>
            ))}
          </select>
          <input
            className="w-[200px] p-2 rounded-lg bg-slate-100"
            type="text"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({ ...formData, mobileNumber: e.target.value })
            }
          />
          <select
            className="w-[200px] p-2 rounded-lg bg-slate-100"
            id="parent"
            placeholder="Supervisor"
            value={formData.parent || ""}
            onChange={(e) =>
              setFormData({ ...formData, parent: e.target.value })
            }
          >
            <option value="" disabled>
              Supervisor
            </option>
            {parent.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="p-2 w-32 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </form>
      </div>
      <table className="mt-10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Supervisor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.personName?.name || "No Name"}</td>
              <td>{item.mobileNumber}</td>
              <td>{item.parent?.title || "No Supervisor"}</td>
              <td>
                <button
                  className="text-white bg-yellow-500 px-2 py-1 rounded-lg mr-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="text-white bg-red-500 px-2 py-1 rounded-lg"
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
