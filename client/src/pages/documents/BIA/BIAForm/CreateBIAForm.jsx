import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { useBIAForm } from "../../../../hooks/documents/bia/useBIAForm";
import { useUsers } from "../../../../hooks/useUsers";

const CreateBIA = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    docNo: "",
    date: today,
    template: "",
    legalEntity: "",
    approver: "",
    owner: "",
    maintainers: [],
    viewers: [],
    dateApproved: "",
    dateLastReviewed: "",
    dateDueForNextReview: "",
  });

  const navigate = useNavigate();
  const { sortedUsers, loading, error, fetchUsers } = useUsers();
  const { fetchLastBIAForm, addBIAForm } = useBIAForm();

  // Create Plan Number
  const createDocNo = async () => {
    try {
      const response = await fetchLastBIAForm();
      if (response && response.data) {
        const lastRecord = response.data;
        let lastDocNo = lastRecord?.docNo || "P000";
        let numericPart = parseInt(lastDocNo.slice(1)) + 1;
        let newDocNo = `P${numericPart.toString().padStart(3, "0")}`;
        setFormData((prev) => ({ ...prev, docNo: newDocNo }));
      } else {
        setFormData((prev) => ({ ...prev, docNo: "P001" }));
      }
    } catch (error) {
      console.error("Error creating plan number:", error);
    }
  };

  useEffect(() => {
    const initializeForm = async () => {
      try {
        await fetchUsers();
        await createDocNo();

        // Set dateDueForNextReview based on dateLastReviewed if dateLastReviewed is already set
        if (formData.dateLastReviewed) {
          const lastReviewedDate = new Date(formData.dateLastReviewed);
          const nextReviewDate = new Date(lastReviewedDate.setFullYear(lastReviewedDate.getFullYear() + 1));
          setFormData((prev) => ({
            ...prev,
            dateDueForNextReview: nextReviewDate.toISOString().split("T")[0],
          }));
        }
      } catch (err) {
        console.error("Error initializing form:", err);
      }
    };
    initializeForm();
  }, [formData.dateLastReviewed]);

  // Validate dates
  const validateDates = () => {
    const {
      dateApproved,
      dateLastReviewed, 
      dateDueForNextReview,
    } = formData;
  
    const today = new Date().toISOString().split("T")[0]; 
  
    // Check if Date Approved and Date Last Reviewed are not in the future
    if (dateApproved && dateApproved > today) {
      return "Date Approved cannot be a future date.";
    }
  
    if (dateLastReviewed && dateLastReviewed > today) {
      return "Date Last Reviewed cannot be a future date.";
    }
  
    // Ensure Date Last Reviewed is not before Date Approved
    if (dateApproved && dateLastReviewed && dateLastReviewed < dateApproved) {
      return "Date Last Reviewed cannot be before Date Approved.";
    }

    // Ensure Date Due For Next Review is not before Date Last Reviewed
    if (dateLastReviewed && dateDueForNextReview && dateDueForNextReview < dateLastReviewed) {
      return "Date Due for Next Review cannot be before Date Last Reviewed.";
    }
  
    return null;
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.viewers.length || !formData.maintainers.length) {
      handleErrorAlert("Please select viewers and maintainers");
      return;
    }

    const dateError = validateDates();
    if (dateError) {
      handleErrorAlert(dateError);
      return;
    }
    
    try {
      await addBIAForm(formData);
      handleSuccessAlert();
      navigate("/Business-Impact-Analysis/bia-form");
    } catch (error) {
      handleErrorAlert("Failed to add the record. Please try again later.");
    console.error(error);
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
  const handleErrorAlert = (message) => {
    Swal.fire({
      title: "Something Went Wrong",
      text: message || "Fix it and try again",
      icon: "error",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
  
      // Automatically set the dateDueForNextReview to one year after dateLastReviewed
      if (name === "dateLastReviewed" && value) {
        const lastReviewedDate = new Date(value);
        const nextReviewDate = new Date(lastReviewedDate.setFullYear(lastReviewedDate.getFullYear() + 1));
        newFormData.dateDueForNextReview = nextReviewDate.toISOString().split("T")[0];
      }
  
      return newFormData;
    });
  };  

  const handleSelectChange = (selectedOption, name) => {
    if (Array.isArray(selectedOption)) {
      setFormData({
        ...formData,
        [name]: selectedOption.map((option) => option.value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: selectedOption ? selectedOption.value : "",
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Add New Business Impact Analysis Plan
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Document Number and Date */}
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Document Number</label>
              <input
                type="text"
                name="docNo"
                value={formData.docNo}
                disabled
                readOnly
                className="p-2 w-full rounded bg-white"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                disabled
                readOnly
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          {/* Template and Legal Entity */}
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Template</label>
              <input
                type="text"
                name="template"
                value={formData.template}
                onChange={handleChange}
                placeholder="Enter the Template Number"
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Legal Entity</label>
              <input
                type="text"
                name="legalEntity"
                value={formData.legalEntity}
                onChange={handleChange}
                placeholder="Enter the Legal Entity"
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          {/* Approver and Owner */}
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Approver</label>
              <Select
                options={sortedUsers}
                value={sortedUsers.find(
                  (user) => user.value === formData.approver
                )}
                onChange={(option) => handleSelectChange(option, "approver")}
                isClearable={true}
                placeholder="Select Approver"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">Owner</label>
              <Select
                options={sortedUsers}
                value={sortedUsers.find((user) => user.value === formData.owner)}
                onChange={(option) => handleSelectChange(option, "owner")}
                isClearable={true}
                placeholder="Select Owner"
              />
            </div>
          </div>

          {/* Maintainers */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Maintainers</label>
            <Select
              isMulti
              options={sortedUsers}
              value={sortedUsers.filter((user) =>
                formData.maintainers.includes(user.value)
              )}
              onChange={(option) => handleSelectChange(option, "maintainers")}
              isClearable={true}
              placeholder="Select Maintainers"
            />
          </div>

          {/* Viewers */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Viewers</label>
            <Select
              isMulti
              options={sortedUsers}
              value={sortedUsers.filter((user) =>
                formData.viewers.includes(user.value)
              )}
              onChange={(option) => handleSelectChange(option, "viewers")}
              isClearable={true}
              placeholder="Select Viewers"
            />
          </div>

          {/* Dates */}
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Date Approved</label>
              <input
                type="date"
                name="dateApproved"
                value={formData.dateApproved}
                onChange={handleChange}
                max={today}
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Date Last Reviewed</label>
              <input
                type="date"
                name="dateLastReviewed"
                value={formData.dateLastReviewed}
                onChange={handleChange}
                max={today}
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="font-semibold">Date Due for Next Review</label>
              <input
                type="date"
                name="dateDueForNextReview"
                value={formData.dateDueForNextReview}
                disabled
                readOnly
                className="p-2 w-full rounded"
              />
            </div>
          </div>

          {/* Submit and Cancel */}
          <div className="flex justify-start gap-2">
            <button
              type="submit"
              className="p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
            >
              Save
            </button>
            <Link
              to="/Business-Impact-Analysis/bia-form"
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

export default CreateBIA;
