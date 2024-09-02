import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
} from "@xyflow/react";
import { useEffect } from "react";

const CallTreeGraph = ({ nodes, edges, onNodeAdd, onEdgeAdd }) => {
  //   const [nodesState, setNodesState] = useNodesState(nodes);
  //   const [edgesState, setEdgesState] = useEdgesState(edges);
  const [nodesState, setNodesState, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdgesState, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setNodesState(nodes);
  }, [nodes, setNodesState]);

  useEffect(() => {
    setEdgesState(edges);
  }, [edges, setEdgesState]);

  const handleConnect = (params) => {
    const edge = { ...params, type: "smoothstep", animated: true };
    onEdgeAdd(edge);
  };

  const handleNodeDragStop = (node) => {
    const newNode = { ...node, position: node.position };
    onNodeAdd(newNode);
  };

  return (
    <ReactFlow
      nodes={nodesState}
      edges={edgesState}
      onConnect={handleConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeDragStop={handleNodeDragStop}
      connectionLineType="smoothstep"
      fitView
    >
      <Controls />
      {/* <button
        onClick={() =>
          onNodeAdd({
            id: "new-node",
            type: "input",
            data: { label: "new node" },
            position: { x: 0, y: 0 },
          })
        }
      >
        Add Node
      </button> */}
      <button
        onClick={() =>
          onNodeAdd({
            id: `node-${nodesState.length}`,
            type: "input",
            data: { label: `New Node` },
            position: { x: Math.random() * 400, y: Math.random() * 400 },
          })
        }
      >
        Add Node
      </button>
    </ReactFlow>
  );
};

export default CallTreeGraph;
