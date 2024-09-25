import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
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
      console.log(filtered);
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

  // Pagination logic
  const indexOfLastRisk = currentPage * risksPerPage;
  const indexOfFirstRisk = indexOfLastRisk - risksPerPage;
  const currentRisks = filteredRisks.slice(indexOfFirstRisk, indexOfLastRisk);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pt-5 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-indigo-900">
          Business Continuity
        </h1>

        <Link to="/createBCPRisk" className="btn-primary">
          Create Risk Assessment
        </Link>
      </div>

      {/* Table */}
      <div className="h-full w-full overflow-auto">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-indigo-200">
            <tr>
              <th className="w-28 doc-table-head">Risk ID</th>
              <th className="w-28 doc-table-head">Risk owner</th>
              <th className="w-28 doc-table-head">Responsible Person</th>
              <th className="w-28 doc-table-head">Description</th>
              <th className="w-28 doc-table-head">Sources</th>
              <th className="w-28 doc-table-head">Assets</th>
              <th className="w-28 doc-table-head">Element</th>
              <th className="w-28 doc-table-head">Objectives</th>
              <th className="w-28 doc-table-head">Controls</th>
              <th className="w-28 doc-table-head">Impact</th>
              <th className="w-28 doc-table-head">Likelihood</th>
              <th className="w-28 doc-table-head">Impact Rating</th>
              <th className="w-28 doc-table-head">Treat Method</th>
              <th className="w-28 doc-table-head">Date</th>
              <th className="w-28 doc-table-head">New Controls</th>
              <th className="w-28 doc-table-head">Residual Impact</th>
              <th className="w-28 doc-table-head">Probability</th>
              <th className="w-28 doc-table-head">Residual Impact Rating</th>
              <th className="w-28 doc-table-head">Status</th>
              <th className="w-28 doc-table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRisks.map((r) => (
              <tr key={r._id}>
                <td className="py-2 px-4 w-28 doc-table-data">{r.rid}</td>
                <td className="py-2 px-4 w-28 doc-table-data">{r.owner}</td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {r.responsibility}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {r.description}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">{r.sources}</td>
                <td className="py-2 px-4 w-28 doc-table-data">{r.assets}</td>
                <td className="py-2 px-4 w-28 doc-table-data">{r.element}</td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {r.objectives}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">{r.controls}</td>
                <td className="py-2 px-4 w-28 doc-table-data">{r.impact}</td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {r.likelihood}
                </td>
                <td
                  className="py-2 px-4 w-28 doc-table-data"
                  style={getRatingStyle(r.impactRating)}
                >
                  {r.impactRating}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {r.treatMethod}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">{r.date}</td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {r.newControls}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {r.residualImpact}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {r.probability}
                </td>
                <td
                  className="py-2 px-4 w-28 doc-table-data"
                  style={getRatingStyle(r.residualImpactRating)}
                >
                  {r.residualImpactRating}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">{r.status}</td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  <div className="flex justify-center gap-2">
                    <Link to={`/editBCPRisk/${r._id}`} className="doc-edit-btn">
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
      </div>
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
  );
};

export default BCPRiskAssesement;
