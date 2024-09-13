import { useState, useEffect } from "react";
import { OrgDiagram } from "basicprimitivesreact";
import { PageFitMode, Enabled } from "basicprimitives";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../services/userAPI";

function TestCallTree() {
  const [items, setItems] = useState([]);

  // Fetch organizational data from the backend
  const fetchData = async () => {
    try {
      const loggedInUser = await getCurrentUser();
      const userSection = loggedInUser.data.section._id; // Ensure _id is fetched
      const response = await fetch(
        `http://localhost:5000/callTree?section=${userSection}` // Use only the section ID
      );
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format");
      }

      const formattedItems = data.map((item) => ({
        id: item._id,
        parent: item.parent ? item.parent._id : null,
        title: item.title,
        description: item.description,
        personName: item.personName,
        mobileNumber: item.mobileNumber,
        image:
          item.image ||
          "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
      }));
      console.log(formattedItems);
      setItems(formattedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
      <Link to="/calltreetable">
        <div className="text-white bg-blue-900 focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm w-40 px-3 py-2">
          Go to Table
        </div>
      </Link>
      <OrgDiagram centerOnCursor={true} config={config} />
    </div>
  );
}

export default TestCallTree;
