import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import RiskAssNavigation from "../../../../components/RiskAssNavigation";

const ResidualRiskAssesement = () => {
  const [risks, setRisks] = useState([]);
  const [bcpRisks, setBCPRisks] = useState([]);
  const [isRisks, setIsRisks] = useState([]);
  const [qmRisks, setQmRisks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const risksPerPage = 5;

  const fetchBCPRisks = async () => {
    try {
      const bcpResponse = await axios.get(
        "http://localhost:5000/api/risksBCP/"
      );
      const isResponse = await axios.get("http://localhost:5000/api/risksIS/");
      const qmResponse = await axios.get(
        "http://localhost:5000/api/qualityRisks/"
      );

      const filteredBCPRisks = bcpResponse.data
        .filter((item) => item.residualImpactRating > 12)
        .map((risk) => ({ ...risk, source: "risksBCP" })); // Add source here

      const filterIsRisks = isResponse.data
        .filter((item) => item.residualImpactRating > 12)
        .map((risk) => ({ ...risk, source: "risksIS" })); // Add source here

      const filterQmRisks = qmResponse.data
        .filter((item) => item.residualImpactRating > 12)
        .map((risk) => ({ ...risk, source: "qualityRisks" })); // Add source here

      setBCPRisks(filteredBCPRisks);
      setIsRisks(filterIsRisks);
      setQmRisks(filterQmRisks);
    } catch (error) {
      console.log(error);
    }
  };

  const combinedRisks = [...bcpRisks, ...isRisks, ...qmRisks];

  // Fetch all risks
  const fetchRisks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/residualRisks/"
      );
      setRisks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRisks();
    fetchBCPRisks();
  }, []);

  // Delete a risk with SweetAlert2 confirmation
  const deleteRisk = async (id, source) => {
    console.log("Deleting Risk ID:", id, "Source:", source); // Log id and source here
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:5000/api/${source}/delete/${id}`
          );
          setRisks(risks.filter((risk) => risk._id !== id));
          Swal.fire("Deleted!", "Your risk has been deleted.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error!",
            "There was a problem deleting the risk.",
            "error"
          );
        }
      }
    });
  };

  // Pagination logic
  const indexOfLastRisk = currentPage * risksPerPage;
  const indexOfFirstRisk = indexOfLastRisk - risksPerPage;
  const currentRisks = combinedRisks.slice(indexOfFirstRisk, indexOfLastRisk);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full h-full flex flex-col p-5 bg-sky-100 rounded-2xl">
      <h1 className="text-2xl font-bold text-green-500">Risk Management</h1>
      <RiskAssNavigation />
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-2xl font-bold text-blue-900">
          Information Security
        </h1>
        {/* <Link to="/createResidualRisk">
          <button className="bg-green-500 text-white rounded-lg font-semibold py-1 px-3">
            Create Risk Assessment
          </button>
        </Link> */}
      </div>

      {/* Table */}
      <div className="mt-8 overflow-auto h-full">
        <table className="border-2 bg-cyan-50">
          <thead>
            <tr>
              <th className="border-2 px-2 py-2">Risk ID</th>
              <th className="border-2 px-2 py-2">Residual Risk Rating</th>
              <th className="border-2 px-2 py-2">Treatment Method</th>
              <th className="border-2 px-2 py-2">Identified New Controls</th>
              <th className="border-2 px-2 py-2">
                Target Control Implementation completion Date
              </th>
              <th className="border-2 px-2 py-2">Impact</th>
              <th className="border-2 px-2 py-2">Liklihood</th>
              <th className="border-2 px-2 py-2">
                Residual Risk Impact Rating
              </th>
              <th className="border-2 px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRisks.map((r) => (
              <tr key={r._id}>
                <td className="border-2 text-normal px-2">{r.rid}</td>
                <td className="border-2 text-normal px-2">
                  {r.residualImpactRating}
                </td>
                <td className="border-2 text-normal px-2">{r.newMethod}</td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.newIdntifiedControls}
                </td>
                <td className="border-2 text-normal px-4 py-3">{r.newDate}</td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.newImpact}
                </td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.newLikelihood}
                </td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.newResidualImpactRating}
                </td>

                <td className="border-2 text-normal px-4 py-3">
                  <div className="flex gap-3">
                    <Link to={`/editResidualRisk/${r._id}/${r.source}`}>
                      <button className="px-4 py-1 rounded-lg bg-blue-600 text-white font-semibold">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteRisk(r._id, r.source)}
                      className="px-4 py-1 rounded-lg bg-red-600 text-white font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-start mt-4">
          {Array.from(
            { length: Math.ceil(risks.length / risksPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 mx-1 border ${
                  currentPage === i + 1 ? "bg-gray-300" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ResidualRiskAssesement;
