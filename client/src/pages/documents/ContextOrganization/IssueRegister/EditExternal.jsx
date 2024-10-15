import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditExternal = () => {
  const [externalIssues, setExternalIssues] = useState("");
  const [requirments, setRequirments] = useState("");
  const [isms, setIsms] = useState(false);
  const [qms, setQms] = useState(false);
  const [bcms, setBcms] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/externalIssue/${id}`)
      .then((res) => {
        setExternalIssues(res.data.externalIssues);
        setRequirments(res.data.requirments);
        setIsms(res.data.isms);
        setQms(res.data.qms);
        setBcms(res.data.bcms);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleEditInternal = (e) => {
    e.preventDefault();

    const data = {
      externalIssues,
      requirments,
      isms,
      qms,
      bcms,
    };

    axios
      .put(`http://localhost:5000/externalIssue/edit/${id}`, data)
      .then(() => {
        handleSuccessAlert();
        navigate("/Context-of-the-Organization/issue-register", {
          state: { activeTab: "external" },
        });
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

  return (
    <div className="w-full rounded-2xl bg-sky-100 p-5 h-full overflow-auto">
      <h1 className="text-2xl font-bold">Edit Objective</h1>
      <div className="w-full mt-10 rounded-2xl">
        <form onSubmit={handleEditInternal}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-6">
              {/* <div className="flex justify-between"> */}
              <div className="flex gap-10">
                <label htmlFor="" className="font-semibold">
                  External Issues
                </label>
                <textarea
                  type="text"
                  placeholder="Internal Issue"
                  value={externalIssues}
                  onChange={(e) => setExternalIssues(e.target.value)}
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
                <Link
                  to="/Context-of-the-Organization/issue-register"
                  state={{ activeTab: "external" }}
                >
                  <button className="p-2 w-32 bg-red-500 text-white rounded-lg font-semibold">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExternal;
