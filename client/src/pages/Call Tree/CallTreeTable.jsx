import { useEffect, useState } from "react";

const CallTreeTable = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/callTree")
      .then((res) => res.json())
      .then((data) => setTreeData(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/callTree/delete/${id}`, {
      method: "DELETE",
    }).then(() => setTreeData(treeData.filter((node) => node._id !== id)));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Mobile Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {treeData.map((node) => (
          <tr key={node._id}>
            <td>{node.label}</td>
            <td>{node.mobileNumber}</td>
            <td>
              <button onClick={() => handleDelete(node._id)}>Delete</button>
              {/* Add Edit button here */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CallTreeTable;
