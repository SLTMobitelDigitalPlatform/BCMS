import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateVersionControl = () => {
  const [serialNo, setSerialNo] = useState(0);
  const [versionNo, setVersionNo] = useState(0);
  const [prepare, setPrepare] = useState("");
  const [approve, setApprove] = useState("");
  const [reasons, setReasons] = useState("");
  const [users, setUsers] = useState([]);
  const [isApproved, setIsApproved] = useState("");
  const navigate = useNavigate();

  const fetchLastVersion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/versionControls/last"
      );
      const lastRecord = response.data;

      const baseYear = 2024;
      const currentYear = new Date().getFullYear();
      const yearOffset = currentYear - baseYear + 1;

      let newVersionNo = `${yearOffset}.0`;
      let newSerialNo = 1;
      // console.log(newVersionNo);
      let lastVersionYearOffset;
      let lastIndex;

      if (lastRecord && lastRecord.versionNo) {
        lastVersionYearOffset = parseInt(
          lastRecord.versionNo.split(".")[0],
          10
        );
        lastIndex = parseInt(lastRecord.versionNo.split(".")[1], 10);
        newSerialNo = lastRecord.serialNo + 1;
      }

      if (lastVersionYearOffset === yearOffset) {
        newVersionNo = `${yearOffset}.${lastIndex + 1}`;
      }

      // console.log(newVersionNo);
      setVersionNo(newVersionNo);
      setSerialNo(newSerialNo);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const users = response.data.map((user) => user.name);
      setUsers(users);

      // console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLastVersion();
    fetchUsers();
  }, []);

  const handleCreateVersion = (e) => {
    e.preventDefault();

    const data = {
      serialNo,
      versionNo,
      prepare,
      approve,
      reasons,
      isApproved,
    };

    axios
      .post("http://localhost:5000/api/versionControls/add", data)
      .then(() => {
        handleSuccessAlert();
        navigate("/Context-of-the-Organization/VersionControls");
      })
      .catch((err) => {
        handleErrorAlert();
        console.log(err);
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

  return (
    <div className="flex flex-col w-full h-full rounded-2xl bg-sky-200">
      <h1 className="text-2xl font-bold">Add New Version Control</h1>
      <div className="bg-cyan-100 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleCreateVersion}>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Serial Number
                </label>
                <input
                  type="number"
                  placeholder="Serial Number"
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Version Number
                </label>
                <input
                  type="number"
                  placeholder="Version Number"
                  value={versionNo}
                  onChange={(e) => setVersionNo(e.target.value)}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="prepare" className="font-semibold">
                  Prepared By
                </label>
                <select
                  id="prepare"
                  placeholder="Prepared Person"
                  value={prepare}
                  onChange={(e) => setPrepare(e.target.value)}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
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
              <div className="flex flex-col gap-2">
                <label htmlFor="approve" className="font-semibold">
                  Approved By
                </label>
                <select
                  id="approve"
                  placeholder="Approved Person"
                  value={approve}
                  onChange={(e) => setApprove(e.target.value)}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
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
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Reasons for new release
              </label>
              <textarea
                type="text"
                placeholder="Reasons"
                value={reasons}
                rows={4}
                onChange={(e) => setReasons(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="isapprove" className="font-semibold">
                Approval
              </label>
              <select
                id="isapprove"
                placeholder="Approved Person"
                value={isApproved}
                onChange={(e) => setIsApproved(e.target.value)}
                className="w-[500px] p-2 rounded-lg bg-slate-100"
              >
                <option value="" disabled>
                  Select
                </option>
                <option>Approved</option>
                <option>Not Approved</option>
                <option>Pending</option>
              </select>
            </div>
            <div className="flex justify-start gap-2">
              <button
                type="submit"
                className="p-2 w-32 bg-sky-600 text-white rounded-lg font-semibold"
              >
                Save
              </button>
              <Link to="/Context-of-the-Organization/VersionControls">
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

export default CreateVersionControl;
