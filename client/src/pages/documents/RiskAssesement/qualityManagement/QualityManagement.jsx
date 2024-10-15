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
  const [isAdminView, setIsAdminView] = useState(false);
  const [sections, setSections] = useState([]);
  const risksPerPage = 5;

  // Fetch all risks
  const fetchRisks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/qualityRisks/"
      );
      const user = await getCurrentUser();
      let section = user.data.section.sectionCode;

      // console.log(section);
      setRisks(response.data);
      setSection(section);
      filterRisks(response.data, section);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sections");
      // console.log(response.data);
      setSections(response.data);
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

  const toggleAdminView = () => {
    setIsAdminView((prev) => !prev);
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
    if (!isAdminView) {
      filterRisks(risks, e.target.value);
    }
  };
  useEffect(() => {
    if (!isAdminView) {
      filterRisks(risks, section);
    } else {
      setFilteredRisks(risks); // Show all risks in admin view
    }
  }, [risks, section, isAdminView]);

  useEffect(() => {
    fetchRisks();
    fetchSections();
  }, [isAdminView]);

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
          Quality Management
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

          <Link to="/createQualityManagement" className="btn-primary">
            Create Risk Assessment
          </Link>
        </div>
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
                <td className="py-2 px-4 w-28 doc-table-data">
                  {r.owner.name}
                </td>
                <td className="py-2 px-4 w-28 doc-table-data">
                  {r.responsibility.name}
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

export default QualityManagement;
