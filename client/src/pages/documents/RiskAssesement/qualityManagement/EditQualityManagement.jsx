import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditQualityManagement = () => {
  const [rid, setRid] = useState("");
  const [owner, setOwner] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [description, setDescription] = useState("");
  const [sources, setSources] = useState("");
  const [assets, setAssets] = useState("");
  const [element, setElement] = useState("");
  const [objectives, setObjectives] = useState("");
  const [controls, setControls] = useState("");
  const [impact, setImpact] = useState(0);
  const [likelihood, setLikelihood] = useState(0);
  const [impactRating, setImpactRating] = useState(0);
  const [treatMethod, setTreatMethod] = useState("");
  const [date, setDate] = useState("");
  const [newControls, setNewControls] = useState("");
  const [residualImpact, setResidualImpact] = useState(0);
  const [probability, setProbability] = useState(0);
  const [residualImpactRating, setResidualImpactRating] = useState(0);
  const [statement, setStatement] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/qualityRisks/${id}`)
      .then((res) => {
        setRid(res.data.rid);
        setOwner(res.data.owner);
        setResponsibility(res.data.responsibility);
        setDescription(res.data.description);
        setSources(res.data.sources);
        setAssets(res.data.assets);
        setElement(res.data.element);
        setObjectives(res.data.objectives);
        setControls(res.data.controls);
        setImpact(res.data.impact);
        setLikelihood(res.data.likelihood);
        setImpactRating(res.data.impactRating);
        setTreatMethod(res.data.treatMethod);
        setDate(res.data.date);
        setNewControls(res.data.newControls);
        setResidualImpact(res.data.residualImpact);
        setProbability(res.data.probability);
        setResidualImpactRating(res.data.residualImpactRating);
        setStatement(res.data.statement);
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
      owner,
      responsibility,
      description,
      sources,
      assets,
      element,
      objectives,
      controls,
      impact,
      likelihood,
      impactRating,
      treatMethod,
      date,
      newControls,
      residualImpact,
      probability,
      residualImpactRating,
      statement,
    };

    axios
      .put(`http://localhost:5000/api/qualityRisks/edit/${id}`, data)
      .then(() => {
        handleSuccessAlert();
        navigate("/qualityManagement");
      })
      .catch((err) => {
        handleErrorAlert();
        console.log(err);
      });
  };

  // Calculate Impact Rating
  useEffect(() => {
    setImpactRating(impact * likelihood);
  }, [impact, likelihood]);

  // Calculate Residual Impact Rating
  useEffect(() => {
    setResidualImpactRating(residualImpact * probability);
  }, [residualImpact, probability]);

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
        <h1 className="text-2xl font-bold">Edit Quality Mangement</h1>
        <div className="w-full mx-auto p-8">
          <form onSubmit={handleEditDoc}>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold">Risk Assesment</h1>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold mt-5">
                    Risk ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Risk ID"
                    value={rid}
                    onChange={(e) => setRid(e.target.value)}
                    className=" w-[300px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className=" font-semibold mt-5">
                    Risk Owner
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Risk Owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className="w-[300px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className=" font-semibold mt-5">
                    Responsibility
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Risk Owner"
                    value={responsibility}
                    onChange={(e) => setResponsibility(e.target.value)}
                    className="w-[300px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className=" font-semibold mt-5">
                  Risk Description
                </label>
                <textarea
                  type="text"
                  placeholder="Enter Risk Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className=" font-semibold mt-5">
                  Sources and causes of risk
                </label>
                <textarea
                  type="text"
                  placeholder="Enter Sources and causes of risk"
                  value={sources}
                  onChange={(e) => setSources(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold mt-5">
                    Affected Assets
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Affected Asset"
                    value={assets}
                    onChange={(e) => setAssets(e.target.value)}
                    className=" w-[450px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className=" font-semibold mt-5">
                    Risk Element
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Risk Element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                    className="w-[450px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className=" font-semibold mt-5">
                  Affected Business Unit BCP Objectives
                </label>
                <textarea
                  type="text"
                  placeholder="Enter Sources and causes of risk"
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className=" font-semibold mt-5">
                  Controls Already Implemented
                </label>
                <textarea
                  type="text"
                  placeholder="Enter Sources and causes of risk"
                  value={controls}
                  onChange={(e) => setControls(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className=" font-semibold mt-5">
                    Likelihood (L)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Risk Element"
                    value={likelihood}
                    onChange={(e) => setLikelihood(e.target.value)}
                    className="w-[300px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold mt-5">
                    Risk Impact (I)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Affected Asset"
                    value={impact}
                    onChange={(e) => setImpact(e.target.value)}
                    className=" w-[300px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className=" font-semibold mt-5">
                    Risk Impact Rating (I * L)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Risk Element"
                    value={impactRating}
                    onChange={(e) => setImpactRating(e.target.value)}
                    className="w-[300px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
              </div>

              <h1 className="text-lg font-bold mt-8">Risk Treatment</h1>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold mt-5">
                    Risk Treatment Method
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Affected Asset"
                    value={treatMethod}
                    onChange={(e) => setTreatMethod(e.target.value)}
                    className=" w-[450px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className=" font-semibold mt-5">
                    Target Control Implementation Date
                  </label>
                  <input
                    type="date"
                    placeholder="Enter Risk Element"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-[450px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className=" font-semibold mt-5">
                  Identified New Controls
                </label>
                <textarea
                  type="text"
                  placeholder="Enter Risk Description"
                  value={newControls}
                  onChange={(e) => setNewControls(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100"
                />
              </div>
              <h1 className="text-lg font-bold mt-8">Residual Risk</h1>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold mt-5">
                    Impact (I)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Affected Asset"
                    value={residualImpact}
                    onChange={(e) => setResidualImpact(e.target.value)}
                    className=" w-[300px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className=" font-semibold mt-5">
                    Probability (P)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Risk Element"
                    value={probability}
                    onChange={(e) => setProbability(e.target.value)}
                    className="w-[300px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className=" font-semibold mt-5">
                    Residual Risk Impact Rating (I * P)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Risk Element"
                    value={residualImpactRating}
                    onChange={(e) => setResidualImpactRating(e.target.value)}
                    className="w-[300px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
              </div>

              <h1 className="text-lg font-bold mt-8">Risk Statement</h1>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className=" font-semibold mt-5">
                  Risk Statement
                </label>
                <textarea
                  type="text"
                  placeholder="Enter Risk Description"
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100"
                />
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-10">
              <button className="px-3 py-2 w-32 rounded-lg bg-[#32a3a9] text-white">
                Save
              </button>
              <Link to="/qualityManagement">
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

export default EditQualityManagement;
