import { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  createSection,
  deleteSection,
  getSections,
  updateSection,
} from "../../services/sectionApi";

Modal.setAppElement("#root");

export const Section = () => {
  const [sections, setSections] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [newSectionName, setNewSectionName] = useState("");

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

  // Add new section
  const handleAddSection = async () => {
    try {
      await createSection({ name: newSectionName });
      fetchSections(); // Refresh the list after adding
      setShowAddModal(false);
      setNewSectionName("");
    } catch (error) {
      console.log(error);
    }
  };

  // Edit section
  const handleEditSection = async () => {
    try {
      await updateSection(currentSection._id, { name: newSectionName });
      fetchSections(); // Refresh the list after editing
      setShowEditModal(false);
      setCurrentSection(null);
      setNewSectionName("");
    } catch (error) {
      console.log(error);
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

  return (
    <div className="p-5 rounded-2xl w-full h-full overflow-hidden bg-indigo-100">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl mb-3 font-bold text-green-500">Sections</h1>
        <button
          className="btn-primary font-semibold"
          onClick={() => setShowAddModal(true)}
        >
          Add
        </button>
      </div>

      {/* Add Section Modal */}
      <Modal
        isOpen={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
        contentLabel="Add Section"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">Add Section</h3>
          <input
            type="text"
            placeholder="Section Name"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              className="bg-green-500 hover:bg-green-600 py-1 px-2 text-white text-sm font-semibold rounded-lg"
              onClick={handleAddSection}
            >
              Save
            </button>
            <button
              className="doc-delete-btn"
              onClick={() => setShowAddModal(false) && setNewSectionName("")}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Section Modal */}
      <Modal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        contentLabel="Edit Section"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">Edit Section</h3>
          <input
            type="text"
            placeholder="Section Name"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              className="bg-green-500 hover:bg-green-600 py-1 px-2 text-white text-sm font-semibold rounded-lg"
              onClick={handleEditSection}
            >
              Save
            </button>
            <button
              className="doc-delete-btn"
              onClick={() => {
                setShowEditModal(false);
                setCurrentSection(null);
                setNewSectionName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <table className="table-fixed relative w-full py-10 bg-cyan-50">
        <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
          <tr>
            <th className="py-2 px-4 w-20 doc-table-border">Section Name</th>
            <th className="py-2 px-4 w-20 doc-table-border">Action</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <tr key={section._id} className="hover:bg-indigo-100">
              <td className="py-2 px-4 w-28 doc-table-border">
                {section.name}
              </td>
              <td className="py-2 px-4 w-28 doc-table-border">
                <div className="flex justify-center gap-2">
                  <button
                    className="doc-edit-btn"
                    onClick={() => {
                      setCurrentSection(section);
                      setNewSectionName(section.name);
                      setShowEditModal(true);
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
