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
  const [isAdminView, setIsAdminView] = useState(false);
  const [sections, setSections] = useState([]);

  const risksPerPage = 10;

  const getRatingStyle = (rating) => {
    if (rating == null) {
      return null;
    } else if (rating >= 12) {
      return { backgroundColor: "red", color: "black" };
    } else if (rating >= 6) {
      return { backgroundColor: "orange", color: "black" };
    } else {
      return { backgroundColor: "green", color: "white" };
    }
  };

  const fetchBCPRisks = async () => {
    try {
      const bcpResponse = await axios.get(
        "http://localhost:5000/api/risksBCP/"
      );
      const isResponse = await axios.get("http://localhost:5000/api/risksIS/");
      const qmResponse = await axios.get(
        "http://localhost:5000/api/qualityRisks/"
      );
      const user = await getCurrentUser();
      let section = user.data.section.sectionCode;
      const filteredBCPRisks = bcpResponse.data
        .filter((item) => item.residualImpactRating >= 12)
        .map((risk) => ({ ...risk, source: "risksBCP" }));

      const filterIsRisks = isResponse.data
        .filter((item) => item.residualImpactRating >= 12)
        .map((risk) => ({ ...risk, source: "risksIS" }));

      const filterQmRisks = qmResponse.data
        .filter((item) => item.residualImpactRating >= 12)
        .map((risk) => ({ ...risk, source: "qualityRisks" }));
      setSection(section);
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
  const fetchAndFilterRisks = (selectedSection) => {
    const filtered = combinedRisks.filter((risk) => {
      const sectionIdentifier = risk.rid.split("-")[1];
      return sectionIdentifier === selectedSection;
    });
    setFilteredRisks(filtered);
  };

  const fetchSections = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sections");
      setSections(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAdminView = () => {
    setIsAdminView((prev) => !prev);
  };

  const handleSectionChange = (e) => {
    const selectedSection = e.target.value;
    setSection(selectedSection);

    if (!isAdminView) {
      fetchAndFilterRisks(selectedSection);
    } else {
      filterRisks(combinedRisks, section);
    }
  };

  const filterRisks = async (risks, section) => {
    try {
      const filtered = risks.filter((risk) => {
        const sectionIdentifier = risk.rid.split("-")[1];
        return sectionIdentifier === section;
      });
      setFilteredRisks(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBCPRisks();
    fetchSections();
  }, [isAdminView]);

  useEffect(() => {
    if (!isAdminView && section) {
      fetchAndFilterRisks(section);
    } else {
      setFilteredRisks(combinedRisks); // Show all risks in admin view
    }
  }, [bcpRisks, isRisks, qmRisks, isAdminView, section]);

  // Pagination logic
  const indexOfLastRisk = currentPage * risksPerPage;
  const indexOfFirstRisk = indexOfLastRisk - risksPerPage;
  const currentRisks = filteredRisks.slice(indexOfFirstRisk, indexOfLastRisk);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Residual Risk Assessment
        </h1>
        <div className="flex space-x-4">
          <button onClick={toggleAdminView} className="btn-primary">
            {isAdminView ? "Default View" : "Admin View"}
          </button>

          <select
            className="border rounded px-3 py-2"
            value={section}
            onChange={handleSectionChange}
          >
            <option value="">Select Section</option>
            {sections.map((sec) => (
              <option key={sec._id} value={sec.sectionCode}>
                {sec.name} ({sec.sectionCode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-28 doc-table-head">Risk ID</th>
              <th className="w-28 doc-table-head">Residual Risk Rating</th>
              <th className="w-28 doc-table-head">Treatment Method</th>
              <th className="w-28 doc-table-head">Identified New Controls</th>
              <th className="w-28 doc-table-head">
                Target Control Implementation completion Date
              </th>
              <th className="w-28 doc-table-head">Impact</th>
              <th className="w-28 doc-table-head">Likelihood</th>
              <th className="w-28 doc-table-head">
                Residual Risk Impact Rating
              </th>
              <th className="w-28 doc-table-head">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRisks.map((r) => (
              <tr key={r._id}>
                <td className="py-2 px-4 w-28 doc-table-data">{r.rid}</td>
                <td
                  className="py-2 px-4 w-28 doc-table-data"
                  style={getRatingStyle(r.residualImpactRating)}
                >
                  {r.residualImpactRating}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">{r.newMethod}</td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {r.newIdntifiedControls}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">{r.newDate}</td>
                <td className="py-2 px-4 w-28 doc-table-data">{r.newImpact}</td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {r.newLikelihood}
                </td>
                <td
                  className="py-2 px-4 w-28 doc-table-data"
                  style={getRatingStyle(r.newResidualImpactRating)}
                >
                  {r.newResidualImpactRating}
                </td>

                <td className="py-2 px-4 w-28 doc-table-data">
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
