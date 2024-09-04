import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import RiskAssNavigation from "../../../../components/RiskAssNavigation";
import { getCurrentUser } from "../../../../services/userApi";

const ResidualRiskAssesement = () => {
  const [risks, setRisks] = useState([]);
  const [bcpRisks, setBCPRisks] = useState([]);
  const [isRisks, setIsRisks] = useState([]);
  const [qmRisks, setQmRisks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRisks, setFilteredRisks] = useState([]);
  const [section, setSection] = useState("");

  const risksPerPage = 10;

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
        .map((risk) => ({ ...risk, source: "risksBCP" }));

      const filterIsRisks = isResponse.data
        .filter((item) => item.residualImpactRating > 12)
        .map((risk) => ({ ...risk, source: "risksIS" }));

      const filterQmRisks = qmResponse.data
        .filter((item) => item.residualImpactRating > 12)
        .map((risk) => ({ ...risk, source: "qualityRisks" }));

      setBCPRisks(filteredBCPRisks);
      setIsRisks(filterIsRisks);
      setQmRisks(filterQmRisks);
    } catch (error) {
      console.log(error);
    }
  };

  // Combine all risks
  const combinedRisks = [...bcpRisks, ...isRisks, ...qmRisks];

  // Fetch risks and filter by section
  const fetchAndFilterRisks = async () => {
    try {
      const user = await getCurrentUser();
      let section = user.data.section;
      console.log(user.data);

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

      setSection(section);
      // console.log(combinedRisks);
      const filtered = combinedRisks.filter((risk) => {
        const sectionIdentifier = risk.rid.split("-")[1];
        return sectionIdentifier === section;
      });

      setFilteredRisks(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBCPRisks();
  }, []);

  useEffect(() => {
    fetchAndFilterRisks();
  }, [bcpRisks, isRisks, qmRisks]);

  // Pagination logic
  const indexOfLastRisk = currentPage * risksPerPage;
  const indexOfFirstRisk = indexOfLastRisk - risksPerPage;
  const currentRisks = filteredRisks.slice(indexOfFirstRisk, indexOfLastRisk);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full h-full flex flex-col p-5 bg-sky-100 rounded-2xl">
      <h1 className="text-2xl font-bold text-green-500">Risk Management</h1>
      <RiskAssNavigation />
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-2xl font-bold text-blue-900">
          Information Security
        </h1>
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
              <th className="border-2 px-2 py-2">Likelihood</th>
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
            { length: Math.ceil(filteredRisks.length / risksPerPage) },
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
