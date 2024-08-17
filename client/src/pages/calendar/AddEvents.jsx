import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import "./custom.css";

const schema = yup
  .object({
    title: yup.string().required("Can't Be Empty"),
    start: yup.date().required("Please specify the time to start"),
    end: yup
      .date()
      .nullable()
      .min(yup.ref("start"), "End date can't be before start date"),
    describe: yup.string().optional(),
  })
  .required();

const AddEvents = ({ onAddEvent }) => {
  const [dbError, setDbError] = useState(null);
  const [dropdownValue, setDropdownValue] = useState("");
  const [firstRender, setFirstRender] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (dbError && !firstRender) {
      alert("Error: " + dbError);
    }
  }, [dbError]);

  const onSubmit = async (values) => {
    setFirstRender(false);
    try {
      const newEvent = {
        title: values.title,
        start: values.start,
        end: values.end,
        describe: values.describe,
        section: dropdownValue,
      };
      const response = await axios.post(
        "http://localhost:5000/events",
        newEvent
      );
      onAddEvent(response.data);
      setDbError(null);
      window.location.href = "http://localhost:5173/calendar";
    } catch (error) {
      setDbError(error.response.data);
    }
  };

  const dropdownOptions = [
    { value: "HR Section", label: "HR Section" },
    { value: "IT Department", label: "IT Department" },
    { value: "Marketing Department", label: "Marketing Department" },
  ];

  const scrollToCalendar = () => {
    window.location.href = "http://localhost:5173/calendar";
  };

  return (
    <div className="mb-9 ml-4" style={{ height: 400, width: 1000 }}>
      <h1
        className="cursor-pointer text-2xl font-bold mb-4"
        onClick={scrollToCalendar}
        style={{ color: "#52B14A" }}
      >
        Calendar
      </h1>
      <Link
        to="/calendar"
        className="text-3xl font-bold mb-4 block text-center text-gray-800 hover:underline"
      ></Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 p-8 rounded-lg shadow-lg border border-blue-800"
      >
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
          Create New Event
        </h2>

        <div className="mb-6 flex items-center">
          <label
            htmlFor="title"
            className="block text-gray-700 font-bold mr-4 w-1/3"
          >
            Event Title
          </label>
          <input
            {...register("title")}
            type="text"
            placeholder="Title"
            className="form-input w-full rounded-xl border border-gray-400 p-3 focus:ring-2 focus:ring-green-400 focus:border-blue-500"
            id="title"
          />
          <p className="text-red-500 text-sm">{errors.title?.message}</p>
        </div>

        <div className="mb-6 flex items-center">
          <label
            htmlFor="start"
            className="block text-gray-700 font-bold mr-4 w-1/3"
          >
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
                className="form-input w-full rounded-xl border border-gray-400 p-3 focus:ring-2 focus:ring-green-400 focus:border-blue-500"
                id="start"
              />
            )}
          />
          <p className="text-red-500 text-sm">{errors.start?.message}</p>
        </div>

        <div className="mb-6 flex items-center">
          <label
            htmlFor="end"
            className="block text-gray-700 font-bold mr-4 w-1/3"
          >
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
                className="form-input w-full rounded-xl border border-gray-400 p-3 focus:ring-2 focus:ring-green-400 focus:border-green-500"
                id="end"
              />
            )}
          />
          <p className="text-red-500 text-sm">{errors.end?.message}</p>
        </div>

        <div className="mb-6 flex items-center">
          <label
            htmlFor="section"
            className="block text-gray-700 font-bold mr-4 w-1/3"
          >
            Responsible Section
          </label>
          <select
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.target.value)}
            className="form-input w-full rounded-xl border border-gray-400 p-3 focus:ring-2 focus:ring-green-400 focus:border-blue-500"
            id="section"
          >
            <option value="">Select an option</option>
            {dropdownOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 flex items-center">
          <label
            htmlFor="describe"
            className="block text-gray-700 font-bold mr-4 w-1/3"
          >
            Event Description <span className="text-gray-500">(optional)</span>
          </label>
          <input
            {...register("describe")}
            type="text"
            placeholder="Describe your event"
            className="form-input w-full rounded-xl border border-gray-400 p-3 focus:ring-2 focus:ring-green-400 focus:border-blue-500"
            id="describe"
          />
        </div>

        <div className="mb-9 flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#003E81] to-[#52B14A] text-white rounded-lg px-6 py-3 font-bold hover:bg-gradient-to-r hover:from-[#052c5c] hover:to-[#3b8d37] focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvents;
