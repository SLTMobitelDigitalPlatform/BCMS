import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import { useUsers } from "../../../../hooks/useUsers";

const EditMasterProducers = () => {
  const [formData, setFormData] = useState({
    processNo: "",
    processName: "",
    processKpi: "",
    responsiblePerson: "",
  });
  // const [processNo, setProcessNo] = useState(0);
  // const [processName, setProcessName] = useState("");
  // const [processKpi, setProcessKpi] = useState("");
  // const [responsiblePerson, setResponsiblePerson] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/proceduresAndProcess/${id}`)
      .then((res) => {
        formData.processNo = res.data.processNo;
        formData.processName = res.data.processName;
        formData.processKpi = res.data.processKpi;
        formData.responsiblePerson = res.data.responsiblePerson;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await getUsers();
  //     const users = response.data.map((user) => user.name);
  //     // console.log(users);
  //     setUsers(users);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const { sortedUsers, loading, error, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const data = {
    //   processNo,
    //   processName,
    //   processKpi,
    //   responsiblePerson,
    // };

    axios
      .put(`http://localhost:5000/proceduresAndProcess/edit/${id}`, formData)
      .then(() => {
        handleSuccessAlert();
        navigate(
          "/Context-of-the-Organization/master-list-of-procedures/process"
        );
      })
      .catch((err) => {
        handleErrorAlert();
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
    });
  };

  // Success Alert
  const handleSuccessAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Record Updated Successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // Error Alert
  const handleErrorAlert = () => {
    Swal.fire({
      title: "Something Went Wrong",
      text: "Fix it and try again",
      icon: "error",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Edit Master List of Procedures/Process
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="" className="font-semibold">
              Process No
            </label>
            <input
              type="number"
              name="processNo"
              placeholder="Process No"
              value={formData.processNo}
              readOnly
              onChange={handleChange}
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="" className="font-semibold">
              Process Name
            </label>
            <input
              type="text"
              name="processName"
              placeholder="Process Name"
              value={formData.processName}
              onChange={handleChange}
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="" className="font-semibold">
              Process KPI
            </label>
            <input
              type="text"
              name="processKpi"
              placeholder="Process KPI"
              value={formData.processKpi}
              onChange={handleChange}
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="" className="font-semibold">
              Responsible Person
            </label>
            <Select
              options={sortedUsers}
              name="responsiblePerson"
              value={sortedUsers.find(
                (user) => user.value === formData.responsiblePerson
              )}
              onChange={(option) =>
                handleSelectChange(option, "responsiblePerson")
              }
              isClearable={true}
              placeholder="Select Responsible Person"
            />
          </div>
          <div className="flex justify-start gap-2 mt-5">
            <button
              type="submit"
              className="p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
            >
              Save
            </button>
            <Link
              to="/Context-of-the-Organization/master-list-of-procedures/process"
              className="p-2 w-32 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMasterProducers;
