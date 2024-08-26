import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditResidualRiskAssesement = () => {
  const [rid, setRid] = useState("");
  const [identifiedControls, setIdentifiedControls] = useState("");
  const [impact, setImpact] = useState(0);
  const [likelihood, setLikelihood] = useState(0);
  const [treatMethod, setTreatMethod] = useState("");
  const [date, setDate] = useState("");
  const [residualRiskRating, setResidualRiskRating] = useState(0);
  const [residualImpactRating, setResidualImpactRating] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/residualRisks/${id}`)
      .then((res) => {
        setRid(res.data.rid);
        setIdentifiedControls(res.data.identifiedControls);
        setImpact(res.data.impact);
        setLikelihood(res.data.likelihood);
        setTreatMethod(res.data.treatMethod);
        setDate(res.data.date);
        setResidualRiskRating(res.data.residualRiskRating);
        setResidualImpactRating(res.data.residualImpactRating);
      })
      .catch((err) => {
        alert("Something went wrong...");
        console.log(err);
      });
  }, [id]);

  const handleEditDoc = (e) => {
    e.preventDefault();

    const data = {
      rid,
      identifiedControls,
      impact,
      likelihood,
      treatMethod,
      date,
      residualRiskRating,
      residualImpactRating,
    };

    axios
      .put(`http://localhost:5000/api/residualRisks/edit/${id}`, data)
      .then(() => {
        handleSuccessAlert();
        navigate("/residualRisk");
      })
      .catch((err) => {
        handleErrorAlert();
        console.log(err);
      });
  };

  useEffect(() => {
    setResidualImpactRating(impact * likelihood);
  }, [impact, likelihood]);

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
    // <div className="container mx-auto py-8">
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
                  value={residualRiskRating}
                  onChange={(e) => setResidualRiskRating(e.target.value)}
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-between"></div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold mt-5">
                Treatment Method
              </label>
              <textarea
                type="text"
                placeholder="Enter Treatment Method"
                value={treatMethod}
                onChange={(e) => setTreatMethod(e.target.value)}
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
                value={identifiedControls}
                onChange={(e) => setIdentifiedControls(e.target.value)}
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
                  value={impact}
                  onChange={(e) => setImpact(e.target.value)}
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
                  value={likelihood}
                  onChange={(e) => setLikelihood(e.target.value)}
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
                  value={residualImpactRating}
                  readOnly
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                />
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-10">
              <button className="px-3 py-2 w-32 rounded-lg bg-[#32a3a9] text-white">
                Save
              </button>
              <Link to="/riskAssesements">
                <button className="px-3 py-2 w-32 rounded-lg bg-[#c0426c] text-white">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default EditResidualRiskAssesement;
