"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarIcon, ClockIcon, CheckCircleIcon, ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline"

export default function Calendar({ reload, onReloaded, onSelectEvent, isLoading }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/calendar")
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error("Error fetching calendar events:", error)
    } finally {
      setLoading(false)
      if (onReloaded) onReloaded() // Notifica al padre que el calendario se ha recargado
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    if (reload) {
      fetchEvents()
    }
  }, [reload])

  // Formatear fecha y hora
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return {
      date: date.toLocaleDateString("es-CO", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      isPast: date < new Date(),
      isToday: new Date().toDateString() === date.toDateString(),
    }
  }

  // Calcular duración del evento
  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime)
    const end = new Date(endTime)
    const diffMs = end - start
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (diffHrs === 0) {
      return `${diffMins} min`
    } else if (diffMins === 0) {
      return `${diffHrs} h`
    } else {
      return `${diffHrs} h ${diffMins} min`
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <CalendarIcon className="h-6 w-6 text-indigo-600 mr-2" />
          {pathname === "/calendar" ? "Eventos del calendario" : "Próximos eventos"}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={fetchEvents}
            className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-colors"
            title="Actualizar eventos"
          >
            <ArrowPathIcon className={`h-5 w-5 ${loading || isLoading ? "animate-spin" : ""}`} />
          </button>
          {pathname === "/dashboard" && (
            <Link
              href="/calendar"
              className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-colors"
              title="Ver calendario completo"
            >
              <Image src="/images/addcalendar.png" width={24} height={24} alt="Ver calendario" />
            </Link>
          )}
        </div>
      </div>

      {loading || isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : events.length > 0 ? (
        <AnimatePresence>
          <div className="space-y-4">
            {events.map((event) => {
              const startDateTime = formatDateTime(event.start_time)
              const endDateTime = formatDateTime(event.end_time)
              const duration = calculateDuration(event.start_time, event.end_time)

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg border ${
                    event.is_completed
                      ? "bg-green-50 border-green-100"
                      : startDateTime.isPast
                        ? "bg-red-50 border-red-100"
                        : startDateTime.isToday
                          ? "bg-amber-50 border-amber-100"
                          : "bg-white border-gray-200"
                  } hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => onSelectEvent && onSelectEvent(event)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          <span>{startDateTime.date}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>
                            {startDateTime.time} - {endDateTime.time}
                          </span>
                        </div>
                        <div className="text-gray-400 text-xs">({duration})</div>
                      </div>
                    </div>
                    <div>
                      {event.is_completed ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Completado
                        </span>
                      ) : startDateTime.isPast ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Vencido
                        </span>
                      ) : startDateTime.isToday ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Hoy
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Próximo
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </AnimatePresence>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay eventos</h3>
          <p className="mt-1 text-sm text-gray-500">Comienza creando un nuevo evento en tu calendario.</p>
          <div className="mt-6">
            <button
              id="add-event-button"
              type="button"
              onClick={() => document.getElementById("calendar-add-event-button")?.click()}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Nuevo Evento
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
