import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateInternalParty = () => {
  const [internalParty, setInternalParty] = useState("");
  const [requirments, setRequirments] = useState("");

  const navigate = useNavigate();

  const handleCreateInternalParty = (e) => {
    e.preventDefault();

    const data = {
      internalParty,
      requirments,
    };

    axios
      .post("http://localhost:5000/internalParty/create", data)
      .then(() => {
        handleSuccessAlert();
        navigate("/Context-of-the-Organization/internalParty");
      })
      .catch((error) => {
        handleErrorAlert();
        console.log(error);
      });
  };

  const handleSuccessAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Record Added Successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleErrorAlert = () => {
    Swal.fire({
      title: "Something Went Wrong",
      text: "Fix it and try again",
      icon: "error",
    });
  };

  return (
    <div className="w-full h-full bg-sky-100 flex flex-col rounded-2xl pt-5">
      <h1 className="text-2xl font-bold">Create New Internal Party</h1>
      <div className="bg-cyan-50 w-full h-full p-3 rounded-2xl mt-5">
        <form onSubmit={handleCreateInternalParty}>
          <div className="flex flex-col gap-6">
            {/* <div className="flex justify-between"> */}
            <div className="flex gap-10">
              <label htmlFor="" className="font-semibold">
                Internal Party
              </label>
              <textarea
                type="text"
                placeholder="Internal Issue"
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
        </form>
      </div>
    </div>
  );
};

export default CreateInternalParty;
