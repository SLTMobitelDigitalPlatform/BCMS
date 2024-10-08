import { Enabled, PageFitMode } from "basicprimitives";
import { OrgDiagram } from "basicprimitivesreact";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../services/userApi";
import axios from "axios";

const OrgCallTree = () => {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/callTreeOrg");

      const data = response.data;
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format");
      }
      const formattedItems = data.map((item) => ({
        id: item._id,
        title: item.title,
        parent: item.parent ? item.parent._id : null,
        name: item.personName?.name || "NA",
        email: item.personName?.email || "NA",
        mobileNumber: item.personName?.contactNumber || "NA",
        designation: item.personName?.designation || "NA",
        image: item.personName?.profileImg
          ? `http://localhost:5000${item.personName.profileImg}`
          : `https://eu.ui-avatars.com/api/?name=${item.personName?.name}&size=250`,
        itemTitleColor: "#000b4d",
      }));
      // console.log(data);
      setItems(formattedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between">
        <Link to="/call-tree-home" className="font-semibold text-3xl">
          Organizational Call Tree
        </Link>

        <Link to="/org-call-tree-table" className="btn-primary">
          Call Tree Table
        </Link>
      </div>

      <OrgDiagram centerOnCursor={true} config={config} />
    </div>
  );
};

export default OrgCallTree;
