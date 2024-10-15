import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { useUsers } from "../../../../hooks/useUsers";

const CreateMasterProducers = () => {
  const [formData, setFormData] = useState({
    processNo: "",
    processName: "",
    processKpi: "",
    responsiblePerson: "",
  });
  // const [processNo, setProcessNo] = useState("");
  // const [processName, setProcessName] = useState("");
  // const [processKpi, setProcessKpi] = useState("");
  // const [responsiblePerson, setResponsiblePerson] = useState("");
  const navigate = useNavigate();

  // const [users, setUsers] = useState([]);

  const fethLastProcessNo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/proceduresAndProcesses/last"
      );
      const lastRecord = response.data;

      let newProcessNo = 1;
      console.log(newProcessNo);

      if (lastRecord && lastRecord.processNo) {
        newProcessNo = lastRecord.processNo + 1;
      }
      console.log(newProcessNo);
      formData.processNo = newProcessNo;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const data = {
    //   processNo,
    //   processName,
    //   processKpi,
    //   responsiblePerson,
    // };

    axios
      .post("http://localhost:5000/proceduresAndProcess/create", formData)
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
    fethLastProcessNo();
  }, []);

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
      title: "Record Added Successfully",
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
        Create New Master List of Procedures/Process
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

export default CreateMasterProducers;
