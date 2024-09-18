import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { useEmbeddedDocuments } from "../../../../hooks/documents/bcp/useEmbeddedDocuments";
import { useUsers } from "../../../../hooks/useUsers";
import { FaSpinner } from "react-icons/fa";

const CreateEmbeddedDocuments = () => {
  const [formData, setFormData] = useState({
    number: "",
    description: "",
    responsiblePerson: "",
    physicalLocation: "",
    owner: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const { sortedUsers, loading, error, fetchUsers } = useUsers();
  const { addEmbeddedDocument } = useEmbeddedDocuments();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await addEmbeddedDocument(formData);
      handleSuccessAlert();
      navigate("/Business-Continuity-Plan/embedded-documents");
    } catch (error) {
      handleErrorAlert();
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  // Success Alert
  const handleSuccessAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Record Added Successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // Error Alert
  const handleErrorAlert = () => {
    Swal.fire({
      title: "Something Went Wrong",
      text: "Fix it and try again",
      icon: "error",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
    });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Add New Embedded Document
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Enter number"
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
              placeholder="Enter description"
              className="p-2 w-full rounded"
            />
          </div>

          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Responsible Person</label>
              <Select
                options={sortedUsers}
                value={sortedUsers.find(
                  (user) => user.value === formData.responsiblePerson
                )}
                onChange={(option) =>
                  handleSelectChange(option, "responsiblePerson")
                }
                isClearable={true}
                placeholder="Select Responsible Person"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Owner</label>
              <Select
                options={sortedUsers}
                value={sortedUsers.find(
                  (user) => user.value === formData.owner
                )}
                onChange={(option) => handleSelectChange(option, "owner")}
                isClearable={true}
                placeholder="Select Owner"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Physical Location of Item</label>
            <input
              type="text"
              name="physicalLocation"
              value={formData.physicalLocation}
              onChange={handleChange}
              placeholder="Enter physical location of item"
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
              to="/Business-Continuity-Plan/embedded-documents"
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

export default CreateEmbeddedDocuments;
