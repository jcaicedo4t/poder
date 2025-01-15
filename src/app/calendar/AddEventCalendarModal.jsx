"use client";

import { useState } from "react";
import axios from "axios";
// import Calendar from "./HomeCalendar";
// import eventEmitter from "../../../pages/api/eventEmitter";

export default function AddEventCalendar({ showModal, setShowModal , onCreateEvent }) {
  const [habit, setHabit] = useState({ name: "", description: "" });
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabit((prevHabit) => ({
      ...prevHabit,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/addEvent",
        {
          user_id: 1, // Hardcoded for demonstration, should be dynamic
          ...habit,
          start_time: startDateTime,
          end_time: endDateTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
      
        onCreateEvent();
        console.log("New event added:", response.data);
        // Refresh the list of events
      } else {
        console.error("Error adding event");
      }
    } catch (error) {
      console.error("Error making request:", error);
    }

    setHabit({ name: "", description: "" });
    setStartDateTime("");
    setEndDateTime("");
    setShowModal(false);
    
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-black hover:text-black mr-2"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h2 className="text-1xl font-bold text-center mb-4">
              Nuevo evento
            </h2>
            <form onSubmit={handleSubmit}>
              <div class="relative w-full min-w-[200px] h-10 mb-5">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={habit.name}
                  onChange={handleChange}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                  required
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Título
                </label>
              </div>
              <div class="relative w-full min-w-[200px] h-100 mt-6">
                <textarea
                  id="description"
                  name="description"
                  value={habit.description}
                  onChange={handleChange}
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=""
                  required
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Descripción:
                </label>
              </div>

              <div className="relative w-full min-w-[200px] h-10 mb-5 mt-6">
                <label className="block mb-1 text-sm text-gray-700">
                  Fecha y hora de inicio:
                </label>
                <input
                  type="datetime-local"
                  value={startDateTime}
                  onChange={(e) => setStartDateTime(e.target.value)}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  required
                />
              </div>

              <div className="relative w-full min-w-[200px] h-10 mb-5 mt-14">
                <label className="block mb-1 text-sm text-gray-700">
                  Fecha y hora de fin:
                </label>
                <input
                  type="datetime-local"
                  value={endDateTime}
                  onChange={(e) => setEndDateTime(e.target.value)}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  required
                />
              </div>

              <div className="flex justify-end mt-10">
                <button
                  type="submit"
                  className="ml-3 shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 cursor-pointer"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        
        </div>
      )}
    </>
  );
}
