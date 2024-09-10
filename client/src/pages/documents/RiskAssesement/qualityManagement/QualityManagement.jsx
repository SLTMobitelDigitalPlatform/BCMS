import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getCurrentUser } from "../../../../services/userApi";

const QualityManagement = () => {
  const [risks, setRisks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRisks, setFilteredRisks] = useState([]);
  const [section, setSection] = useState("");
  const risksPerPage = 5;

  // Fetch all risks
  const fetchRisks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/qualityRisks/"
      );
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
          await axios.delete(
            `http://localhost:5000/api/qualityRisks/delete/${id}`
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
  const currentRisks = filteredRisks.slice(indexOfFirstRisk, indexOfLastRisk);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-5 pt-4 pb-16 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Quality Management
        </h1>

        <Link
          to="/createQualityManagement"
          className="btn-primary font-semibold"
        >
          Create Risk Assessment
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed relative w-full py-10 bg-cyan-50">
          <thead className="sticky top-0 bg-indigo-800 text-white doc-table-border">
            <tr>
              <th className="w-28 doc-table-border">Risk ID</th>
              <th className="w-28 doc-table-border">Risk owner</th>
              <th className="w-28 doc-table-border">Responsible Person</th>
              <th className="w-28 doc-table-border">Description</th>
              <th className="w-28 doc-table-border">Sources</th>
              <th className="w-28 doc-table-border">Assets</th>
              <th className="w-28 doc-table-border">Element</th>
              <th className="w-28 doc-table-border">Objectives</th>
              <th className="w-28 doc-table-border">Controls</th>
              <th className="w-28 doc-table-border">Impact</th>
              <th className="w-28 doc-table-border">Likelihood</th>
              <th className="w-28 doc-table-border">Impact Rating</th>
              <th className="w-28 doc-table-border">Treat Method</th>
              <th className="w-28 doc-table-border">Date</th>
              <th className="w-28 doc-table-border">New Controls</th>
              <th className="w-28 doc-table-border">Residual Impact</th>
              <th className="w-28 doc-table-border">Probability</th>
              <th className="w-28 doc-table-border">Residual Impact Rating</th>
              <th className="w-28 doc-table-border">Statement</th>
              <th className="w-28 doc-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRisks.map((r) => (
              <tr key={r._id}>
                <td className="py-2 px-4 w-28 doc-table-border">{r.rid}</td>
                <td className="py-2 px-4 w-28 doc-table-border">{r.owner}</td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.responsibility}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.description}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">{r.sources}</td>
                <td className="py-2 px-4 w-28 doc-table-border">{r.assets}</td>
                <td className="py-2 px-4 w-28 doc-table-border">{r.element}</td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.objectives}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.controls}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">{r.impact}</td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.likelihood}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.impactRating}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.treatMethod}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">{r.date}</td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.newControls}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.residualImpact}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.probability}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.residualImpactRating}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  {r.statement}
                </td>
                <td className="py-2 px-4 w-28 doc-table-border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/editQualityManagement/${r._id}`}
                      className="doc-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteRisk(r._id)}
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

export default QualityManagement;
