import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePeaksDeadline } from "../../../../hooks/documents/bia/usePeaksDeadline";
import { updateAlert } from "../../../../utilities/alert";

const EditPeaksDeadlines = () => {
  const [formData, setFormData] = useState({
    peaksdeadlineName: "",
    description: "",
    timeOfDay: "",
    dayOfWeek: "",
    businessDay: "",
    calendarDay: "",
    month: "",
  });

  const { biaid, id } = useParams();
  console.log('biaid:', biaid, 'id:', id);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const path = `/Business-Impact-Analysis/business-peaks-and-deadlines/${biaid}`;

  const {
    peaksDeadline,
    fetchPeaksDeadlineByIds,
    updatePeaksDeadline,
  } = usePeaksDeadline();

  useEffect(() => {
    console.log('Fetching peaks deadline data...');
    fetchPeaksDeadlineByIds(biaid, id).then((data) => {
      console.log('Peaks deadline data:', data);
    }).catch((error) => {
      console.error('Error fetching peaks deadline data:', error);
    });
  }, [biaid, id]);

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
      if (!formData.peaksdeadlineName) errors.peaksdeadlineName = "Name is required";
      if (!formData.description) errors.description = "Description is required";
      if (!formData.timeOfDay) errors.timeOfDay = "Time of day is required";
      if (!formData.dayOfWeek) errors.dayOfWeek = "Day of week is required";
      if (!formData.businessDay) errors.businessDay = "Business day is required";
      if (!formData.calendarDay) errors.calendarDay = "Calendar day is required";
      if (!formData.month) errors.month = "Month is required";
    return errors;
  };

  useEffect(() => {
    if (peaksDeadline) {
      console.log('Peaks deadline state:', peaksDeadline);
      setFormData({
        peaksdeadlineName: peaksDeadline.peaksdeadlineName || "",
        description: peaksDeadline.description || "",
        timeOfDay: peaksDeadline.timeOfDay || "",
        dayOfWeek: peaksDeadline.dayOfWeek || "",
        businessDay: peaksDeadline.businessDay || "",
        calendarDay: peaksDeadline.calendarDay || "",
        month: peaksDeadline.month || "",

      });
      console.log('Form data:', formData);
    }
  }, [peaksDeadline]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsUpdating(true);
      try {
  
        const peaksDeadlineData = { ...formData, biaid };
  
        const result = await updateAlert(
          "Confirm Update",
          `Are you sure you want to update "${peaksDeadline.peaksdeadlineName}"?`,
          "Yes, Update it!",
          `"${peaksDeadline.peaksdeadlineName}" has been updated successfully!`,
          `Failed to update "${peaksDeadline.peaksdeadlineName}"!`,
          () => updatePeaksDeadline(id, peaksDeadlineData)
        );
  
        if (result === "success") {
          navigate(path);
        }
      } catch (error) {
        console.log(error);
      }
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
        Update Business Peaks and Deadlines
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
                    
          {/* Name */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              name="peaksdeadlineName"
              value={formData.peaksdeadlineName}
              onChange={handleChange}
              placeholder="Enter Name"
              className={`p-2 w-full rounded ${formErrors.peaksdeadlineName ? 'border-red-500' : ''}`}
            />
            {formErrors.peaksdeadlineName && (
              <p className="text-red-500">{formErrors.peaksdeadlineName}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className={`p-2 w-full rounded ${formErrors.description ? 'border-red-500' : ''}`}
            />
            {formErrors.description && (
              <p className="text-red-500">{formErrors.description}</p>
            )}
          </div>

          {/* Time of Day */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Time of Day</label>
            <input
              type="text"
              name="timeOfDay"
              value={formData.timeOfDay}
              onChange={handleChange}
              placeholder="Enter Time of Day"
              className={`p-2 w-full rounded ${formErrors.timeOfDay ? 'border-red-500' : ''}`}
            />
            {formErrors.timeOfDay && (
              <p className="text-red-500">{formErrors.timeOfDay}</p>
            )}
          </div>

          {/* Day of Week */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Day of Week</label>
            <input
              type="text"
              name="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={handleChange}
              placeholder="Enter Day of Week"
              className={`p-2 w-full rounded ${formErrors.dayOfWeek ? 'border-red-500' : ''}`}
            />
            {formErrors.dayOfWeek && (
              <p className="text-red-500">{formErrors.dayOfWeek}</p>
            )}
          </div>

          {/* Business Day */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Business Day</label>
            <input
              type="text"
              name="businessDay"
              value={formData.businessDay}
              onChange={handleChange}
              placeholder="Enter Business Day"
              className={`p-2 w-full rounded ${formErrors.businessDay ? 'border-red-500' : ''}`}
            />
            {formErrors.businessDay && (
              <p className="text-red-500">{formErrors.businessDay}</p>
            )}
          </div>       

          {/* Calendar Day */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Calendar Day</label>
            <input
              type="text"
              name="calendarDay"
              value={formData.calendarDay}
              onChange={handleChange}
              placeholder="Enter Calendar Day"
              className={`p-2 w-full rounded ${formErrors.calendarDay ? 'border-red-500' : ''}`}
            />
            {formErrors.calendarDay && (
              <p className="text-red-500">{formErrors.calendarDay}</p>
            )}
          </div>  

          {/* Month */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Month</label>
            <input
              type="text"
              name="month"
              value={formData.month}
              onChange={handleChange}
              placeholder="Enter Month"
              className={`p-2 w-full rounded ${formErrors.month ? 'border-red-500' : ''}`}
            />
            {formErrors.month && (
              <p className="text-red-500">{formErrors.month}</p>
            )}
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

export default EditPeaksDeadlines;
