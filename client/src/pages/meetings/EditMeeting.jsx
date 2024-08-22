import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditMeeting = () => {
  const { id } = useParams();
  const [employees, setEmployees] = useState([]);
  const [actions, setActions] = useState([]);

  // Fetch all employees data
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees data:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch action data
  const fetchActionData = async (meetingId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/getsingleActionData/${meetingId}`
      );
      const actionData = await res.json();
      setActions(
        actionData.map((action) => ({
          ...action,
          actionNo: action.actionNo,
          action: action.action,
          description: action.description,
          attendeeId: action.attendeeId._id,
          targetDate: action.targetDate,
          status: action.status,
          comment: action.comment,
        }))
      );
    } catch (err) {
      console.error("Error fetching action data:", err);
    }
  };

  useEffect(() => {
    fetchActionData(id);
  }, [id]);

  // Update action data
  const handleUpdateAction = async (e) => {
    e.preventDefault();
    try {
      for (const action of actions) {
        const res = await fetch(
          `http://localhost:5000/updateActions/${action._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              actionNo: action.actionNo,
              action: action.action,
              description: action.description,
              attendeeId: action.attendeeId,
              targetDate: action.targetDate,
              status: action.status,
              comment: action.comment,
            }),
          }
        );
        if (!res.ok) {
          throw new Error("Failed to update action");
        }
      }
      alert("Actions updated successfully!");
    } catch (error) {
      console.error("Error updating actions:", error);
    }
  };

  const handleChange = (index, field, value) => {
    const newActions = [...actions];
    newActions[index][field] = value;
    setActions(newActions);
  };

  if (!actions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full bg-cyan-50 p-2">
      <h2 className="font-bold text-[#52B14A] text-4xl text-center mt-3">
        Update Meeting Actions
      </h2>
      <div className="relative overflow-x-auto pb-5 mt-7 px-2">
        <form onSubmit={handleUpdateAction}>
          <table className="table table-xs w-full text-center border border-[#52B14A] rounded-2xl">
            <thead className="bg-cyan-300 text-[#003E81] text-sm">
              <tr>
                <th>Action No</th>
                <th>Action</th>
                <th>Description</th>
                <th>Responsible Person</th>
                <th>Target Date</th>
                <th>Status</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((action, index) => (
                <tr
                  key={index}
                  className="border-b border-[#52B14A] text-[#003874] dark:border-gray-700 hover:bg-cyan-100 dark:hover:bg-gray-100"
                >
                  <td>
                    <input
                      type="number"
                      name="actionNo"
                      value={action.actionNo}
                      className="block text-center w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      onChange={(e) =>
                        handleChange(index, "actionNo", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      name="action"
                      value={action.action}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      rows={2}
                      onChange={(e) =>
                        handleChange(index, "action", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      name="description"
                      value={action.description}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      rows={2}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <select
                      name="responsiblePerson"
                      value={action.attendeeId}
                      onChange={(e) =>
                        handleChange(index, "attendeeId", e.target.value)
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      <option value="">Select Responsible Person</option>
                      {employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      name="targetDate"
                      value={action.targetDate}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      onChange={(e) =>
                        handleChange(index, "targetDate", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <select
                      name="status"
                      value={action.status}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      onChange={(e) =>
                        handleChange(index, "status", e.target.value)
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Opened">Opened</option>
                    </select>
                  </td>
                  <td>
                    <textarea
                      name="comment"
                      value={action.comment}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      rows={2}
                      onChange={(e) =>
                        handleChange(index, "comment", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md bg-[#52B14A] py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-[#489a40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-10"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMeeting;
