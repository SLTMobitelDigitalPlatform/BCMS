import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup
  .object({
    title: yup.string().required("Can't Be Empty"),
    start: yup.date().required("Please specify the time to start"),
    end: yup.date().required("Please specify an end date"),
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
      attendees: [],
    },
  });

  useEffect(() => {
    fetchEventAndEmployees();
  }, [id]);

  const fetchEventAndEmployees = async () => {
    try {
      const [eventResponse, employeesResponse] = await Promise.all([
        axios.get(`http://localhost:5000/events/${id}`),
        axios.get(`http://localhost:5000/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      const eventData = eventResponse.data;
      const employeesData = employeesResponse.data;

      setEvent(eventData);
      setEmployees(employeesData);

      // Set initial attendees
      const eventAttendees = employeesData.filter((employee) =>
        eventData.attendees.includes(employee._id)
      );
      setAttendees(eventAttendees);

      reset({
        title: eventData.title,
        start: new Date(eventData.start),
        end: eventData.end ? new Date(eventData.end) : "",
        describe: eventData.describe || "",
        attendees: eventAttendees.map((attendee) => ({
          value: attendee._id,
          label: attendee.name,
        })),
      });
    } catch (error) {
      console.error("Error fetching event or employees:", error);
      setDbError("Error fetching data");
    }
  };

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

  const attendeeOptions = employees.map((employee) => ({
    value: employee._id,
    label: employee.name,
  }));

  return event ? (
    <div className="h-full overflow-y-auto">
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
          <Controller
            control={control}
            name="attendees"
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={attendeeOptions}
                value={attendeeOptions.filter((option) =>
                  attendees.some((attendee) => attendee._id === option.value)
                )}
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                  setAttendees(
                    selectedOptions.map((option) => ({
                      _id: option.value,
                      name: option.label,
                    }))
                  );
                }}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            )}
          />
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
