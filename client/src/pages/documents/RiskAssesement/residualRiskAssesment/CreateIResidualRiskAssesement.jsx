import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateIResidualRiskAssesement = () => {
  const [rid, setRid] = useState("");
  const [identifiedControls, setIdentifiedControls] = useState("");
  const [impact, setImpact] = useState(0);
  const [likelihood, setLikelihood] = useState(0);
  const [treatMethod, setTreatMethod] = useState("");
  const [date, setDate] = useState("");
  const [residualRiskRating, setResidualRiskRating] = useState(0);
  const [residualImpactRating, setResidualImpactRating] = useState(0);

  const navigate = useNavigate();

  // Auto increment ID
  useEffect(() => {
    const fetchLastRecord = async () => {
      try {
        // Assuming your endpoint is correct and returns the last record
        const response = await axios.get(
          "http://localhost:5000/api/residualRisks/last"
        );
        const lastRecord = response.data;

        const currentYear = new Date().getFullYear();
        let newIndex = 1;

        if (lastRecord && lastRecord.rid) {
          const lastIndex = parseInt(lastRecord.rid.slice(9), 10);
          newIndex = lastIndex + 1;
        }
        console.log(lastRecord);

        setRid(`RRA-${currentYear}-${newIndex}`);
      } catch (error) {
        console.error("Error fetching the last record:", error);
      }
    };

    fetchLastRecord();
  }, []);

  // Calculate Impact Rating
  useEffect(() => {
    setResidualImpactRating(impact * likelihood);
  }, [impact, likelihood]);

  // Calculate Residual Impact Rating
  // useEffect(() => {
  //   setResidualImpactRating(residualImpact * probability);
  // }, [residualImpact, probability]);

  const handleaddDoc = (e) => {
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
      .post("http://localhost:5000/api/residualRisks/add", data)
      .then(() => {
        handleSuccessAlert();
        // Update the index in localStorage
        const currentIndex = localStorage.getItem("currentIndex");
        const newIndex = currentIndex ? parseInt(currentIndex, 10) + 1 : 1;
        localStorage.setItem("currentIndex", newIndex);
        navigate("/Risk-Assessment/residualRisk");
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
        <h1 className="text-2xl font-bold">Add New Residual Risk Assesement</h1>
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

              <div className="flex justify-start gap-2 mt-5">
                <button
                  type="submit"
                  className="p-2 w-32 bg-sky-600 text-white rounded-lg font-semibold"
                >
                  Save
                </button>
                <Link to="/Risk-Assessment/residualRisk">
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

export default CreateIResidualRiskAssesement;
