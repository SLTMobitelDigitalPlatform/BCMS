import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRelatedDocuments } from "../../../../hooks/documents/bcp/useRelatedDocuments";
import { updateAlert } from "../../../../utilities/alert";

const EditRelatedDocuments = () => {
  const [formData, setFormData] = useState({
    referenceDocument: "",
    documentType: "",
  });

  const { bcpid, id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Continuity-Plan/related-documents/${bcpid}`;

  const {
    relatedDocument,
    loading,
    fetchRelatedDocumentByIds,
    updateRelatedDocument,
  } = useRelatedDocuments();

  useEffect(() => {
    fetchRelatedDocumentByIds(bcpid, id);
  }, []);

  useEffect(() => {
    if (relatedDocument) {
      setFormData({
        referenceDocument: relatedDocument.referenceDocument || "",
        documentType: relatedDocument.documentType || "",
      });
    }
  }, [relatedDocument]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // ! Add duplicate id validation

      const relatedDocumentData = { ...formData, bcpid };

      const result = await updateAlert(
        "Confirm Update",
        `Are you sure you want to update "${relatedDocument.referenceDocument}"?`,
        "Yes, Update it!",
        `"${relatedDocument.referenceDocument}" has been updated successfully!`,
        `Failed to update "${relatedDocument.referenceDocument}"!`,
        () => updateRelatedDocument(id, relatedDocumentData)
      );

      if (result === "success") {
        navigate(path);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <FaSpinner className="animate-spin text-4xl text-green-500" />
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Edit Related Document
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Reference Document Name</label>
            <input
              type="text"
              name="referenceDocument"
              value={formData.referenceDocument}
              onChange={handleChange}
              placeholder="Enter Reference Document Name"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Document Type</label>
            <input
              type="text"
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              placeholder="Enter Document Type"
              className="p-2 w-full rounded"
            />
          </div>

          <div className="flex justify-start gap-2">
            <button
              type="submit"
              className={`p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold ${
                isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <FaSpinner className="animate-spin inline text-xl " />
              ) : (
                "Update"
              )}
            </button>
            <Link
              to={path}
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

export default EditRelatedDocuments;
