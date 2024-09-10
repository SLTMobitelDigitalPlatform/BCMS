import React, { useState, useEffect } from "react";

function CallTreeTable() {
  const [items, setItems] = useState([]);
  const [parent, setParent] = useState([]);
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
      console.log(parentNames);
      setParent(parentNames);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/callTree/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchItems(); // Refresh data
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <select
          type="text"
          id="parent"
          placeholder="Supervisor"
          value={formData.parent}
          onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
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
        <button type="submit">Add</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Phone Number</th>
            <th>Supervisor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.description}</td>
              <td>{/* Edit and Delete operations can be added here */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CallTreeTable;
