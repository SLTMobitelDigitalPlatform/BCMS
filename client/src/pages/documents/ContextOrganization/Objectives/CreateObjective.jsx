import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateObjective = () => {
  const [informationSecurity, setInformationSecurity] = useState("");
  const [businessContinuity, setBusinessContinuity] = useState("");
  const [quality, setQuality] = useState("");
  const navigate = useNavigate();

  const handleCreateObjective = (e) => {
    e.preventDefault();

    const data = {
      informationSecurity,
      businessContinuity,
      quality,
    };

    axios
      .post("http://localhost:5000/objective/create", data)
      .then(() => {
        handleSuccessAlert();
        navigate("/objectives");
      })
      .catch((err) => {
        handleErrorAlert();
        console.log(err);
      });
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

  return (
    <div className="w-full rounded-2xl bg-sky-100 p-5 h-full overflow-auto">
      <h1 className="text-2xl font-bold">Create New Objective</h1>
      <div className="w-full mt-10 rounded-2xl">
        <form onSubmit={handleCreateObjective}>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Information Security
                </label>
                <textarea
                  type="text"
                  placeholder="Prepared Person"
                  value={informationSecurity}
                  onChange={(e) => setInformationSecurity(e.target.value)}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Business Continuity
                </label>
                <textarea
                  type="text"
                  placeholder="Approved Person"
                  value={businessContinuity}
                  onChange={(e) => setBusinessContinuity(e.target.value)}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Quality
              </label>
              <textarea
                type="text"
                placeholder="Reasons"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-100"
              />
            </div>
            <div className="flex justify-start gap-2 mt-5">
              <button
                type="submit"
                className="p-2 w-32 bg-sky-600 text-white rounded-lg font-semibold"
              >
                Save
              </button>
              <Link to="/objectives">
                <button className="p-2 w-32 bg-red-500 text-white rounded-lg font-semibold">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateObjective;
