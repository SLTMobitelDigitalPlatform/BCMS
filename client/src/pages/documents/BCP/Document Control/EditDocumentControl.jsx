import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDocumentControl } from "../../../../hooks/documents/bcp/useDocumentControl";
import { errorAlert, updateAlert } from "../../../../utilities/alert";

const EditDocumentControl = () => {
  const [formData, setFormData] = useState({
    version: "",
    description: "",
    date: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { bcpid, id } = useParams();

  const {
    documentControl,
    loading,
    error,
    fetchDocumentControlsByIds,
    updateDocumentControl,
  } = useDocumentControl();

  useEffect(() => {
    fetchDocumentControlsByIds(bcpid, id);
  }, []);

  useEffect(() => {
    if (documentControl) {
      setFormData({
        version: documentControl.version || "",
        description: documentControl.description || "",
        date: documentControl.date || "",
      });
    }
  }, [documentControl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // ! Add duplicate id validation

      const documentControlData = {
        ...formData,
        bcpid: documentControl.bcpid,
      };

      const result = await updateAlert(
        "Confirm Update",
        `Are you sure you want to update "${documentControl.version}"?`,
        "Yes, Update it!",
        `"${documentControl.version}" has been updated successfully!`,
        `Failed to update "${documentControl.version}"!`,
        async () => {
          await updateDocumentControl(id, documentControlData);
        }
      );

      if (result === "success") {
        navigate(
          `/Business-Continuity-Plan/document-control/${documentControl.bcpid}`
        );
      }
    } catch (error) {
      errorAlert("Error", error.message || "Error adding Document Control!");
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <FaSpinner className="animate-spin text-4xl text-green-500" />
      </div>
    );
  }

  if (error) return <div>Error loading data.</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Add New Document Control
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Version</label>
            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleChange}
              placeholder="Enter Version"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="p-2 w-full rounded"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-2 w-full rounded"
            />
          </div>

          <div className="flex justify-start gap-2">
            <button
              type="submit"
              className={`p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold ${
                isSaving ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSaving}
            >
              {isSaving ? (
                <FaSpinner className="animate-spin inline text-xl " />
              ) : (
                "Save"
              )}
            </button>
            <Link
              to={`/Business-Continuity-Plan/document-control/${bcpid}`}
              className="p-2 w-32 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDocumentControl;
