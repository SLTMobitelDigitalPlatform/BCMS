import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditInternalParty = () => {
  const [internalParty, setInternalParty] = useState("");
  const [requirments, setRequirments] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/internalParty/${id}`)
      .then((res) => {
        setInternalParty(res.data.internalParty);
        setRequirments(res.data.requirments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleEditInternalParty = (e) => {
    e.preventDefault();

    const data = {
      internalParty,
      requirments,
    };

    axios
      .put(`http://localhost:5000/internalParty/edit/${id}`, data)
      .then(() => {
        handleSuccessAlert();
        navigate("/Context-of-the-Organization/internalParty");
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

  return (
    <div className="w-full rounded-2xl bg-sky-100 p-5 h-full overflow-auto">
      <h1 className="text-2xl font-bold">Edit Internal Party</h1>
      <div className="w-full mt-10 rounded-2xl">
        <form onSubmit={handleEditInternalParty}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-6">
              {/* <div className="flex justify-between"> */}
              <div className="flex gap-10">
                <label htmlFor="" className="font-semibold">
                  Internal Party
                </label>
                <textarea
                  type="text"
                  placeholder="Internal Party"
                  value={internalParty}
                  onChange={(e) => setInternalParty(e.target.value)}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
                />
              </div>
              <div className="flex gap-10">
                <label htmlFor="" className="font-semibold">
                  Requirments
                </label>
                <textarea
                  type="text"
                  placeholder="Requirments"
                  value={requirments}
                  onChange={(e) => setRequirments(e.target.value)}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
                />
              </div>

              <div className="flex justify-start gap-2 mt-5">
                <button
                  type="submit"
                  className="p-2 w-32 bg-sky-600 text-white rounded-lg font-semibold"
                >
                  Save
                </button>
                <Link to="/Context-of-the-Organization/internalParty">
                  <button className="p-2 w-32 bg-red-500 text-white rounded-lg font-semibold">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInternalParty;
