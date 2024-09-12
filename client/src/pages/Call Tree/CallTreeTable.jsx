import React, { useState, useEffect } from "react";

function CallTreeTable() {
  const [items, setItems] = useState([]);
  const [parent, setParent] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    parent: "",
  });

  useEffect(() => {
    fetchItems();
    fetchParents();
  }, []);

  const fetchItems = async () => {
    const response = await fetch("http://localhost:5000/callTree");
    const data = await response.json();
    setItems(data);
  };

  const fetchParents = async () => {
    try {
      const response = await fetch("http://localhost:5000/callTree");
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
    if (isEditing) {
      // Update the existing node
      await fetch(`http://localhost:5000/callTree/edit/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      // Create a new node
      await fetch("http://localhost:5000/callTree/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    setFormData({ title: "", description: "", parent: "" });
    setIsEditing(false);
    fetchItems(); // Refresh data
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item._id);
    setFormData({
      title: item.title,
      description: item.description,
      parent: item.parent ? item.parent._id : "",
    });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/callTree/delete/${id}`, {
      method: "DELETE",
    });
    fetchItems(); // Refresh data
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
          <select
            className="w-[200px] p-2 rounded-lg bg-slate-100"
            type="text"
            id="parent"
            placeholder="Supervisor"
            value={formData.parent}
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
            <th>Supervisor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
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
