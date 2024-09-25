import { useEffect, useState } from "react";
import Modal from "react-modal";
import { deleteUser, getUsers } from "../../services/userApi";
import AddEditEmployee from "./AddEditEmployee";
import Pagination from "./Pagination";

const Employee = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: {},
  });

  const [searchTerm, setSearchTerm] = useState("");
  // const [formData, setFormData] = useState({
  //   name: "",
  //   serviceNumber: "",
  //   designation: "",
  //   email: "",
  //   role: "",
  //   section: "",
  //   contactNumber: "",
  // });

  // const [formDataEdit, setFormDataEdit] = useState({
  //   name: "",
  //   serviceNumber: "",
  //   designation: "",
  //   email: "",
  //   role: "",
  //   section: "",
  //   contactNumber: "",
  //   _id: "",
  // });

  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Handle form field changes
  // const handleOnChange = (e) => {
  //   const { value, name } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // Fetch Employee data
  const getAllEmployees = async () => {
    try {
      const response = await getUsers();
      // console.log(response.data);
      setEmployeeData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const response = await deleteUser(id);

        if (response.data) {
          setEmployeeData((prevemployeeData) =>
            prevemployeeData.filter((user) => user._id !== id)
          );
          alert(response.data);
        }
      } catch (error) {
        console.error("Error deleting user:", error.response?.data || error);
        alert("An error occurred while deleting the user.");
      } finally {
        getAllEmployees();
      }
    }
  };

  // const handleEditOnChange = (e) => {
  //   const { value, name } = e.target;
  //   setFormDataEdit((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // Updated filtering logic
  const filteredemployeeData = employeeData.filter((el) =>
    Object.values(el).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredemployeeData.length / itemsPerPage);
  const paginatedemployeeData = filteredemployeeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            onClick={() => {
              setOpenAddEditModal({ isShown: true, type: "add", data: null });
            }}
          >
            Add Employee
          </button>

          <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => {}}
            contentLabel="Add/Edit Employee"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <AddEditEmployee
              type={openAddEditModal.type}
              employeeData={openAddEditModal.data}
              onClose={() => {
                setOpenAddEditModal({
                  isShown: false,
                  type: "add",
                  data: null,
                });
              }}
              getAllEmployees={getAllEmployees}
            />
          </Modal>
        </div>

        {/* {addSection && (
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
        )} */}

        {/* {editSection && (
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
        )} */}

        <div className="mt-5">
          <table className="table-fixed w-full min-w-full border-green-500">
            <thead className="bg-indigo-800 text-white">
              <tr>
                <th className="w-28 border border-green-500">Name</th>
                <th className="w-20 border border-green-500">Service Number</th>
                <th className="w-28 border border-green-500">Designation</th>
                <th className="w-56 border border-green-500">Email</th>
                <th className="w-28 border border-green-500">Role</th>
                <th className="w-32 border border-green-500">Section</th>
                <th className="w-28 border border-green-500">Contact Number</th>
                <th className="w-28 border border-green-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedemployeeData.length > 0 ? (
                paginatedemployeeData.map((employee) => (
                  <tr key={employee._id} className="doc-table-hover">
                    <td className="py-2 pl-1 border border-green-500 text-blue-900 text-sm">
                      {employee.name}
                    </td>
                    <td className="py-2 pl-1 border border-green-500  text-blue-900 text-sm">
                      {employee.serviceNumber}
                    </td>
                    <td className="py-2 pl-1 border border-green-500  text-blue-900 text-sm">
                      {employee.designation}
                    </td>
                    <td className="py-2 pl-1 border border-green-500  text-blue-900 text-sm">
                      {employee.email}
                    </td>
                    <td className="py-2 pl-1 border border-green-500  text-blue-900 text-sm">
                      {employee.role}
                    </td>
                    <td className="py-2 pl-1 border border-green-500  text-blue-900 text-sm">
                      {employee.section
                        ? employee.section.name
                        : "No Section Assigned"}
                    </td>
                    <td className="py-2 pl-1 border border-green-500  text-blue-900 text-sm">
                      {employee.contactNumber}
                    </td>
                    <td className="py-2 pl-1 border border-green-500 ">
                      <div className="flex justify-center gap-2">
                        <button
                          className="doc-edit-btn"
                          onClick={() => {
                            setOpenAddEditModal({
                              isShown: true,
                              type: "edit",
                              data: employee,
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="doc-delete-btn"
                          onClick={() => handleDelete(employee._id)}
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
};

export default Employee;
