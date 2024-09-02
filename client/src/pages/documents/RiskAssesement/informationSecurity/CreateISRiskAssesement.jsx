import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getCurrentUser } from "../../../../services/userApi";
import {
  getAllCategories,
  getItemsInCategory,
} from "../../../../services/riskElementsApi";

const CreateISRiskAssesement = () => {
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
  const [riskItems, setRiskItems] = useState([]);

  const [isOptions, setIsOptions] = useState([]);

  const navigate = useNavigate();

  const fetchLastRecord = async () => {
    try {
      // Assuming your endpoint is correct and returns the last record
      const response = await axios.get(
        "http://localhost:5000/api/risksIS/last"
      );
      const user = await getCurrentUser();
      let section = user.data.section;
      if (section === "Information Technology (IT)") {
        section = "ITSE";
      } else if (section === "Marketing") {
        section = "MARC";
      } else if (section === "Sales") {
        section = "SALE";
      } else if (section === "Human Resources(HR)") {
        section = "HRMA";
      } else if (section === "Finance") {
        section = "FINA";
      } else if (section === "Operations") {
        section = "OPER";
      } else if (section === "Customer Service") {
        section = "CUSE";
      }
      // console.log(section);
      const lastRecord = response.data;
      // console.log(lastRecord.rid);

      const currentYear = new Date().getFullYear().toString().slice(-2);
      let newIndex = 1;
      let paddedIndex = newIndex;

      if (lastRecord && lastRecord.rid) {
        const lastIndex = parseInt(lastRecord.rid.slice(12), 10);
        // console.log(lastIndex);
        newIndex = lastIndex + 1;
        // console.log(lastIndex);
        // newIndex = 23;
        paddedIndex = String(newIndex).padStart(3, "0");
      }

      // console.log(lastRecord);

      setRid(`ISR-${section}-${currentYear}${paddedIndex}`);
    } catch (error) {
      console.error("Error fetching the last record:", error);
    }
  };

  // const fetchCategory = async () => {
  //   try {
  //     const response = await getAllCategories();
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchRiskElements = async () => {
    try {
      const response = await getItemsInCategory("Information Security");
      // console.log(response.data);
      const riskElemets = response.data.map((item) => item.name);
      // console.log(riskElemets);
      setRiskItems(riskElemets);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchISObjectives = async () => {
    try {
      const response = await axios.get("http://localhost:5000/objectives");
      const isOptions = response.data.map((item) => item.businessContinuity);
      setIsOptions(isOptions);
      // console.log(isOptions);
    } catch (error) {
      console.log(error);
    }
  };

  // Auto increment ID
  useEffect(() => {
    fetchLastRecord();
    fetchISObjectives();
    // fetchCategory();
    fetchRiskElements();
  }, []);

  // Calculate Impact Rating
  useEffect(() => {
    setImpactRating(impact * likelihood);
  }, [impact, likelihood]);

  // Calculate Residual Impact Rating
  useEffect(() => {
    setResidualImpactRating(residualImpact * probability);
  }, [residualImpact, probability]);

  const handleaddDoc = (e) => {
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
      .post("http://localhost:5000/api/risksIS/add", data)
      .then(() => {
        handleSuccessAlert();
        // Update the index in localStorage
        const currentIndex = localStorage.getItem("currentIndex");
        const newIndex = currentIndex ? parseInt(currentIndex, 10) + 1 : 1;
        localStorage.setItem("currentIndex", newIndex);
        navigate("/informationSecurity");
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
    // <div className="container mx-auto py-8">
    <div className="flex gap-x-10 h-full overflow-y-auto bg-sky-100 rounded-2xl">
      <div className=" w-full">
        <h1 className="text-2xl font-bold">Add New Risk Assesement</h1>
        <div className="w-full mx-auto p-8">
          <form onSubmit={handleaddDoc}>
            <div className="flex flex-col gap-2">
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
                  <label htmlFor="" className="font-semibold">
                    Responsibility
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Responsibility"
                    value={responsibility}
                    onChange={(e) => setResponsibility(e.target.value)}
                    className="w-[300px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold mt-5">
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
                <label htmlFor="" className="font-semibold mt-5">
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
                    className="w-[450px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="riskElement" className="font-semibold mt-5">
                    Risk Element
                  </label>
                  <select
                    id="riskElement"
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                    className="p-2 rounded-lg bg-slate-100"
                  >
                    <option value="" disabled>
                      {" "}
                      Select
                    </option>
                    {riskItems.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="objectives" className="font-semibold mt-5">
                  Affected Business Unit BCP Objectives
                </label>
                <select
                  id="objectives"
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100"
                >
                  <option value="" disabled>
                    Select Objective
                  </option>
                  {isOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold mt-5">
                  Controls Already Implemented
                </label>
                <textarea
                  type="text"
                  placeholder="Enter Controls"
                  value={controls}
                  onChange={(e) => setControls(e.target.value)}
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

                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold mt-5">
                    Risk Impact Rating (I * L)
                  </label>
                  <input
                    type="number"
                    value={impactRating}
                    readOnly
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
                  value={newControls}
                  onChange={(e) => setNewControls(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold mt-5">
                    Residual Impact (I)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Residual Impact"
                    value={residualImpact}
                    onChange={(e) => setResidualImpact(e.target.value)}
                    className="w-[300px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold mt-5">
                    Probability (P)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Probability"
                    value={probability}
                    onChange={(e) => setProbability(e.target.value)}
                    className="w-[300px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
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

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold mt-5">
                  Risk Statement
                </label>
                <textarea
                  type="text"
                  placeholder="Enter Statement"
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
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
                <Link to="/informationSecurity">
                  <button className="p-2 w-32 bg-red-500 text-white rounded-lg font-semibold">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default CreateISRiskAssesement;
