import axios from "axios";
import { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";

// StyledNode component to display each node
const StyledNode = ({ label, mobileNumber }) => (
  <div className="p-2 rounded-lg inline-block border-2 border-indigo-600 text-center">
    <div>{label}</div>
    <div>{mobileNumber}</div>
  </div>
);

// Recursive function to render TreeNode components
const renderTreeNodes = (nodeData) => {
  return (
    <TreeNode
      label={
        <StyledNode
          label={nodeData.label}
          mobileNumber={nodeData.mobileNumber}
        />
      }
    >
      {nodeData.children &&
        nodeData.children.map((child, index) => (
          <TreeNode
            key={index}
            label={
              <StyledNode
                label={child.label}
                mobileNumber={child.mobileNumber}
              />
            }
          >
            {child.children && renderTreeNodes(child)}
          </TreeNode>
        ))}
    </TreeNode>
  );
};

const TestCallTree = () => {
  const [treeData, setTreeData] = useState([]);

  const fetchCallTree = async () => {
    try {
      const response = await axios.get("http://localhost:5000/callTree");
      setTreeData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCallTree();
  }, []);

  if (!treeData.length) return <p>Loading...</p>;

  return (
    <div className="w-full h-full overflow-auto">
      {treeData.map((node, index) => (
        <Tree
          key={index}
          lineWidth={"2px"}
          lineColor={"green"}
          lineBorderRadius={"10px"}
          label={
            <StyledNode label={node.label} mobileNumber={node.mobileNumber} />
          }
        >
          {node.children &&
            node.children.map((child) => renderTreeNodes(child))}
        </Tree>
      ))}
    </div>
  );
};

export default TestCallTree;
