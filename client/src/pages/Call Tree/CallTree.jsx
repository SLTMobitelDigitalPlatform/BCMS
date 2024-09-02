import { useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "./CustomNode.jsx";

import initialNodes from "./nodes.js";
import initialEdges from "./edges.js";

const nodeTypes = {
  customNode: CustomNode,
};

const CallTree = () => {
  return (
    <div className="h-full w-full border border-black pt-2">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
      />
    </div>
  );
};

export default CallTree;
