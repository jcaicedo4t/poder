"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import "tailwindcss/tailwind.css";

import "dayjs/locale/es"; // Importar el idioma español

dayjs.locale("es"); // Establecer el idioma globalmente
import AddEventCalendar from "./AddEventCalendarModal";
export default function CalendarEvents({onCreateEvent}) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  console.log(currentDate);
  const startOfMonth = currentDate.startOf("month").startOf("week");
  const endOfMonth = currentDate.endOf("month").endOf("week");
  const [showModal, setShowModal] = useState(false);

  const daysInCalendar = [];
  let day = startOfMonth;
  while (day.isBefore(endOfMonth, "day")) {
    daysInCalendar.push(day);
    day = day.add(1, "day");
  }

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };
  

  return (
    <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9 ml-3 w-100 md:w-80">
      {/* Header del calendario */}
      <div className="flex items-center justify-between text-gray-900">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 text-gray-400 hover:text-gray-500"
        >
          &lt;
        </button>
        <h2 className="text-sm font-semibold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 text-gray-400 hover:text-gray-500"
        >
          &gt;
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 text-xs text-gray-500 mt-6">
        {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
          <div key={index} className="text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Fechas del calendario */}
      <div className="grid grid-cols-7 gap-px mt-2 bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {daysInCalendar.map((day, index) => (
          <button
            key={index}
            type="button"
            className={`py-1.5 ${
              day.isSame(currentDate, "month") ? "bg-white" : "bg-gray-50"
            } hover:bg-gray-100 focus:z-10 ${
              day.isSame(dayjs(), "day") ? "text-indigo-600 font-semibold" : ""
            }`}
          >
            <time
              dateTime={day.format("YYYY-MM-DD")}
              className={`mx-auto flex size-7 items-center justify-center rounded-full ${
                day.isSame(dayjs(), "day") ? "bg-indigo-600 text-white" : ""
              }`}
            >
              {day.date()}
            </time>
          </button>
        ))}
      </div>

      {/* Botón para añadir eventos */}
      <button
        type="button"
        onClick={setShowModal}
        className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
      >
        Añadir evento
      </button>

      <AddEventCalendar
        showModal={showModal}
        setShowModal={setShowModal}
        onCreateEvent={onCreateEvent}
   
      />
    </div>
  );
}
