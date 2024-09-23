import { useState, useEffect } from "react";
import { OrgDiagram } from "basicprimitivesreact";
import { PageFitMode, Enabled, Colors } from "basicprimitives";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../services/userAPI";

function TestCallTree() {
  const [items, setItems] = useState([]);
  const [sectionName, setSectionName] = useState("");

  // Fetch organizational data from the backend
  const fetchData = async () => {
    try {
      const loggedInUser = await getCurrentUser();
      const userSection = loggedInUser.data.section._id; // Ensure _id is fetched
      const sectionName = loggedInUser.data.section.name;
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
        name: item.personName?.name || "N/A",
        mobileNumber: item.mobileNumber,
        email: item.personName?.email || "N/A",
        designation: item.personName?.designation || "N/A",
        image: item.personName?.profileImg
          ? `http://localhost:5000${item.personName.profileImg}`
          : // : "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
            `https://eu.ui-avatars.com/api/?name=${item.personName?.name}&size=250`,
        itemTitleColor: "#000b4d",
      }));
      console.log(formattedItems);
      setItems(formattedItems);
      setSectionName(sectionName);
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
    hasSelectorCheckbox: Enabled.False,
    items: items,
    defaultTemplateName: "CustomTemplate",
    templates: [
      {
        name: "CustomTemplate",
        itemSize: { width: 300, height: 140 },
        minimizedItemSize: { width: 3, height: 3 },
        highlightPadding: { left: 2, top: 2, right: 2, bottom: 2 },
        onItemRender: ({ context: itemConfig }) => {
          return (
            <div
              className="ContactTemplate bg-slate-200 h-full"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                className="ContactTitleBackground"
                style={{ backgroundColor: itemConfig.itemTitleColor }}
              >
                <div className="ContactTitle text-center text-red-50">
                  {itemConfig.title}
                </div>
              </div>

              <div className="flex items-center space-x-1 mt-1">
                <div className="ContactPhotoFrame">
                  <img
                    className="w-20 h-20 rounded-full object-cover m-1"
                    src={itemConfig.image}
                    alt={itemConfig.title}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="ContactPhone text-sm">
                    {itemConfig.mobileNumber}
                  </div>
                  <div className="ContactEmail text-sm">{itemConfig.email}</div>
                  <div className="ContactDescription text-sm">
                    {itemConfig.name}
                  </div>
                  <div className="ContactDesignation text-sm">
                    {itemConfig.designation}
                  </div>
                </div>
              </div>
            </div>
          );
        },
      },
    ],
  };

  return (
    <div>
      <h1 className="text-center text-4xl">{sectionName}</h1>
      <Link to="/calltreetable">
        <div className="text-white bg-blue-900 focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm w-40 px-3 py-2">
          Go to Table
        </div>
      </Link>

      <div className="w-[1100px] h-[600px] overflow-auto">
        <OrgDiagram centerOnCursor={true} config={config} />
      </div>
    </div>
  );
}

export default TestCallTree;
