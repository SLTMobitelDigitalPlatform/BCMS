import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSections } from "../../hooks/useSections";
import { validateSectionCode } from "../../utilities/helper";
import Swal from "sweetalert2";
import { getUsers } from "../../services/userAPI";

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
      if (addEditSectionModal.type === "add") {
        await addSection({
          sectionCode,
          name,
          sectionCoordinator: coordinatorValue,
        });
        Swal.fire({
          icon: "success",
          title: "Section Added",
          text: `The section "${name}" with code "${sectionCode}" has been successfully added!`,
        });
      } else {
        await editSection(addEditSectionModal.data._id, {
          sectionCode,
          name,
          sectionCoordinator: coordinatorValue,
        });
        Swal.fire({
          icon: "success",
          title: "Section Updated",
          text: `The section "${name}" with code "${sectionCode}" has been successfully updated!`,
        });
      }

      setAddEditSectionModal({
        isShown: false,
        type: "add",
        data: { sectionCode: "", name: "", sectionCoordinator: "" },
      });
    } catch (error) {
      console.error("Error saving section", error.response?.data || error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "There was an issue saving the section.",
      });
    }
  };

  // Delete section
  const handleDeleteSection = async (id, sectionName, sectionCode) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete the section "${sectionName}" with code "${sectionCode}". This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeSection(id);
          Swal.fire(
            "Deleted!",
            `Section "${sectionName}" with code "${sectionCode}" has been deleted.`,
            "success"
          );
        } catch (error) {
          console.error("Error deleting section:", error);
          Swal.fire(
            "Error!",
            "There was an issue deleting the section.",
            "error"
          );
        }
      }
    });
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
    <div className="px-5 pt-4 pb-20 rounded-2xl bg-indigo-100 w-full h-full overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl mb-3 font-bold text-green-500">Sections</h1>
        <button
          className="btn-primary font-semibold"
          onClick={() =>
            setAddEditSectionModal({
              isShown: true,
              type: "add",
              data: { sectionCode: "", name: "", sectionCoordinator: "" },
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
              {coordinatorOptions.map((option, index) => (
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
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="py-2 px-4 w-20 doc-table-border">Section Code</th>
              <th className="py-2 px-4 w-20 doc-table-border">Section Name</th>
              <th className="py-2 px-4 w-20 doc-table-border">
                Section Coordinator
              </th>
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
                  {section.sectionCoordinator && section.sectionCoordinator.name
                    ? section.sectionCoordinator.name
                    : "No Coordinator Assigned"}
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
