import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditRiskVersionControl = () => {
  const [serialNo, setSerialNo] = useState(0);
  const [versionNo, setVersionNo] = useState(0);
  const [prepare, setPrepare] = useState("");
  const [approve, setApprove] = useState("");
  const [checkedBy, setCheckedBy] = useState("");
  const [reasons, setReasons] = useState("");
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [isApproved, setIsApproved] = useState("");
  const [isChecked, setIsChecked] = useState("");
  const [comment, setComment] = useState("");
  const [checkedComment, setCheckedComment] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/versionControlsRisk/${id}`)
      .then((res) => {
        setSerialNo(res.data.serialNo);
        setVersionNo(res.data.versionNo);
        setPrepare(res.data.prepare);
        setCheckedBy(res.data.checkedBy);
        setApprove(res.data.approve);
        setReasons(res.data.reasons);
        setIsApproved(res.data.isApproved);
        setIsChecked(res.data.isChecked);
        setComment(res.data.comment);
        setCheckedComment(res.data.checkedComment);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const fetchLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/currentuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.name);

      setLoggedInUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchLoggedInUser();
  }, []);

  const handleEditVersion = (e) => {
    e.preventDefault();

    const data = {
      serialNo,
      versionNo,
      prepare,
      checkedBy,
      approve,
      reasons,
      isApproved,
      isChecked,
      comment,
      checkedComment,
    };

    axios
      .put(`http://localhost:5000/api/versionControlsRisk/edit/${id}`, data)
      .then(() => {
        handleSuccessAlert();
        navigate("/Risk-Assessment/versionControl");
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
    <div className="flex flex-col w-full h-full overflow-auto">
      <h1 className="text-2xl font-bold text-green-500">
        Update Version Control
      </h1>
      <div className="bg-indigo-200 w-full mx-auto p-8 rounded-2xl mt-5">
        <form onSubmit={handleEditVersion}>
          <div className="flex flex-col gap-6">
            <div className="flex justify-start gap-10">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Serial Number
                </label>
                <input
                  type="number"
                  placeholder="Serial Number"
                  readOnly
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Version Number
                </label>
                <input
                  type="number"
                  placeholder="Version Number"
                  readOnly
                  value={versionNo}
                  onChange={(e) => setVersionNo(e.target.value)}
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                />
              </div>
            </div>
            <div className="flex justify-start gap-10">
              <div className="flex flex-col gap-2">
                <label htmlFor="prepare" className="font-semibold">
                  Prepared By
                </label>
                <select
                  id="prepare"
                  placeholder="Prepared Person"
                  value={prepare}
                  onChange={(e) => setPrepare(e.target.value)}
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                >
                  <option value="" disabled>
                    {prepare}
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
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                >
                  <option value="" disabled>
                    {approve}
                  </option>
                  {users.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="checkedBy" className="font-semibold">
                  Checked By
                </label>
                <select
                  id="checkedBy"
                  value={checkedBy}
                  onChange={(e) => setCheckedBy(e.target.value)}
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                >
                  <option value="" disabled>
                    {checkedBy}
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
                onChange={(e) => setReasons(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-100"
              />
            </div>
            {loggedInUser.name === checkedBy ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="isChecked" className="font-semibold">
                  Checking Status
                </label>
                <select
                  id="isChecked"
                  placeholder="Checked Status"
                  value={isChecked}
                  onChange={(e) => setIsChecked(e.target.value)}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
                >
                  <option disabled>{isApproved}</option>
                  <option>Checked</option>
                  <option>Not Approved</option>
                  <option>Pending</option>
                </select>
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Comments from Checked Person
              </label>
              <textarea
                type="text"
                placeholder="Reasons"
                value={checkedComment}
                rows={4}
                onChange={(e) => setCheckedComment(e.target.value)}
                readOnly={loggedInUser.name !== checkedBy}
                className="w-full p-2 rounded-lg bg-slate-100"
              />
            </div>
            {loggedInUser.name === approve ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="isapprove" className="font-semibold">
                  Approval
                </label>
                <select
                  id="isapprove"
                  placeholder="Approval"
                  value={isApproved}
                  onChange={(e) => setIsApproved(e.target.value)}
                  className="w-[300px] p-2 rounded-lg bg-slate-100"
                >
                  <option disabled>{isApproved}</option>
                  <option>Approved</option>
                  <option>Not Approved</option>
                  <option>Pending</option>
                </select>
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Comments from the Person for Approval
              </label>
              <textarea
                type="text"
                placeholder="Reasons"
                value={comment}
                rows={4}
                onChange={(e) => setComment(e.target.value)}
                readOnly={loggedInUser.name !== approve}
                className="w-full p-2 rounded-lg bg-slate-100"
              />
            </div>

            <div className="flex justify-start gap-2 mt-5">
              <button
                type="submit"
                className="p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
              >
                Save
              </button>
              <Link to="/Risk-Assessment/versionControl">
                <button className="p-2 w-32 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold">
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

export default EditRiskVersionControl;
