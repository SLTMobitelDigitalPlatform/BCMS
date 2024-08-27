import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup
  .object({
    title: yup.string().required("Can't Be Empty"),
    start: yup.date().required("Please specify the time to start"),
    end: yup.date().required("On update you must specify an end date"),
  })
  .required();

const UpdateEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dbError, setDbError] = useState(null);
  const [event, setEvent] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [attendees, setAttendees] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      start: "",
      end: "",
      describe: "",
    },
  });

  useEffect(() => {
    fetchEvent();
    fetchEmployees();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/events/${id}`);
      setEvent(response.data);
      if (employees.length > 0) {
        const eventAttendees = employees.filter((employee) =>
          event.attendees.includes(employee._id)
        );
        setAttendees(eventAttendees);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      setDbError("Error fetching event");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const employees = response.data;
      setEmployees(employees);

      // If event is already fetched, match the event's attendees with employees
      if (event) {
        const eventAttendees = employees.filter((employee) =>
          event.attendees.includes(employee._id)
        );
        setAttendees(eventAttendees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setDbError("Error fetching employees");
    }
  };

  useEffect(() => {
    if (event) {
      reset({
        title: event.title,
        start: new Date(event.start),
        end: event.end ? new Date(event.end) : "",
        describe: event.describe ? event.describe : "",
      });

      // Set attendees if the employees are already fetched
      if (employees.length > 0) {
        const eventAttendees = employees.filter((employee) =>
          event.attendees.includes(employee._id)
        );
        setAttendees(eventAttendees);
      }
    }
  }, [event, reset, employees]);

  const onSubmit = async (values) => {
    try {
      const updatedEvent = {
        ...values,
        attendees: attendees.map((attendee) => attendee._id),
      };
      await axios.put(`http://localhost:5000/events/${id}`, updatedEvent);
      navigate("/calendar");
    } catch (error) {
      console.error("Error updating event:", error);
      setDbError("Error updating event");
    }
  };

  const handleAttendeeClick = (employee) => {
    if (!employee || !employee._id) return;

    setAttendees((prevAttendees) => {
      if (
        prevAttendees.some(
          (attendee) => attendee && attendee._id === employee._id
        )
      ) {
        return prevAttendees.filter(
          (attendee) => attendee && attendee._id !== employee._id
        );
      } else {
        return [...prevAttendees, employee];
      }
    });
  };

  const scrollToCalendar = () => {
    window.location.href = "http://localhost:5173/calendar";
  };

  return event ? (
    // style={{ height: 400, width: 1000 }}
    <div className="h-full overflow-y-auto">
      {/* <h1
        className="cursor-pointer text-2xl font-bold mb-4"
        onClick={scrollToCalendar}
        style={{ color: "#52B14A" }}
      >
        Calendar
      </h1> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-5 rounded-lg shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Update Event
        </h2>

        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Event Title
          </label>
          <input
            {...register("title")}
            type="text"
            placeholder="Title"
            className="form-input w-full rounded-xl border border-gray-400 p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
            id="title"
          />
          <p className="text-red-500 text-sm">{errors.title?.message}</p>
        </div>

        <div className="mb-6">
          <label htmlFor="start" className="block text-gray-700 font-bold mb-2">
            Start Date
          </label>
          <Controller
            control={control}
            name="start"
            render={({ field }) => (
              <DatePicker
                placeholderText="Select date"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-input w-full rounded-xl border border-gray-400 p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                id="start"
              />
            )}
          />
          <p className="text-red-500 text-sm">{errors.start?.message}</p>
        </div>

        <div className="mb-6">
          <label htmlFor="end" className="block text-gray-700 font-bold mb-2">
            End Date
          </label>
          <Controller
            control={control}
            name="end"
            render={({ field }) => (
              <DatePicker
                placeholderText="Select end date"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-input w-full rounded-xl border border-gray-400 p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                id="end"
              />
            )}
          />
          <p className="text-red-500 text-sm">{errors.end?.message}</p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="describe"
            className="block text-gray-700 font-bold mb-2"
          >
            Event Description{" "}
            <span className="text-sm text-gray-500">(optional)</span>
          </label>
          <input
            {...register("describe")}
            type="text"
            placeholder="Describe your event"
            className="form-input w-full rounded-xl border border-gray-400 p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
            id="describe"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="attendees"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Attendees
          </label>
          <div className="flex flex-wrap gap-4">
            {employees.map((employee) => (
              <button
                type="button"
                key={employee._id}
                onClick={() => handleAttendeeClick(employee)}
                className={`p-2 border rounded-lg ${
                  attendees.some(
                    (attendee) => attendee && attendee._id === employee._id
                  )
                    ? "bg-green-200"
                    : "bg-gray-200"
                }`}
              >
                {employee.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#003E81] to-[#52B14A] text-white rounded-lg px-6 py-3 font-bold hover:bg-gradient-to-r hover:from-[#052c5c] hover:to-[#3b8d37] focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update
          </button>
        </div>
        {dbError && <p className="text-red-500 mt-2">{dbError}</p>}
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default UpdateEvent;