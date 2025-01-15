"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Calendar({ reload, onReloaded }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/calendar");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    } finally {
      setLoading(false);
      if (onReloaded) onReloaded(); // Notifica al padre que el calendario se ha recargado
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

 
  return (
    <div className="bg-white shadow-md rounded-lg p-6 h-[500px]">
      <h2
        className="text-xl font-bold mb-4 ml-4"
        style={{
          marginRight: "-9px",
        }}
      >
        Calendario 📅


        {pathname === "/calendar" && (
       <button
       onClick={fetchEvents}
       style={{
         float: "right",
       }}
     >
       <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         strokeWidth={1.5}
         stroke="currentColor"
         className="size-6"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
         />
       </svg>
     </button>
     
        )}
        {pathname === "/dashboard" && (
          <Link
            href="/calendar"
            style={{
              float: "right",
            }}
          >
            <Image
              src="/images/redirect.png"
              width={35}
              height={35}
              alt="Picture of the author"
            />
          </Link>
        )}
      </h2>

      {loading ? (
        <p>Cargando eventos...</p>
      ) : events.length > 0 ? (
        <div className="divide-y divide-gray-200 scroll_container">
          {events.map((event) => (
            <div key={event.id} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="text-gray-500">{event.description}</p>
                  <p className="text-gray-500">
                    {formatDate(event.start_time)} -{" "}
                    {formatDate(event.end_time)}
                  </p>
                </div>
                <div>
                  {event.is_completed ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completada
                    </span>
                  ) : (
                    <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Pendiente
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay eventos disponibles.</p>
      )}
    </div>
  );
}

function formatDate(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleString("es-CO", { timeZone: "America/Bogota" });
}
