import axios from "axios";
import { useEffect, useState } from "react";
import Formtable from "./Formtable";
import Pagination from "./Pagination";

axios.defaults.baseURL = "http://localhost:5000";

function Employee() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    serviceNumber: "",
    designation: "",
    email: "",
    role: "",
    section: "",
    contactNumber: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    serviceNumber: "",
    designation: "",
    email: "",
    role: "",
    section: "",
    contactNumber: "",
    _id: "",
  });

  const [dataList, setDataList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/user/register", formData);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);

      getFetchData();
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (data) {
      setDataList(data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const response = await axios.delete(`/user/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setDataList((prevDataList) =>
            prevDataList.filter((user) => user._id !== id)
          );
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting user:", error.response?.data || error);
        alert("An error occurred while deleting the user.");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updatedData } = formDataEdit;
      const response = await axios.put(`/user/update/${_id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        alert(response.data.message);
        setEditSection(false);
        getFetchData();
      }
    } catch (error) {
      console.error("Error updating user:", error.response.data);
      alert("An error occurred while updating the user.");
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  // Updated filtering logic
  const filteredDataList = dataList.filter((el) =>
    Object.values(el).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredDataList.length / itemsPerPage);
  const paginatedDataList = filteredDataList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = paginatedDataList.map((el) => el._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (e, id) => {
    if (e.target.checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    }
  };

  return (
    <div>
      {/* Main Content */}
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h1 className="topic">Employee</h1>

          <input
            type="text"
            placeholder="Search"
            className="border border-green-500 rounded-xl w-96 px-2 py-2"
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;
              // Regular expression to allow only letters, numbers, and spaces
              const regex = /^[a-zA-Z0-9 ]*$/;

              if (regex.test(value)) {
                setSearchTerm(value);
              }
            }}
          />

          <button
            className="btn-primary text-white font-medium"
            onClick={() => setAddSection(true)}
          >
            Add Employee
          </button>
        </div>

        {addSection && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg p-8 w-full max-w-2xl z-50">
              <Formtable
                handleSubmit={handleSubmit}
                handleOnChange={handleOnChange}
                handleclose={() => setAddSection(false)}
                rest={formData}
              />
            </div>
          </div>
        )}

        {editSection && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg p-8 w-full max-w-2xl z-50">
              <Formtable
                handleSubmit={handleUpdate}
                handleOnChange={handleEditOnChange}
                handleclose={() => setEditSection(false)}
                rest={formDataEdit}
              />
            </div>
          </div>
        )}

        <div className="mt-5">
          <table className="table-auto w-full min-w-full bg-white border border-green-500">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-1 border border-green-500">Name</th>
                <th className="p-1 border border-green-500">Service Number</th>
                <th className="p-1 border border-green-500">Designation</th>
                <th className="p-1 border border-green-500">Email</th>
                <th className="p-1 border border-green-500">Role</th>
                <th className="p-1 border border-green-500">Section</th>
                <th className="p-1 border border-green-500">Contact Number</th>
                <th className="p-1 border border-green-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDataList.length > 0 ? (
                paginatedDataList.map((el) => (
                  <tr key={el._id} className="hover:bg-gray-200">
                    {/* <td className="border border-green-500 p-1 text-blue-900">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(el._id)}
                          onChange={(e) => handleSelect(e, el._id)}
                        />
                      </td> */}
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {el.name}
                    </td>
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {el.serviceNumber}
                    </td>
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {el.designation}
                    </td>
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {el.email}
                    </td>
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {el.role}
                    </td>
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {el.section}
                    </td>
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {el.contactNumber}
                    </td>
                    <td className="border border-green-500 p-1">
                      <div className="flex space-x-2">
                        <button
                          className="btn-secondary px-2 py-1 rounded-lg font-medium"
                          onClick={() => handleEdit(el)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg font-medium"
                          onClick={() => handleDelete(el._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-green-500 p-1"
                    colSpan="9"
                    style={{ textAlign: "center" }}
                  >
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Employee;
