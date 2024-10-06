import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRelatedDocuments } from "../../../../hooks/documents/bcp/useRelatedDocuments";
import { createAlert } from "../../../../utilities/alert";

const CreateRelatedDocuments = () => {
  const [formData, setFormData] = useState({
    referenceDocument: "",
    documentType: "",
  });

  const { bcpid } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Continuity-Plan/related-documents/${bcpid}`;

  const { addRelatedDocument } = useRelatedDocuments();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      // ! Add duplicate id validation

      const relatedDocumentData = { ...formData, bcpid };
      await addRelatedDocument(relatedDocumentData);
      createAlert(
        "Related Document Added",
        `Related Document "${formData.referenceDocument}" added successfully!`
      );
      navigate(path);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Add New Related Document
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
                isCreating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isCreating}
            >
              {isCreating ? (
                <FaSpinner className="animate-spin inline text-xl " />
              ) : (
                "Create"
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

export default CreateRelatedDocuments;
