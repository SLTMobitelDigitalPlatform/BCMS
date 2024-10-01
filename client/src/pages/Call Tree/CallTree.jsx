import { Enabled, PageFitMode } from "basicprimitives";
import { OrgDiagram } from "basicprimitivesreact";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../services/userApi";
import axios from "axios";

function CallTree() {
  const [items, setItems] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState("");

  // Fetch organizational data based on the section
  const fetchData = async (sectionId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/callTree?section=${sectionId}`
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
          : `https://eu.ui-avatars.com/api/?name=${item.personName?.name}&size=250`,
        itemTitleColor: "#000b4d",
      }));
      setItems(formattedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch the logged-in user's section and set it initially
  const fetchInitialSection = async () => {
    try {
      const loggedInUser = await getCurrentUser();
      const userSection = loggedInUser.data.section._id;
      const sectionName = loggedInUser.data.section.name;
      setSelectedSectionId(userSection);
      setSectionName(sectionName);
      fetchData(userSection);
    } catch (error) {
      console.error("Error fetching initial section:", error);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sections");
      setSections(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInitialSection();
    fetchSections();
  }, []);

  const config = {
    pageFitMode: PageFitMode.None,
    autoSizeMaximum: { width: 1200, height: 600 },
    cursorItem: 0,
    highlightItem: 0,
    hasSelectorCheckbox: Enabled.False,
    items: items,
    defaultTemplateName: "CustomTemplate",
    templates: [
      {
        name: "CustomTemplate",
        itemSize: { width: 305, height: 130 },
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

              <div className="flex items-center space-x-1 m-1">
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

  const handleSectionChange = (e) => {
    const selectedSection = e.target.value;
    setSectionName(selectedSection);
    const selectedSectionId = sections.find(
      (sec) => sec.sectionCode === selectedSection
    )._id; // Get the selected section ID based on the section code
    setSelectedSectionId(selectedSectionId);
    fetchData(selectedSectionId); // Fetch call tree data for the selected section
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">{sectionName}</h1>
        <select
          className="border rounded px-3 py-2"
          value={sectionName}
          onChange={handleSectionChange}
        >
          <option value="">Select Section</option>
          {sections.map((sec) => (
            <option key={sec._id} value={sec.sectionCode}>
              {sec.name} ({sec.sectionCode})
            </option>
          ))}
        </select>
        <Link to="/call-tree-table" className="btn-primary">
          Call Tree Table
        </Link>
      </div>

      <OrgDiagram centerOnCursor={true} config={config} />
    </div>
  );
}

export default CallTree;
