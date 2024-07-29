import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateMeeting = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [updatePurpose, setUpdatePurpose] = useState("");
  const [updateLocation, setUpdateLocation] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateStartTime, setUpdateStartTime] = useState("");
  const [updateEndTime, setUpdateEndTime] = useState("");
  const [attendeesData, setAttendeesData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [chairedBy, setChairedBy] = useState("");
  const [rows, setRows] = useState([
    {
      actionNo: "",
      action: "",
      description: "",
      responsiblePerson: "",
      targetDate: "",
      status: "",
      comment: "",
    },
  ]);

  useEffect(() => {
    // fetch created meeting data to update
    const fetchMeetingData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/meeting/getSingleMeeting/${id}`
        );
        const data = await res.json();
        setMeeting(data);
        setUpdatePurpose(data.purpose);
        setUpdateLocation(data.location);
        setUpdateDate(data.date);
        setUpdateStartTime(data.startTime);
        setUpdateEndTime(data.endTime);
        setChairedBy(data.chairedBy);
        fetchAttendeesData(data.attendees);
        fetchEmployees();
      } catch (error) {
        console.error("Error fetching meeting data:", error);
      }
    };

    const fetchAttendeesData = async (attendeeIds) => {
      try {
        const response = await fetch(
          "http://localhost:5000/employees/getEmployees"
        );
        const data = await response.json();
        const mappedAttendees = attendeeIds.map((attendeeId) => {
          const attendee = data.find((employee) => employee._id === attendeeId);
          return {
            ...attendee,
            actionNo: "",
            action: "",
            description: "",
            responsiblePerson: "",
            targetDate: "",
            status: "",
            comment: "",
          };
        });
        setAttendeesData(mappedAttendees);
      } catch (error) {
        console.error("Error fetching attendees data:", error);
      }
    };

    // fetch employee data from employee database
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/employees/getEmployees"
        );
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees data:", error);
      }
    };

    fetchMeetingData();
  }, [id]);

  // update the meeting data
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedMeeting = {
      purpose: updatePurpose,
      location: updateLocation,
      date: updateDate,
      startTime: updateStartTime,
      endTime: updateEndTime,
      attendees: meeting.attendees,
      chairedBy: chairedBy,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/meeting/updateMeeting/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMeeting),
        }
      );
      const data = await res.json();
      console.log(data);
      alert("Meeting updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // submit attendees evidence
  const handleSubmit = async (e) => {
    e.preventDefault();
    const attendeesDetails = attendeesData.map((attendee) => ({
      attendeeId: attendee._id,
      reason: attendee.reason,
      attended: attendee.attended,
    }));

    try {
      const response = await fetch(
        `http://localhost:5000/attendees/createAttendees/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendeesDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to store meeting attendees");
      }

      const data = await response.json();
      console.log(data);
      alert("Meeting attendees stored successfully");
    } catch (error) {
      console.error("Error storing meeting attendees:", error);
      alert("Failed to store meeting attendees");
    }
  };

  const handleAttendeeChange = (index, field, value) => {
    const newAttendees = [...attendeesData];
    newAttendees[index][field] = value;
    setAttendeesData(newAttendees);
  };

  // add new raw to the action table
  const addRow = () => {
    setRows([
      ...rows,
      {
        actionNo: "",
        action: "",
        description: "",
        responsiblePerson: "",
        targetDate: "",
        status: "",
        comment: "",
      },
    ]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const deleteSingleActionEvidence = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  if (!meeting) {
    return <div>Loading...</div>;
  }

  // submit the action data
  const handleSubmitAction = async (e) => {
    e.preventDefault();
    const actionDetails = rows.map((row) => ({
      attendeeId: row.responsiblePerson,
      actionNo: row.actionNo,
      action: row.action,
      description: row.description,
      targetDate: row.targetDate,
      status: row.status,
      comment: row.comment,
    }));

    try {
      const response = await fetch(
        `http://localhost:5000/actions/createActions/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(actionDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to store action evidence");
      }

      const data = await response.json();
      console.log(data);
      alert("Action evidence stored successfully");
    } catch (error) {
      console.error("Error storing action evidence:", error);
      alert("Failed to store action evidence");
    }
  };

  return (
    <div className="border-2 w-full p-5 rounded-2xl mr-5 ml-96 mt-20">
      <div className="flex flex-col">
        <h2 className="font-bold text-[#52B14A] text-4xl text-center mt-3">
          Update Meeting
        </h2>
        <div className="border mt-5 bg-cyan-50 rounded-2xl mx-5">
          <form className="p-5" onSubmit={handleUpdate}>
            <div className="mx-10">
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Purpose"
                    className="block text-m font-medium leading-6 text-[#003E81]"
                  >
                    Purpose
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="Purpose"
                      id="Purpose"
                      required
                      autoComplete="Purpose"
                      className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setUpdatePurpose(e.target.value)}
                      value={updatePurpose}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="Location"
                    className="block text-m font-medium leading-6 text-[#003E81]"
                  >
                    Location
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="Location"
                      id="Location"
                      required
                      autoComplete="Location"
                      className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setUpdateLocation(e.target.value)}
                      value={updateLocation}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="Date"
                    className="block text-m font-medium leading-6 text-[#003E81]"
                  >
                    Date
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="Date"
                      id="Date"
                      required
                      autoComplete="Date"
                      className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setUpdateDate(e.target.value)}
                      value={updateDate}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="StartTime"
                    className="block text-m font-medium leading-6 text-[#003E81]"
                  >
                    Start Time
                  </label>
                  <div className="mt-2">
                    <input
                      type="time"
                      name="StartTime"
                      id="StartTime"
                      required
                      autoComplete="StartTime"
                      className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setUpdateStartTime(e.target.value)}
                      value={updateStartTime}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="EndTime"
                    className="block text-m font-medium leading-6 text-[#003E81]"
                  >
                    End Time
                  </label>
                  <div className="mt-2">
                    <input
                      type="time"
                      name="EndTime"
                      id="EndTime"
                      required
                      autoComplete="EndTime"
                      className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setUpdateEndTime(e.target.value)}
                      value={updateEndTime}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="ChairedBy"
                    className="block text-m font-medium leading-6 text-[#003E81]"
                  >
                    Chaired By
                  </label>
                  <div className="mt-2">
                    <select
                      name="ChairedBy"
                      id="ChairedBy"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setChairedBy(e.target.value)}
                      value={chairedBy}
                    >
                      <option value="">Select Chairperson</option>
                      {employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md bg-[#52B14A] py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-[#45913e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-10"
                >
                  Update Meeting
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <h2 className="font-bold text-[#52B14A] text-4xl text-center my-8">
            Meeting Evidences
          </h2>
          <div className="border mt-5 bg-cyan-50 rounded-2xl mx-5 p-2">
            <div className="relative overflow-x-auto pb-5 mt-7 px-2">
              <form onSubmit={handleSubmitAction}>
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
                      <th>
                        <button
                          type="button"
                          class="text-white rounded-full bg-[#52B14A] hover:bg-[#409539]"
                          onClick={addRow}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 50 50"
                          >
                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                          </svg>
                          <span class="sr-only">plus button</span>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#52B14A] text-[#003874] dark:border-gray-700 hover:bg-cyan-100 dark:hover:bg-gray-100"
                      >
                        <td>
                          <input
                            type="number"
                            name="actionNo"
                            value={row.actionNo}
                            onChange={(e) => handleInputChange(index, e)}
                            className="block text-center w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                          />
                        </td>
                        <td>
                          <textarea
                            name="action"
                            value={row.action}
                            onChange={(e) => handleInputChange(index, e)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            rows={2}
                          />
                        </td>
                        <td>
                          <textarea
                            name="description"
                            value={row.description}
                            onChange={(e) => handleInputChange(index, e)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            rows={2}
                          />
                        </td>
                        <td>
                          <select
                            name="responsiblePerson"
                            value={row.responsiblePerson}
                            onChange={(e) => handleInputChange(index, e)}
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
                            value={row.targetDate}
                            onChange={(e) => handleInputChange(index, e)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                          />
                        </td>
                        <td>
                          <select
                            name="status"
                            value={row.status}
                            onChange={(e) => handleInputChange(index, e)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                          >
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="In Progress">Opened</option>
                          </select>
                        </td>
                        <td>
                          <textarea
                            name="comment"
                            value={row.comment}
                            onChange={(e) => handleInputChange(index, e)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            rows={2}
                          />
                        </td>
                        <td className="pr-2">
                          <button
                            type="button"
                            className="ms-auto -mx-1.5 -my-1.5 text-red-500 bg-red-200 rounded-2xl hover:bg-red-300 hover:text-red-700 focus:ring-1 focus:ring-red-300 p-1  inline-flex items-center justify-center h-6 w-6 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            data-dismiss-target="#toast-default"
                            aria-label="Close"
                            onClick={() => deleteSingleActionEvidence(row._id)}
                          >
                            <span className="sr-only">Close</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                          </button>
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
                    Submit Action Evidence
                  </button>
                </div>
              </form>
            </div>

            <div className="px-20">
              <form onSubmit={handleSubmit}>
                <table className="table table-xs w-full text-center border border-[#52B14A] mt-5">
                  <thead className="bg-cyan-300 text-[#003E81] text-sm">
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Section</th>
                      <th>Attended</th>
                      <th>Reason (If not attended)</th>
                    </tr>
                  </thead>
                  <tbody className="py-20">
                    {attendeesData.map((attendee, i) => (
                      <tr
                        key={i}
                        className=" border-b border-[#52B14A] text-[#003874] dark:border-gray-700 hover:bg-cyan-100 dark:hover:bg-gray-100"
                      >
                        <th className="pl-2">{i + 1}</th>
                        <td>{attendee.name}</td>
                        <td>{attendee.designation}</td>
                        <td>{attendee.section}</td>
                        <td>
                          <select
                            className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                            value={attendee.attended}
                            onChange={(e) =>
                              handleAttendeeChange(
                                i,
                                "attended",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Attendance</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Excused">Excused</option>
                          </select>
                        </td>
                        <td>
                          <textarea
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
                            rows={1}
                            value={attendee.reason}
                            onChange={(e) =>
                              handleAttendeeChange(i, "reason", e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center mb-5">
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center rounded-md bg-[#52B14A] py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-[#489a40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-10"
                  >
                    Submit Attendee Evidence
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMeeting;
