import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      let section = user.data.section.sectionCode;
      // console.log(user.data);

      // if (section === "Information Technology (IT)") {
      //   section = "ITSE";
      // } else if (section === "Marketing") {
      //   section = "MARC";
      // } else if (section === "Sales") {
      //   section = "SALE";
      // } else if (section === "Human Resources(HR)") {
      //   section = "HRMA";
      // } else if (section === "Finance") {
      //   section = "FINA";
      // } else if (section === "Operations") {
      //   section = "OPER";
      // } else if (section === "Customer Service") {
      //   section = "CUSE";
      // }

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
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900"></h1>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="w-28 doc-table-border">Risk ID</th>
              <th className="w-28 doc-table-border">Residual Risk Rating</th>
              <th className="w-28 doc-table-border">Treatment Method</th>
              <th className="w-28 doc-table-border">Identified New Controls</th>
              <th className="w-28 doc-table-border">
                Target Control Implementation completion Date
              </th>
              <th className="w-28 doc-table-border">Impact</th>
              <th className="w-28 doc-table-border">Likelihood</th>
              <th className="w-28 doc-table-border">
                Residual Risk Impact Rating
              </th>
              <th className="w-28 doc-table-border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRisks.map((r) => (
              <tr key={r._id}>
                <td className="py-2 px-4 w-28 doc-table-border">{r.rid}</td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.residualImpactRating}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.newMethod}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.newIdntifiedControls}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">{r.newDate}</td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.newImpact}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.newLikelihood}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.newResidualImpactRating}
                </td>

                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editResidualRisk/${r._id}/${r.source}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteRisk(r._id, r.source)}
                      className="doc-delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
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
