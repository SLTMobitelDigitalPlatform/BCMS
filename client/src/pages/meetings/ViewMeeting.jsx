import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ViewMeeting = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [purpose, setPurpose] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [chairedBy, setChairedBy] = useState("");
  const [chairedByDes, setChairedByDes] = useState("");
  const [presentAttendees, setPresentAttendees] = useState([]);
  const [absentAttendees, setAbsentAttendees] = useState([]);
  const [excusedAttendees, setExcusedAttendees] = useState([]);
  const [actions, setActions] = useState([]);

  //fetch a single meeting data
  useEffect(() => {
    fetch(`http://localhost:5000/meeting/getSingleMeeting/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setMeeting(data);
          setPurpose(data.purpose || "");
          setLocation(data.location || "");
          setDate(data.date || "");
          setStartTime(data.startTime || "");
          setEndTime(data.endTime || "");
          fetchChairedByName(data.chairedBy || "");
          fetchAttendeesData(data._id);
          fetchActionData(data._id);

        }
      })
      .catch((err) => console.log("Error fetching meeting:", err));
  }, [id]);

  // Get chaired by person name and designation
  const fetchChairedByName = async (chairedById) => {
    try {
      const res = await fetch(`http://localhost:5000/employees/getEmployeesById/${chairedById}`);
      const employeeData = await res.json();
      setChairedBy(employeeData.name); 
      setChairedByDes(employeeData.designation);
    } catch (err) {
      console.log("Error fetching employee name:", err);
    }
  };

  // fetch attendees data
  const fetchAttendeesData = async (meetingId) => {
    try {
      const res = await fetch(`http://localhost:5000/attendees/getSingleAttendee/${meetingId}`);
      const attendees = await res.json();
      const present = attendees.filter(att => att.attended === "Present").map(att => att.attendeeId.name);
      const absent = attendees.filter(att => att.attended === "Absent").map(att => att.attendeeId.name);
      const excused = attendees.filter(att => att.attended === "Excused").map(att => att.attendeeId.name);

      setPresentAttendees(present);
      setAbsentAttendees(absent);
      setExcusedAttendees(excused);
    } catch (err) {
      console.log("Error fetching attendees:", err);
    }
  };

  // fetch action data
  const fetchActionData = async (meetingId) => {
    try {
      const res = await fetch(`http://localhost:5000/actions/getsingleActionData/${meetingId}`);
      const actionData = await res.json();
      setActions(actionData);
    } catch (err) {
      console.error("Error fetching action data:", err);
    }
  };

  if (!meeting) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-2 w-full p-5 rounded-2xl mr-5 ml-96 mt-20">
      <div className="flex flex-col">
        <h2 className="font-bold text-[#52B14A] text-4xl text-center mt-3">
          View Meeting
        </h2>
        <div className="border mt-5 bg-cyan-50 rounded-2xl mx-5">
          <div className="relative overflow-x-auto justify-center items-center flex">
            <table className="text-lg text-left rtl:text-right text-black dark:text-gray-400">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Meeting
                  </th>
                  <td className="px-6 py-2">{purpose}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Location
                  </th>
                  <td className="px-6 py-2">{location}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Date
                  </th>
                  <td className="px-6 py-2">{date}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Time
                  </th>
                  <td className="px-6 py-4">
                    {startTime} - {endTime}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Chaired by
                  </th>
                  <td className="px-6 py-2">{chairedBy} - {chairedByDes}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 px-5">
            <div className="relative overflow-x-auto justify-center items-center flex">
              <table className="text-sm text-center rtl:text-right text-[#003E81] dark:text-gray-400 border border-[#52B14A]">
                <thead className="bg-cyan-300 text-[#003E81] text-sm uppercase dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Present
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Absent
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Excused
                    </th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="px-6 py-4">
                      {presentAttendees.map((name, index) => (
                        <div key={index}>{name}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      {absentAttendees.map((name, index) => (
                        <div key={index}>{name}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      {excusedAttendees.map((name, index) => (
                        <div key={index}>{name}</div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 px-5 mb-5">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-center rtl:text-right text-[#003E81] dark:text-gray-400 border border-[#52B14A]">
                <thead className="bg-cyan-300 text-[#003E81] text-sm uppercase dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Action No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Responsible Person
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Target Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                     Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                     Updates
                    </th>
                  </tr>
                </thead>
                <tbody>
                    <tr
                      className="border border-[#52B14A] dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      ></th>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4"></td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between mt-20 px-10 mb-5">
            <div>
              <h1 className="text-xl">Created by</h1>
              <h1>..................................</h1>
            </div>
            <div>
              <h1 className="text-xl">Checked by</h1>
              <h1>..................................</h1>
            </div>
            <div>
              <h1 className="text-xl">Approved by</h1>
              <h1>..................................</h1>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ViewMeeting;
