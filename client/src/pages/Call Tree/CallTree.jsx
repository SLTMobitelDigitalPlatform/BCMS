import { Tree, TreeNode } from "react-organizational-chart";
import { useEffect, useState } from "react";
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
  // const [treeData, setTreeData] = useState(null);

  // useEffect(() => {
  //   // Fetch the data from JSON file
  //   fetch("./data.json")
  //     .then((response) => response.json())
  //     .then((data) => setTreeData(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  // if (!treeData) return <p>Loading...</p>;

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

// return (
//   <div className="flex justify-center">
//     <Tree
//       lineWidth={"2px"}
//       lineColor={"green"}
//       lineBorderRadius={"10px"}
//       label={<StyledNode label="BCMS Manager" />}
//     >
//       <TreeNode label={<StyledNode label="BCMS Sectional Coordinator 1" />}>
//         <TreeNode label={<StyledNode label="BCMS Coordinator 1" />} />
//         <TreeNode label={<StyledNode label="BCMS Coordinator 2" />} />
//       </TreeNode>
//       <TreeNode label={<StyledNode label="BCMS Sectional Coordinator 2" />}>
//         <TreeNode label={<StyledNode label="BCMS Coordinator" />}>
//           <TreeNode label={<StyledNode label="BCMS Employee 1" />} />
//           <TreeNode label={<StyledNode label="BCMS Employee 2" />} />
//           <TreeNode label={<StyledNode label="BCMS Employee 3" />} />
//         </TreeNode>
//       </TreeNode>
//       <TreeNode label={<StyledNode label="BCMS Sectional Coordinator 3" />}>
//         <TreeNode label={<StyledNode label="BCMS Coordinator 1" />} />
//         <TreeNode label={<StyledNode label="BCMS Coordinator 2" />} />
//         <TreeNode label={<StyledNode label="BCMS Coordinator 3" />} />
//       </TreeNode>
//     </Tree>
//   </div>
// );
