import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select"; 

const BIA = () => {
  const [sectionName, setSectionName] = useState("");
  const [dateNextReview, setDateNextReview] = useState("");
  const [owner, setOwner] = useState("");  
  const [maintainers, setMaintainers] = useState([]);
  const [viewers, setViewers] = useState([]);
  const [dateApproved, setDateApproved] = useState("");
  const [dateLastReviewed, setDateLastReviewed] = useState("");
  const [changesLastReview, setChangesLastReview] = useState("");

  // Store all users
  const [users, setUsers] = useState([]); 

  const navigate = useNavigate();

  // Fetch available users from the backend
  useEffect(() => {
    fetch("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,  
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);  
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data before submission
    if (!sectionName || !dateNextReview || !owner) {
      Swal.fire({
        title: "Incomplete Form",
        text: "Please fill all required fields.",
        icon: "warning",
      });
      return;
    }

    // Create form data object
    const data = {
      sectionName,
      dateNextReview,
      maintainers: maintainers.map((user) => user.value),
      viewers: viewers.map((user) => user.value),
      viewers,
      dateApproved,
      dateLastReviewed,
      changesLastReview,
    };

    axios
      .post("http://localhost:5000/api/biaForms/add", data)  
      .then(() => {
        handleSuccessAlert();
        navigate("/bia-form");
      })
      .catch((error) => {
        handleErrorAlert();
        console.error(error);
      });
  };

  const handleSuccessAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Record Added Successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleErrorAlert = () => {
    Swal.fire({
      title: "Something Went Wrong",
      text: "Fix it and try again",
      icon: "error",
    });
  };

  // Convert users to react-select options format
  const userOptions = users.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  return (
    <div className="bia-container w-full h-full bg-sky-100 flex flex-col rounded-2xl">
      <div className="bg-cyan-50 w-full h-full p-3 rounded-2xl mt-5">
        <form onSubmit={handleSubmit} className="bia-form flex flex-col gap-6">
          <div className="bia-form-group flex gap-10">
            <label htmlFor="sectionName" className="font-semibold">Section Name</label>
            <select id="sectionName" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100"
              value={sectionName} onChange={(e) => setSectionName(e.target.value)}>
              <option value="">Please Select Your Section</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Control">Control</option>
            </select>
          </div>

          <div className="bia-form-group flex gap-10">
            <label htmlFor="owner" className="font-semibold">Owner</label>
            <select id="owner" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100"
              value={owner} onChange={(e) => setOwner(e.target.value)}>
              <option value="">Please Select Owner</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Multi-select dropdown for Maintainers */}
          <div className="bia-form-group flex gap-10">
            <label htmlFor="maintainers" className="font-semibold">Maintainers</label>
            <Select
              id="maintainers"
              isMulti
              value={maintainers}
              onChange={setMaintainers}
              options={userOptions}
              className="w-[500px] bg-slate-100"
              classNamePrefix="select"
            />
          </div>

          {/* Multi-select dropdown for Viewers */}
          <div className="bia-form-group flex gap-10">
            <label htmlFor="viewers" className="font-semibold">Viewers</label>
            <Select
              id="viewers"
              isMulti
              value={viewers}
              onChange={setViewers}
              options={userOptions}
              className="w-[500px] bg-slate-100"
              classNamePrefix="select"
            />
          </div>

          <div className="bia-form-group flex gap-10">
            <label htmlFor="dateApproved" className="font-semibold">Date Approved</label>
            <input type="date" id="dateApproved" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100"
              value={dateApproved} onChange={(e) => setDateApproved(e.target.value)} />
          </div>

          <div className="bia-form-group flex gap-10">
            <label htmlFor="dateLastReviewed" className="font-semibold">Date Last Reviewed</label>
            <input type="date" id="dateLastReviewed" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100"
              value={dateLastReviewed} onChange={(e) => setDateLastReviewed(e.target.value)} />
          </div>

          <div className="bia-form-group flex gap-10">
            <label htmlFor="changesLastReview" className="font-semibold">Changes of Last Review</label>
            <input type="text" id="changesLastReview" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100"
              value={changesLastReview} onChange={(e) => setChangesLastReview(e.target.value)} placeholder="Please enter the changes" />
          </div>

          <button type="submit" className="p-2 w-32 bg-sky-600 text-white rounded-lg font-semibold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );

};

export default BIA;
