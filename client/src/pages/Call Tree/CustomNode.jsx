import { Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const CustomNode = ({ data }) => {
  return (
    <>
      <div className="border border-black text-xs p-2">{data.label}</div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default CustomNode;
