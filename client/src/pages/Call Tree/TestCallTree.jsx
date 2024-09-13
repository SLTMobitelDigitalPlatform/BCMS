import { useState, useEffect } from "react";
import { OrgDiagram } from "basicprimitivesreact";
import { PageFitMode, Enabled } from "basicprimitives";
import { Link } from "react-router-dom";

function TestCallTree() {
  const [items, setItems] = useState([]);

  // Fetch organizational data from the backend
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/callTree");
    const data = await response.json();
    // Map backend data to the structure required by OrgDiagram
    const formattedItems = data.map((item) => ({
      id: item._id,
      parent: item.parent ? item.parent._id : null,
      title: item.title,
      description: item.description,
      image:
        item.image ||
        "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
    }));
    console.log(formattedItems);
    setItems(formattedItems);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const config = {
    pageFitMode: PageFitMode.AutoSize,
    autoSizeMinimum: { width: 100, height: 100 },
    cursorItem: 0,
    highlightItem: 0,
    hasSelectorCheckbox: Enabled.True,
    items: items, // Use the fetched data here
  };

  return (
    <div>
      <OrgDiagram centerOnCursor={true} config={config} />
      <div className="text-white bg-blue-900 focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm w-40 px-3 py-2">
        <Link to="/calltreetable">Go to Table</Link>
      </div>
    </div>
  );
}

export default TestCallTree;
