import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditResidualRiskAssesement = () => {
  const [rid, setRid] = useState("");
  const [impactRating, setImpactRating] = useState(0);
  // const [identifiedControls, setIdentifiedControls] = useState("");
  // const [impact, setImpact] = useState(0);
  // const [likelihood, setLikelihood] = useState(0);
  // const [treatMethod, setTreatMethod] = useState("");
  // const [date, setDate] = useState("");
  // const [residualRiskRating, setResidualRiskRating] = useState(0);
  // const [residualImpactRating, setResidualImpactRating] = useState(0);

  const [newMethod, setNewMethods] = useState("");
  const [newIdntifiedControls, setNewIdentifiedControls] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newImpact, setNewImpact] = useState(0);
  const [newLikelihood, setNewLikelihood] = useState(0);
  const [newResidualImpactRating, setNewResidualImpactRating] = useState(0);

  const navigate = useNavigate();
  const { id, source } = useParams(); // Getting the source from the route params

  useEffect(() => {
    // Determine the correct endpoint based on the source
    let endpoint;
    switch (source) {
      case "qualityRisks":
        endpoint = `http://localhost:5000/api/qualityRisks/${id}`;
        break;
      case "risksIS":
        endpoint = `http://localhost:5000/api/risksIS/${id}`;
        break;
      case "risksBCP":
        endpoint = `http://localhost:5000/api/risksBCP/${id}`;
        break;
      default:
        alert("Invalid source!");
        return;
    }

    // Fetch the data
    axios
      .get(endpoint)
      .then((res) => {
        setRid(res.data.rid || ""); // Ensure rid is a string
        setImpactRating(Number(res.data.impactRating) || 0); // Ensure a numeric value
        setNewMethods(res.data.newMethod || "");
        setNewIdentifiedControls(res.data.newIdntifiedControls || "");
        setNewDate(res.data.newDate || "");
        setNewImpact(Number(res.data.newImpact) || 0); // Ensure a numeric value
        setNewLikelihood(Number(res.data.newLikelihood) || 0); // Ensure a numeric value
        setNewResidualImpactRating(
          Number(res.data.newResidualImpactRating) || 0
        ); // Ensure a numeric value
      })
      .catch((err) => {
        alert("Something went wrong...");
        console.log(err);
      });
  }, [id, source]);

  const handleEditDoc = (e) => {
    e.preventDefault();

    const data = {
      rid,
      impactRating,
      newMethod,
      newIdntifiedControls,
      newDate,
      newImpact,
      newLikelihood,
      newResidualImpactRating,
    };

    // Determine the correct endpoint for the PUT request based on the source
    let endpoint;
    switch (source) {
      case "qualityRisks":
        endpoint = `http://localhost:5000/api/qualityRisks/edit/${id}`;
        break;
      case "risksIS":
        endpoint = `http://localhost:5000/api/risksIS/edit/${id}`;
        break;
      case "risksBCP":
        endpoint = `http://localhost:5000/api/risksBCP/edit/${id}`;
        break;
      default:
        alert("Invalid source!");
        return;
    }

    axios
      .put(endpoint, data)
      .then(() => {
        handleSuccessAlert();
        navigate("/Risk-Assessment/residualRisk"); // Update with correct path
      })
      .catch((err) => {
        handleErrorAlert();
        console.log(err);
      });
  };

  useEffect(() => {
    setNewResidualImpactRating(newImpact * newLikelihood);
  }, [newImpact, newLikelihood]);

  const handleSuccessAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Record Edited Successfully",
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
    <div className="flex gap-x-10 h-full overflow-y-auto bg-sky-100 rounded-2xl">
      <div className="w-full">
        <h1 className="text-2xl font-bold">Edit Residual Risk</h1>
        <div className="w-full mx-auto p-8">
          <form onSubmit={handleEditDoc}>
            <h1 className="text-lg font-bold">Risk Assesment</h1>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Risk ID
                </label>
                <input
                  type="text"
                  value={rid}
                  readOnly
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Residual Risk Rating
                </label>
                <input
                  type="number"
                  placeholder="Identified New Controls"
                  value={impactRating}
                  readOnly
                  onChange={(e) => setImpactRating(e.target.value)}
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold mt-5">
                Treatment Method
              </label>
              <textarea
                type="text"
                placeholder="Enter Treatment Method"
                value={newMethod}
                onChange={(e) => setNewMethods(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold mt-5">
                Target Control Implementation Date
              </label>
              <input
                type="date"
                placeholder="Enter Implementation Date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold mt-5">
                Identified New Controls
              </label>
              <textarea
                type="text"
                placeholder="Enter New or changed controls to be implemented"
                value={newIdntifiedControls}
                onChange={(e) => setNewIdentifiedControls(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-100"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold mt-5">
                  Risk Impact (I)
                </label>
                <input
                  type="number"
                  placeholder="Enter Risk Impact"
                  value={newImpact}
                  onChange={(e) => setNewImpact(e.target.value)}
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold mt-5">
                  Likelihood (L)
                </label>
                <input
                  type="number"
                  placeholder="Enter Likelihood"
                  value={newLikelihood}
                  onChange={(e) => setNewLikelihood(e.target.value)}
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold mt-5">
                  Residual Risk Impact Rating (I * P)
                </label>
                <input
                  type="number"
                  value={newResidualImpactRating}
                  readOnly
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                />
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-10">
              <button className="px-3 py-2 w-32 rounded-lg bg-[#32a3a9] text-white">
                Save
              </button>
              <Link to="/Risk-Assessment/residualRisk">
                <button className="px-3 py-2 w-32 rounded-lg bg-[#c0426c] text-white">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditResidualRiskAssesement;
