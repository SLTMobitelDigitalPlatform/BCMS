import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateInternalIssue = () => {
  const [internalIssues, setInternalIssues] = useState("");
  const [requirments, setRequirments] = useState("");
  const [isms, setIsms] = useState(false);
  const [qms, setQms] = useState(false);
  const [bcms, setBcms] = useState(false);
  const navigate = useNavigate();

  const handleCreateInternalIssue = (e) => {
    e.preventDefault();

    const data = {
      internalIssues,
      requirments,
      isms,
      qms,
      bcms,
    };

    axios
      .post("http://localhost:5000/internalIssue/create", data)
      .then(() => {
        handleSuccessAlert();
        navigate("/Context-of-the-Organization/internalIssues");
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
    <div className="w-full h-full bg-sky-100 flex flex-col rounded-2xl pt-5">
      <h1 className="text-2xl font-bold">Create New Internal Issue</h1>
      <div className="bg-cyan-50 w-full h-full p-3 rounded-2xl mt-5">
        <form onSubmit={handleCreateInternalIssue}>
          <div className="flex flex-col gap-6">
            {/* <div className="flex justify-between"> */}
            <div className="flex gap-10">
              <label htmlFor="" className="font-semibold">
                Internal Issues
              </label>
              <textarea
                type="text"
                placeholder="Internal Issue"
                value={internalIssues}
                onChange={(e) => setInternalIssues(e.target.value)}
                className="w-[500px] p-2 rounded-lg bg-slate-100"
              />
            </div>
            <div className="flex gap-10">
              <label htmlFor="" className="font-semibold">
                Requirments
              </label>
              <textarea
                type="text"
                placeholder="Requirments"
                value={requirments}
                onChange={(e) => setRequirments(e.target.value)}
                className="w-[500px] p-2 rounded-lg bg-slate-100"
              />
            </div>
            {/* </div> */}
            <div className="flex flex-col gap-2">
              <label htmlFor="isms-checkbox" className="font-semibold">
                ISMS
              </label>
              <input
                type="checkbox"
                id="isms-checkbox"
                checked={isms}
                onChange={(e) => setIsms(e.target.checked)}
                className="w-full p-2 rounded-lg bg-slate-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="qms-checkbox" className="font-semibold">
                QMS
              </label>
              <input
                type="checkbox"
                id="qms-checkbox"
                checked={qms}
                onChange={(e) => setQms(e.target.checked)}
                className="w-full p-2 rounded-lg bg-slate-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="bcms-checkbox" className="font-semibold">
                BCMS
              </label>
              <input
                type="checkbox"
                id="bcms-checkbox"
                checked={bcms}
                onChange={(e) => setBcms(e.target.checked)}
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
              <Link to="/Context-of-the-Organization/internalIssues">
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

export default CreateInternalIssue;
