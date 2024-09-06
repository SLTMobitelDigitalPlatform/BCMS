import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import RiskAssNavigation from "../../../../components/RiskAssNavigation";
import { getCurrentUser } from "../../../../services/userApi";

const BCPRiskAssesement = () => {
  const [risks, setRisks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRisks, setFilteredRisks] = useState([]);
  const [section, setSection] = useState("");
  const risksPerPage = 5;

  // Fetch all risks
  const fetchRisks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/risksBCP/");
      const user = await getCurrentUser();
      let section = user.data.section.sectionCode;
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
      // console.log(section);
      setRisks(response.data);
      setSection(section);
      filterRisks(response.data, section);
    } catch (error) {
      console.error(error);
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
    filterRisks(risks, section);
  }, [risks, section]);

  useEffect(() => {
    fetchRisks();
  }, []);

  // Delete a risk with SweetAlert2 confirmation
  const deleteRisk = async (id) => {
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
          await axios.delete(`http://localhost:5000/api/risksBCP/delete/${id}`);
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
  const currentRisks = filteredRisks.slice(indexOfFirstRisk, indexOfLastRisk);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full h-full flex flex-col p-5 bg-sky-100 rounded-2xl">
      <h1 className="text-2xl font-bold text-green-500">Risk Management</h1>
      <RiskAssNavigation />

      <div className="flex justify-between items-center mt-8">
        <h1 className="text-2xl font-bold text-blue-900">BCP</h1>
        <Link to="/createBCPRisk">
          <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
            Create Risk Assessment
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="mt-8 overflow-auto h-full">
        <table className="border-2 bg-cyan-50">
          <thead>
            <tr>
              <th className="border-2 px-2 py-2">Risk ID</th>
              <th className="border-2 px-2 py-2">Risk owner</th>
              <th className="border-2 px-2 py-2">Responsible Person</th>
              <th className="border-2 px-2 py-2">Description</th>
              <th className="border-2 px-2 py-2">Sources</th>
              <th className="border-2 px-2 py-2">Assets</th>
              <th className="border-2 px-2 py-2">Element</th>
              <th className="border-2 px-2 py-2">Objectives</th>
              <th className="border-2 px-2 py-2">Controls</th>
              <th className="border-2 px-2 py-2">Impact</th>
              <th className="border-2 px-2 py-2">Likelihood</th>
              <th className="border-2 px-2 py-2">Impact Rating</th>
              <th className="border-2 px-2 py-2">Treat Method</th>
              <th className="border-2 px-2 py-2">Date</th>
              <th className="border-2 px-2 py-2">New Controls</th>
              <th className="border-2 px-2 py-2">Residual Impact</th>
              <th className="border-2 px-2 py-2">Probability</th>
              <th className="border-2 px-2 py-2">Residual Impact Rating</th>
              <th className="border-2 px-2 py-2">Statement</th>
              <th className="border-2 px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRisks.map((r) => (
              <tr key={r._id}>
                <td className="border-2 text-normal px-2">{r.rid}</td>
                <td className="border-2 text-normal px-2">{r.owner}</td>
                <td className="border-2 text-normal px-2">
                  {r.responsibility}
                </td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.description}
                </td>
                <td className="border-2 text-normal px-4 py-3">{r.sources}</td>
                <td className="border-2 text-normal px-4 py-3">{r.assets}</td>
                <td className="border-2 text-normal px-4 py-3">{r.element}</td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.objectives}
                </td>
                <td className="border-2 text-normal px-4 py-3">{r.controls}</td>
                <td className="border-2 text-normal px-4 py-3">{r.impact}</td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.likelihood}
                </td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.impactRating}
                </td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.treatMethod}
                </td>
                <td className="border-2 text-normal px-4 py-3">{r.date}</td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.newControls}
                </td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.residualImpact}
                </td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.probability}
                </td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.residualImpactRating}
                </td>
                <td className="border-2 text-normal px-4 py-3">
                  {r.statement}
                </td>
                <td className="border-2 text-normal px-4 py-3">
                  <div className="flex gap-3">
                    <Link to={`/editBCPRisk/${r._id}`}>
                      <button className="px-4 py-1 rounded-lg bg-blue-600 text-white font-semibold">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteRisk(r._id)}
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

export default BCPRiskAssesement;
