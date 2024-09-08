import { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  createSection,
  deleteSection,
  getSections,
  updateSection,
} from "../../services/sectionApi";
import { validateSectionCode } from "../../utilities/helper";

Modal.setAppElement("#root");

const Section = () => {
  const [sections, setSections] = useState([]);
  // const [newSectionID, setNewSectionID] = useState("");
  // const [newSectionName, setNewSectionName] = useState("");
  const [addEditSectionModal, setAddEditSectionModal] = useState({
    isShown: false,
    type: "add",
    data: { sectionCode: "", name: "" },
  });
  const [error, setError] = useState("");

  // Get all sections
  const fetchSections = async () => {
    try {
      const response = await getSections();
      setSections(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleAddEditSectionModal = async () => {
    const { sectionCode, name } = addEditSectionModal.data;

    setError("");

    if (!validateSectionCode(sectionCode)) {
      setError("Section ID should be exactly 4 capital letters.");
      return;
    }

    if (!name.trim()) {
      setError("Section name is required.");
      return;
    }

    // if (!newSectionID.trim()) {
    //   setError("Section ID is required.");
    //   setHasError(true);
    //   return;
    // }

    // if (newSectionID.length !== 4) {
    //   setError("Section ID should be exactly 4 characters.");
    //   setHasError(true);
    //   return;
    // }

    // if (!/^[A-Z]+$/.test(newSectionID)) {
    //   // setNewSectionID(newSectionID.toUpperCase());
    //   setError("Section ID should only contain capital letters.");
    //   setHasError(true);
    //   return;
    // }

    try {
      if (addEditSectionModal.type === "add") {
        await createSection({ sectionCode, name });
      } else {
        await updateSection(addEditSectionModal.data._id, {
          sectionCode,
          name,
        });
      }
      fetchSections();
      setAddEditSectionModal({
        isShown: false,
        type: "add",
        data: { sectionCode: "", name: "" },
      });
    } catch (error) {
      console.error("Error saving section", error.response?.data || error);
    }
  };

  // Delete section
  const handleDeleteSection = async (id) => {
    try {
      await deleteSection(id);
      fetchSections(); // Refresh the list after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddEditSectionModal((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value,
      },
    }));
  };

  return (
    <div className="p-5 rounded-2xl w-full h-full overflow-hidden bg-indigo-100">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl mb-3 font-bold text-green-500">Sections</h1>
        <button
          className="btn-primary font-semibold"
          onClick={() =>
            setAddEditSectionModal({
              isShown: true,
              type: "add",
              data: { sectionCode: "", name: "" },
            })
          }
        >
          Add
        </button>
      </div>

      {/* Add/Edit Section Modal */}
      <Modal
        isOpen={addEditSectionModal.isShown}
        onRequestClose={() =>
          setAddEditSectionModal({
            isShown: false,
            type: "add",
            data: { sectionCode: "", name: "" },
          })
        }
        contentLabel="Add/Edit Section"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-xl font-semibold">
            {addEditSectionModal.type === "add"
              ? "Add Section"
              : "Edit Section"}
          </h3>
          <div className="flex flex-col">
            <input
              type="text"
              name="sectionCode"
              placeholder="Section ID"
              value={addEditSectionModal.data.sectionCode}
              onChange={handleInputChange}
              className={`border p-2 my-3 ${
                error &&
                !validateSectionCode(addEditSectionModal.data.sectionCode)
                  ? "border-red-500"
                  : ""
              }`}
            />
            <input
              type="text"
              name="name"
              placeholder="Section Name"
              value={addEditSectionModal.data.name}
              onChange={handleInputChange}
              className={`border p-2 my-3 ${
                error && !addEditSectionModal.data.name ? "border-red-500" : ""
              }`}
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex mt-5 space-x-4">
              <button
                className="bg-green-500 hover:bg-green-600 py-1 px-2 text-white text-sm font-semibold rounded-lg"
                onClick={handleAddEditSectionModal}
              >
                Save
              </button>
              <button
                className="doc-delete-btn"
                onClick={() =>
                  setAddEditSectionModal({
                    isShown: false,
                    type: "add",
                    data: { sectionCode: "", name: "" },
                  })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <table className="table-fixed relative w-full py-10 bg-cyan-50">
        <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
          <tr>
            <th className="py-2 px-4 w-20 doc-table-border">Section Code</th>
            <th className="py-2 px-4 w-20 doc-table-border">Section Name</th>
            <th className="py-2 px-4 w-20 doc-table-border">Action</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <tr key={section._id} className="hover:bg-indigo-100">
              <td className="py-2 px-4 w-28 doc-table-border">
                {section.sectionCode}
              </td>
              <td className="py-2 px-4 w-28 doc-table-border">
                {section.name}
              </td>
              <td className="py-2 px-4 w-28 doc-table-border">
                <div className="flex justify-center gap-2">
                  <button
                    className="doc-edit-btn"
                    onClick={() => {
                      setAddEditSectionModal({
                        isShown: true,
                        type: "edit",
                        data: section,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="doc-delete-btn"
                    onClick={() => handleDeleteSection(section._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Section;
