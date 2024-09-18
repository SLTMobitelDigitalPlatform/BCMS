import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { useLegalRequirements } from "../../../../hooks/documents/bcp/useLegalRequirements";
import { useUsers } from "../../../../hooks/useUsers";

const EditLegalRequirements = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    legalRequirement: "",
    monitoredBy: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    sortedUsers,
    loading: usersLoading,
    error: usersError,
    fetchUsers,
  } = useUsers();
  const {
    legalRequirement,
    loading: legalRequirementLoading,
    error: legalRequirementError,
    fetchLegalRequirementById,
    updateLegalRequirement,
  } = useLegalRequirements();

  useEffect(() => {
    fetchUsers();
    fetchLegalRequirementById(id);
  }, []);

  // Update formData when legalRequirement is fetched
  useEffect(() => {
    if (legalRequirement) {
      setFormData({
        organizationName: legalRequirement.organizationName || "",
        legalRequirement: legalRequirement.legalRequirement || "",
        monitoredBy: legalRequirement.monitoredBy || "",
      });
    }
  }, [legalRequirement]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLegalRequirement(id, formData);
      handleSuccessAlert();
      navigate(
        "/Business-Continuity-Plan/legal-regulatory-&-contractual-requirements"
      );
    } catch (error) {
      handleErrorAlert();
      console.log(error);
    }
  };

  // Success Alert
  const handleSuccessAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Record Updated Successfully",
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

  if (usersLoading || legalRequirementLoading) return <div>Loading...</div>;
  if (legalRequirementError || usersError)
    return <div>Error loading data.</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Edit Embedded Document
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
              className="p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
            >
              Save
            </button>
            <Link
              to="/Business-Continuity-Plan/legal-regulatory-&-contractual-requirements"
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

export default EditLegalRequirements;
