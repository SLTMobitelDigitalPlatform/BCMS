import { useState, useEffect } from "react";
import axios from "axios";
import CallTreeGraph from "./CallTreeGraph";

const CallTreeNew = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    axios
      .get("/nodes")
      .then((response) => setNodes(response.data))
      .catch((err) => console.error("Error fetching nodes:", err));

    axios
      .get("/edges")
      .then((response) => setEdges(response.data))
      .catch((err) => console.error("Error fetching edges:", err));
  }, []);

  const handleNodeAdd = (node) => {
    axios
      .post("/nodes", node)
      .then((response) => setNodes([...nodes, response.data]))
      .catch((err) => console.error("Error adding node:", err));
  };

  const handleEdgeAdd = (edge) => {
    axios
      .post("/edges", edge)
      .then((response) => setEdges([...edges, response.data]))
      .catch((err) => console.error("Error adding edge:", err));
  };

  return (
    <div>
      <CallTreeGraph
        nodes={nodes}
        edges={edges}
        onNodeAdd={handleNodeAdd}
        onEdgeAdd={handleEdgeAdd}
      />
    </div>
  );
};

export default CallTreeNew;
