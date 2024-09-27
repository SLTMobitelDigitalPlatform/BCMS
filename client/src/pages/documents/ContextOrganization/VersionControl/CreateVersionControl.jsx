import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useVersionControl } from "../../../../hooks/documents/Context of the Organization/useVersionControl";
import { createAlert } from "../../../../utilities/alert";
import Select from "react-select";
import { useUsers } from "../../../../hooks/useUsers";

const CreateVersionControl = () => {
  const [formData, setFormData] = useState({
    serialNo: 0,
    versionNo: 0,
    prepare: "",
    checkedBy: "",
    approve: "",
    reasons: "",
    isApproved: "Pending",
    isChecked: "Pending",
  });

  const navigate = useNavigate();
  const path = "/Context-of-the-Organization/version-control";
  const [isCreating, setIsCreating] = useState(false);

  const {
    versionControl,
    loading: versionControlLoading,
    fetchLastVersionControl,
    createVersionControl,
  } = useVersionControl();

  const { sortedUsers, loading: usersLoading, fetchUsers } = useUsers();

  useEffect(() => {
    fetchLastVersionControl();
    console.log(sortedUsers);
    // fetchLastVersion();
    fetchUsers();
  }, []);

  useEffect(() => {
    createSerialVersionNumbers();
    // if (versionControl) {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     versionNo: versionControl.versionNo,
    //     serialNo: versionControl.serialNo,
    //   }));
    // }
  }, [versionControl]);

  const createSerialVersionNumbers = async () => {
    try {
      const lastRecord = versionControl;

      const baseYear = 2024;
      const currentYear = new Date().getFullYear();
      const yearOffset = currentYear - baseYear + 1;

      let newVersionNo = `${yearOffset}.0`;
      let newSerialNo = 1;
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

      console.log(newVersionNo);
      console.log(newSerialNo);
      setFormData((prevData) => ({
        ...prevData,
        versionNo: newVersionNo,
        serialNo: newSerialNo,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/users", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     const users = response.data.map((user) => user.name);
  //     setUsers(users);

  //     // console.log(users);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchLastVersion();
  //   fetchUsers();
  // }, []);

  const handleCreateVersion = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await createVersionControl(formData);
      createAlert(
        "Version Control Added",
        `Version Control "${formData.versionNo}" added successfully!`
      );
      navigate(path);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }

    // const data = {
    //   serialNo,
    //   versionNo,
    //   prepare,
    //   checkedBy,
    //   approve,
    //   reasons,
    //   isApproved,
    //   isChecked,
    // };

    // axios
    //   .post("http://localhost:5000/api/versionControls/add", data)
    //   .then(() => {
    //     handleSuccessAlert();
    //     navigate("/Context-of-the-Organization/version-control");
    //   })
    //   .catch((err) => {
    //     handleErrorAlert();
    //     console.log(err);
    //   });
  };

  // Success Alert
  // const handleSuccessAlert = () => {
  //   Swal.fire({
  //     position: "top-end",
  //     icon: "success",
  //     title: "Record Added Successfully",
  //     showConfirmButton: false,
  //     timer: 2000,
  //   });
  // };

  // // Error Alert
  // const handleErrorAlert = () => {
  //   Swal.fire({
  //     title: "Something Went Wrong",
  //     text: "Fix it and try again",
  //     icon: "error",
  //   });
  // };

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

  if (versionControlLoading || usersLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Add New Version Control
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleCreateVersion}>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Serial Number
                </label>
                <input
                  type="number"
                  name="serialNo"
                  placeholder="Serial Number"
                  readOnly
                  value={formData.serialNo}
                  onChange={handleChange}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Version Number
                </label>
                <input
                  type="number"
                  name="versionNo"
                  placeholder="Version Number"
                  readOnly
                  value={formData.versionNo}
                  onChange={handleChange}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="prepare" className="font-semibold">
                  Prepared By
                </label>
                <Select
                  options={sortedUsers}
                  value={sortedUsers.find(
                    (user) => user.value === formData.prepare
                  )}
                  onChange={(option) => handleSelectChange(option, "prepare")}
                  isClearable={true}
                  placeholder="Prepared Person"
                  className="w-[500px]"
                />
                {/* <select
                  id="prepare"
                  placeholder="Prepared Person"
                  value={formData.prepare}
                  onChange={handleChange}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
                >
                  <option value="" disabled>
                    Select Prepared Person
                  </option>
                  {users.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select> */}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="approve" className="font-semibold">
                  Approved By
                </label>
                <Select
                  options={sortedUsers}
                  value={sortedUsers.find(
                    (user) => user.value === formData.approve
                  )}
                  onChange={(option) => handleSelectChange(option, "approve")}
                  isClearable={true}
                  placeholder="Approved Person"
                  className="w-[500px]"
                />
                {/* <select
                  id="approve"
                  placeholder="Approved Person"
                  value={formData.approve}
                  onChange={handleChange}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
                >
                  <option value="" disabled>
                    Select Approved Person
                  </option>
                  {users.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select> */}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="prepare" className="font-semibold">
                Checked By
              </label>
              <Select
                options={sortedUsers}
                value={sortedUsers.find(
                  (user) => user.value === formData.checkedBy
                )}
                onChange={(option) => handleSelectChange(option, "checkedBy")}
                isClearable={true}
                placeholder="Checked Person"
                className="w-[500px]"
              />
              {/* <select
                id="prepare"
                placeholder="Prepared Person"
                value={formData.checkedBy}
                onChange={handleChange}
                className="w-[500px] p-2 rounded-lg bg-slate-100"
              >
                <option value="" disabled>
                  Select Checked Person
                </option>
                {users.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select> */}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Reasons for new release
              </label>
              <textarea
                type="text"
                name="reasons"
                placeholder="Reasons"
                value={formData.reasons}
                rows={4}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-slate-100"
              />
            </div>
            {/* <div className="flex flex-col gap-2">
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
            </div> */}
            <div className="flex justify-start gap-2">
              <button
                type="submit"
                className={`p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold ${
                  isCreating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isCreating}
              >
                {isCreating ? (
                  <FaSpinner className="animate-spin inline text-xl " />
                ) : (
                  "Create"
                )}
              </button>
              <Link
                to={path}
                className="p-2 w-32 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVersionControl;

// const [serialNo, setSerialNo] = useState(0);
// const [versionNo, setVersionNo] = useState(0);
// const [prepare, setPrepare] = useState("");
// const [checkedBy, setCheckedBy] = useState("");
// const [approve, setApprove] = useState("");
// const [reasons, setReasons] = useState("");
// const [users, setUsers] = useState([]);
// const [isApproved, setIsApproved] = useState("Pending");
// const [isChecked, setIsChecked] = useState("Pending");

// const response = await axios.get(
//   "http://localhost:5000/api/versionControls/last"
// );
