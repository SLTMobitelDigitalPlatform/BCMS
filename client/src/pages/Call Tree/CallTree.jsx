import { Tree, TreeNode } from "react-organizational-chart";
import { useState } from "react";
import data from "./data.json";

const StyledNode = ({ label, mobileNumber }) => (
  <div className="p-2 rounded-lg inline-block border-2 border-indigo-600 text-center">
    <div>{label}</div>
    <div>{mobileNumber}</div>
  </div>
);

// Recursive function to render TreeNode components
const renderTreeNodes = (nodeData) => {
  if (!nodeData || !nodeData.children)
    return (
      <StyledNode label={nodeData.label} mobileNumber={nodeData.mobileNumber} />
    );

  return (
    <TreeNode
      label={
        <StyledNode
          label={nodeData.label}
          mobileNumber={nodeData.mobileNumber}
        />
      }
    >
      {nodeData.children.map((child, index) => (
        <TreeNode key={index} label={renderTreeNodes(child)} />
      ))}
    </TreeNode>
  );
};

const CallTree = () => {
  const [treeData] = useState(data);

  return (
    <div className="w-full h-full overflow-auto">
      <Tree
        lineWidth={"2px"}
        lineColor={"green"}
        lineBorderRadius={"10px"}
        label={renderTreeNodes(treeData)}
      />
    </div>
  );
};

export default CallTree;
