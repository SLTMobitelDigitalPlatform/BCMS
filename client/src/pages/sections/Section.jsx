import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSections } from "../../hooks/useSections";
import { getUsers } from "../../services/userAPI";
import {
  createAlert,
  deleteAlert,
  errorAlert,
  updateAlert,
} from "../../utilities/alert";
import { validateSectionCode } from "../../utilities/helper";

Modal.setAppElement("#root");

const Section = () => {
  const {
    fetchSections,
    sections,
    loading,
    error,
    addSection,
    editSection,
    removeSection,
  } = useSections();

  useEffect(() => {
    fetchSections();
  }, []);

  const [addEditSectionModal, setAddEditSectionModal] = useState({
    isShown: false,
    type: "add",
    data: { sectionCode: "", name: "", sectionCoordinator: "" },
  });
  const [formError, setFormError] = useState("");
  const [sectionCoordinator, setSectionCoordinator] = useState("");
  const [coordinatorOptions, setCoordinatorOptions] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const coordinatorOptions = response.data.map((user) => ({
        id: user._id,
        name: user.name,
      }));
      console.log(sections);
      setCoordinatorOptions(coordinatorOptions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddEditSectionModal = async () => {
    const { sectionCode, name, sectionCoordinator } = addEditSectionModal.data;

    setFormError("");

    if (!validateSectionCode(sectionCode)) {
      setFormError("Section ID should be exactly 4 capital letters.");
      return;
    }

    if (!name.trim()) {
      setFormError("Section name is required.");
      return;
    }

    const coordinatorValue =
      sectionCoordinator === "" ? null : sectionCoordinator;

    try {
      // ! Add duplicate id validation
      if (addEditSectionModal.type === "add") {
        // ! Add duplicate id validation
        await addSection({
          sectionCode,
          name,
          sectionCoordinator: coordinatorValue,
        });
        createAlert(
          "Section Added",
          `The section "${name}" (${sectionCode}) has been successfully added!`
        );
      } else {
        // ! Add duplicate id validation
        await updateAlert(
          "Confirm Update",
          `Are you sure you want to update section "${name}" (${sectionCode})?`,
          "Yes, Update it!",
          `"${name}" (${sectionCode}) has been updated successfully!`,
          `Failed to update "${name}" (${sectionCode})!`,
          async () => {
            await editSection(addEditSectionModal.data._id, {
              sectionCode,
              name,
              sectionCoordinator: coordinatorValue,
            });
          }
        );
      }

      setAddEditSectionModal({
        isShown: false,
        type: "add",
        data: { sectionCode: "", name: "", sectionCoordinator: "" },
      });
    } catch (error) {
      console.error("Error saving section", error.response?.data || error);

      errorAlert(
        "Error",
        error.response?.data?.message || "Error saving section"
      );
    }
  };

  // Delete section
  const handleDeleteSection = async (id, sectionName, sectionCode) => {
    deleteAlert(
      "Are you sure?",
      `You are about to delete the section "${sectionName}" (${sectionCode}). This action cannot be undone.`,
      "Yes, delete it!",
      `Section "${sectionName}" (${sectionCode}) deleted successfully!`,
      `Error deleting section "${sectionName}" (${sectionCode})`,
      async () => await removeSection(id)
    );
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold text-green-500">Sections</h1>
        <button
          className="btn-primary"
          onClick={() =>
            setAddEditSectionModal({
              isShown: true,
              type: "add",
              data: { sectionCode: "", name: "", sectionCoordinator: "" },
            })
          }
        >
          Add Section
        </button>
      </div>

      {/* Add/Edit Section Modal */}
      <Modal
        isOpen={addEditSectionModal.isShown}
        onRequestClose={() =>
          setAddEditSectionModal({
            isShown: false,
            type: "add",
            data: { sectionCode: "", name: "", sectionCoordinator: "" },
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
                formError &&
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
                formError && !addEditSectionModal.data.name
                  ? "border-red-500"
                  : ""
              }`}
            />
            <label htmlFor="" className=" font-semibold mt-5">
              Sectional Coordinator
            </label>
            <select
              id="sectionalCoordinator"
              name="sectionCoordinator"
              value={addEditSectionModal.data.sectionCoordinator}
              onChange={handleInputChange}
              className="p-2 rounded-lg bg-slate-100"
            >
              <option value="" disabled>
                Select
              </option>
              {coordinatorOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            {formError && (
              <p className="text-red-500 text-center">{formError}</p>
            )}
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
                    data: { sectionCode: "", name: "", sectionCoordinator: "" },
                  })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="py-2 px-4 w-20 doc-table-head">Section Code</th>
              <th className="py-2 px-4 w-20 doc-table-head">Section Name</th>
              <th className="py-2 px-4 w-20 doc-table-head">
                Section Coordinator
              </th>
              <th className="py-2 px-4 w-20 doc-table-head">Action</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr key={section._id} className="doc-table-hover">
                <td className="py-2 px-4 w-28 doc-table-data">
                  {section.sectionCode}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {section.name}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {section.sectionCoordinator && section.sectionCoordinator.name
                    ? section.sectionCoordinator.name
                    : "No Coordinator Assigned"}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
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
                      onClick={() =>
                        handleDeleteSection(
                          section._id,
                          section.name,
                          section.sectionCode
                        )
                      }
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
    </div>
  );
};

export default Section;

// await editSection(addEditSectionModal.data._id, {
//   sectionCode,
//   name,
//   sectionCoordinator: coordinatorValue,
// });
// successAlert(
//   "Section Updated",
//   `The section "${name}" with code "${sectionCode}" has been successfully updated!`
// );
