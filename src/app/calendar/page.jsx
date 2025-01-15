"use client";

import React, { useState } from "react";
import Calendar from "../calendar/HomeCalendar";
import CalendarEvents from "../calendar/CalendarEvent";

export default function Example() {
  const [reloadCalendar, setReloadCalendar] = useState(false);

  const onCreateEvent = (newEvent) => {
    console.log("Evento creado:", newEvent);

    // Opcional: Aquí puedes hacer cualquier lógica adicional con `newEvent`

    setReloadCalendar(true); // Activa la recarga del calendario
  };

  const onCalendarReloaded = () => {
    setReloadCalendar(false); // Resetea el estado después de que el calendario se recargue
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 mb-5">
        Próximos eventos
      </h2>
      <div className="lg:grid ">
        <CalendarEvents onCreateEvent={onCreateEvent} />
        <div className="mr-24 w-[40rem]">
          <Calendar reload={reloadCalendar} onReloaded={onCalendarReloaded} />
        </div>
      </div>
    </div>
  );
}
