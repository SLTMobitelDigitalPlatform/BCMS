import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// import Modal from "react-modal";
// import AddEditEmployee from "./AddEditEmployee";
import { Link } from "react-router-dom";

import Pagination from "./Pagination";
import { useCustomers } from "../../hooks/useCustomers";

const Customer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // const [openAddEditModal, setOpenAddEditModal] = useState({
  //   isShown: false,
  //   type: "add",
  //   data: {},
  // });

  // const [customerData, setCustomerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const { customers, fetchCustomers, deleteCustomerByID } = useCustomers();

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteCustomerByID(id);

        Swal.fire({
          title: "Deleted!",
          text: "Customer has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error deleting customer:", error.response?.data || error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete customer. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    // if (window.confirm("Are you sure you want to delete this entry?")) {
    //   try {
    //     const response = await deleteCustomerByID(id);

    //     if (response.data) {
    //       setCustomerData((prevCustomerData) =>
    //         prevCustomerData.filter((customer) => customer._id !== id)
    //       );
    //       alert(response.data);
    //     }
    //   } catch (error) {
    //     console.error(
    //       "Error deleting customer:",
    //       error.response?.data || error
    //     );
    //     alert("An error occurred while deleting the customer.");
    //   } finally {
    //     getAllCustomers();
    //   }
    // }
  };

  // Updated filtering logic
  const filteredCustomerData = customers.filter((el) =>
    Object.values(el).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredCustomerData.length / itemsPerPage);
  const paginatedCustomerData = filteredCustomerData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Main Content */}
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h1 className="topic">Customer</h1>

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
          <Link
            to={"/feedbacks"}
            className="btn-primary text-white font-medium"
            // onClick={() => {
            //   setOpenAddEditModal({ isShown: true, type: "add", data: null });
            // }}
          >
            Feedbacks
          </Link>

          <Link
            to={"/subscribeForm"}
            className="btn-primary text-white font-medium"
            // onClick={() => {
            //   setOpenAddEditModal({ isShown: true, type: "add", data: null });
            // }}
          >
            Add Customer
          </Link>

          {/* <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => {}}
            contentLabel="Add/Edit Employee"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <AddEditEmployee
              type={openAddEditModal.type}
              customerData={openAddEditModal.data}
              onClose={() => {
                setOpenAddEditModal({
                  isShown: false,
                  type: "add",
                  data: null,
                });
              }}
              getAllEmployees={getAllEmployees}
            />
          </Modal> */}
        </div>

        <div className="mt-5">
          <table className="table-auto w-full min-w-full bg-white border border-green-500">
            <thead className="bg-indigo-800 text-white">
              <tr>
                <th className="p-1 border border-green-500">Name</th>
                <th className="p-1 border border-green-500">Email</th>
                <th className="p-1 border border-green-500">Mobile Number</th>
                <th className="p-1 border border-green-500">Province</th>
                <th className="p-1 border border-green-500">Company</th>
                <th className="p-1 border border-green-500">
                  Subscription Preference
                </th>
                <th className="p-1 border border-green-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomerData.length > 0 ? (
                paginatedCustomerData.map((customer) => (
                  <tr key={customer._id} className="doc-table-hover">
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {customer.name}
                    </td>
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {customer.email}
                    </td>
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {customer.mobileNumber}
                    </td>
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {customer.province}
                    </td>
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {customer.company}
                    </td>
                    <td className="border border-green-500 p-1 text-blue-900 text-sm">
                      {customer.subPreference}
                    </td>

                    <td className="border border-green-500 p-1">
                      <div className="flex justify-center gap-2">
                        <button
                          className="doc-edit-btn"
                          // onClick={() => {
                          //   setOpenAddEditModal({
                          //     isShown: true,
                          //     type: "edit",
                          //     data: employee,
                          //   });
                          // }}
                        >
                          Edit
                        </button>
                        <button
                          className="doc-delete-btn"
                          onClick={() => handleDelete(customer._id)}
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

export default Customer;
