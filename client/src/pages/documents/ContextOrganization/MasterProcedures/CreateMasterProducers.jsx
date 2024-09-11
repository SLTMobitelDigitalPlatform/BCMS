import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getUsers } from "../../../../services/userApi";

const CreateMasterProducers = () => {
  const [processNo, setProcessNo] = useState("");
  const [processName, setProcessName] = useState("");
  const [processKpi, setProcessKpi] = useState("");
  const [responsiblePerson, setResponsiblePerson] = useState("");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

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
      setProcessNo(newProcessNo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateMasterProducers = (e) => {
    e.preventDefault();

    const data = {
      processNo,
      processName,
      processKpi,
      responsiblePerson,
    };

    axios
      .post("http://localhost:5000/proceduresAndProcess/create", data)
      .then(() => {
        handleSuccessAlert();
        navigate(
          "/Context-of-the-Organization/master-of-procedures-and-process"
        );
      })
      .catch((err) => {
        handleErrorAlert();
        console.log(err);
      });
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const users = response.data.map((user) => user.name);
      // console.log(users);
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fethLastProcessNo();
  }, []);
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

  return (
    <div className="w-full rounded-2xl bg-sky-100 p-5 h-full overflow-auto">
      <h1 className="text-2xl font-bold">Create New Process</h1>
      <div className="w-full mt-10 rounded-2xl">
        <form onSubmit={handleCreateMasterProducers}>
          <div className="flex flex-col gap-6">
            {/* <div className="flex justify-between"> */}
            {/* </div> */}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Process No
              </label>
              <input
                type="number"
                placeholder="Process No"
                value={processNo}
                readOnly
                onChange={(e) => setProcessNo(e.target.value)}
                className="w-1/2 p-2 rounded-lg bg-slate-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Process Name
              </label>
              <input
                type="text"
                placeholder="Process Name"
                value={processName}
                onChange={(e) => setProcessName(e.target.value)}
                className="w-1/2 p-2 rounded-lg bg-slate-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Process KPI
              </label>
              <input
                type="text"
                placeholder="Process KPI"
                value={processKpi}
                onChange={(e) => setProcessKpi(e.target.value)}
                className="w-1/2 p-2 rounded-lg bg-slate-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Responsible Person
              </label>
              <select
                id="respomsibility"
                value={responsiblePerson}
                onChange={(e) => setResponsiblePerson(e.target.value)}
                className="p-2 rounded-lg bg-slate-100"
              >
                <option value="" disabled>
                  Select
                </option>
                {users.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-start gap-2 mt-5">
              <button
                type="submit"
                className="p-2 w-32 bg-sky-600 text-white rounded-lg font-semibold"
              >
                Save
              </button>
              <Link to="/Context-of-the-Organization/master-of-procedures-and-process">
                <button className="p-2 w-32 bg-red-500 text-white rounded-lg font-semibold">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMasterProducers;
