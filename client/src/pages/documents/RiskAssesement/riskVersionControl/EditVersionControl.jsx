import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditRiskVersionControl = () => {
  const [serialNo, setSerialNo] = useState(0);
  const [versionNo, setVersionNo] = useState(0);
  const [prepare, setPrepare] = useState("");
  const [approve, setApprove] = useState("");
  const [reasons, setReasons] = useState("");
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [isApproved, setIsApproved] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/versionControlsRisk/${id}`)
      .then((res) => {
        setSerialNo(res.data.serialNo);
        setVersionNo(res.data.versionNo);
        setPrepare(res.data.prepare);
        setApprove(res.data.approve);
        setReasons(res.data.reasons);
        setIsApproved(res.data.isApproved);
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
      approve,
      reasons,
      isApproved,
    };

    axios
      .put(`http://localhost:5000/api/versionControlsRisk/edit/${id}`, data)
      .then(() => {
        handleSuccessAlert();
        navigate("/riskVersionControl");
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
    <div className="container mx-auto py-8">
      <div className="flex gap-x-10">
        <div className="border-2 w-full rounded-2xl ml-5 mr-[20px] mt-1 mb-5 p-5">
          <h1 className="text-2xl font-bold">Update Version Control</h1>
          <div className="w-full mx-auto p-8 rounded-xl shadow-lg border-2 mt-5">
            <form onSubmit={handleEditVersion}>
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
                      className="w-[500px] p-2 rounded-lg bg-slate-100"
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
                      className="w-[500px] p-2 rounded-lg bg-slate-100"
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

                <div className="flex justify-start gap-2 mt-5">
                  <button
                    type="submit"
                    className="p-2 w-32 bg-sky-600 text-white rounded-lg font-semibold"
                  >
                    Save
                  </button>
                  <Link to="/riskVersionControl">
                    <button className="p-2 w-32 bg-red-500 text-white rounded-lg font-semibold">
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRiskVersionControl;
