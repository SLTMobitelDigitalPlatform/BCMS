import React, { useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BIA = () => {
  const [sectionName, setSectionName] = useState("");
  const [dateNextReview, setDateNextReview] = useState("");
  const [owner, setOwner] = useState("");
  const [maintainers, setMaintainers] = useState("");
  const [viewers, setViewers] = useState("");
  const [dateApproved, setDateApproved] = useState("");
  const [dateLastReviewed, setDateLastReviewed] = useState("");
  const [changesLastReview, setChangesLastReview] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      sectionName,
      dateNextReview,
      owner,
      maintainers,
      viewers,
      dateApproved,
      dateLastReviewed,
      changesLastReview,
    };

    axios
      .post("http://localhost:5000/bia/create", data)
      .then(() => {
        handleSuccessAlert();
        navigate("/bia");
      })
      .catch((error) => {
        handleErrorAlert();
        console.log(error);
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

  return (
    <div className="bia-container w-full h-full bg-sky-100 flex flex-col rounded-2xl pt-5">
      <div className="bia-header">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-500">Business Impact Analysis</h1>
      </div>

      <div className="bg-cyan-50 w-full h-full p-3 rounded-2xl mt-5">
        <form onSubmit={handleSubmit} className="bia-form flex flex-col gap-6">
          <div className="bia-form-group flex gap-10">
            <label htmlFor="sectionName" className="font-semibold">Section Name</label>
            <select id="sectionName" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100"
              value={sectionName} onChange={(e) => setSectionName(e.target.value)}>
             
              <option value="">Please Select Your Section</option>
             <option value="IT">IT</option>
            <option value="HR">HR</option>
  n         <option value="Controll">Controll</option>
            </select>
          </div>

          <div className="bia-form-group flex gap-10">
            <label htmlFor="dateNextReview" className="font-semibold">Date due for next review</label>
            <input type="date" id="dateNextReview" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100"
              value={dateNextReview} onChange={(e) => setDateNextReview(e.target.value)} />
          </div>

          <div className="bia-form-group flex gap-10">
            <label htmlFor="owner" className="font-semibold">Owner</label>
            <select id="owner" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100"
              value={owner} onChange={(e) => setOwner(e.target.value)}>
              <option>Please Select Owner</option>
              {/* Add more options here */}
            </select>
          </div>

          <div className="bia-form-group flex gap-10">
            <label htmlFor="maintainers" className="font-semibold">Maintainers</label>
            <input type="text" id="maintainers" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100" 
              value={maintainers} onChange={(e) => setMaintainers(e.target.value)} placeholder="Please enter the maintainers" />
          </div>

          <div className="bia-form-group flex gap-10">
            <label htmlFor="viewers" className="font-semibold">Viewers</label>
            <input type="text" id="viewers" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100"
              value={viewers} onChange={(e) => setViewers(e.target.value)} placeholder="Please enter the viewers" />
          </div>

          <div className="bia-form-group flex gap-10">
            <label htmlFor="dateApproved" className="font-semibold">Date approved</label>
            <input type="date" id="dateApproved" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100"
              value={dateApproved} onChange={(e) => setDateApproved(e.target.value)} />
          </div>

          <div className="bia-form-group flex gap-10">
            <label htmlFor="dateLastReviewed" className="font-semibold">Date last reviewed</label>
            <input type="date" id="dateLastReviewed" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100"
              value={dateLastReviewed} onChange={(e) => setDateLastReviewed(e.target.value)} />
          </div>

          <div className="bia-form-group flex gap-10">
            <label htmlFor="changesLastReview" className="font-semibold">Changes of the last review</label>
            <input type="text" id="changesLastReview" className="bia-input w-[500px] p-2 rounded-lg bg-slate-100"
              value={changesLastReview} onChange={(e) => setChangesLastReview(e.target.value)} placeholder="Please enter the changes" />
          </div>

          <div className="flex justify-start gap-2 mt-5">
            <button type="submit" className="p-2 w-32 bg-sky-600 text-white rounded-lg font-semibold">
              Save
            </button>
            <button type="button" className="p-2 w-32 bg-red-500 text-white rounded-lg font-semibold" onClick={() => navigate("/bia")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BIA;
