"use client"
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline"
import "dayjs/locale/es" // Importar el idioma español

dayjs.locale("es") // Establecer el idioma globalmente
import AddEventCalendar from "./AddEventCalendarModal"

export default function CalendarEvents({ onCreateEvent, onSelectEvent }) {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)
  const [loading, setLoading] = useState(true)

  const startOfMonth = currentDate.startOf("month").startOf("week")
  const endOfMonth = currentDate.endOf("month").endOf("week")

  const daysInCalendar = []
  let day = startOfMonth
  while (day.isBefore(endOfMonth, "day")) {
    daysInCalendar.push(day)
    day = day.add(1, "day")
  }

  // Obtener eventos del calendario
  useEffect(() => {
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
      }
    }

    fetchEvents()
  }, [])

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"))
  }

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"))
  }

  const handleDayClick = (day) => {
    setSelectedDay(day)

    // Si hay eventos para este día y existe la función onSelectEvent, seleccionar el primer evento
    const dayEvents = getEventsForDay(day)
    if (dayEvents.length > 0 && onSelectEvent) {
      onSelectEvent(dayEvents[0])
    } else {
      // Si no hay eventos, abrir el modal para crear uno nuevo
      setShowModal(true)
    }
  }

  const handleCreateEvent = () => {
    if (onCreateEvent) {
      onCreateEvent()
    }
  }

  // Verificar si un día tiene eventos
  const getEventsForDay = (day) => {
    return events.filter((event) => {
      const eventStart = dayjs(event.start_time)
      return eventStart.format("YYYY-MM-DD") === day.format("YYYY-MM-DD")
    })
  }

  // Verificar si un día es pasado (anterior a hoy)
  const isPastDay = (day) => {
    const today = dayjs().startOf("day")
    return day.isBefore(today, "day")
  }

  return (
    <div className="w-full">
      {/* Header del calendario */}
      <div className="flex items-center justify-between text-gray-900 mb-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
        </motion.button>
        <h2 className="text-xl font-bold capitalize">{currentDate.format("MMMM YYYY")}</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-600" />
        </motion.button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 text-sm font-medium text-gray-700 mb-2">
        {["L", "M", "X", "J", "V", "S", "D"].map((day, index) => (
          <div key={index} className="text-center py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Fechas del calendario */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {daysInCalendar.map((day, index) => {
          const isToday = day.isSame(dayjs(), "day")
          const isCurrentMonth = day.isSame(currentDate, "month")
          const dayEvents = getEventsForDay(day)
          const hasEvents = dayEvents.length > 0
          const isPast = isPastDay(day)

          return (
            <motion.button
              key={index}
              whileHover={{ scale: isPast ? 1 : 1.05 }}
              whileTap={{ scale: isPast ? 1 : 0.95 }}
              type="button"
              onClick={() => !isPast && handleDayClick(day)}
              disabled={isPast}
              className={`relative h-16 sm:h-24 p-1 rounded-lg flex flex-col items-center justify-start ${
                isCurrentMonth
                  ? isToday
                    ? "bg-indigo-100 text-indigo-800 font-bold"
                    : isPast
                      ? "bg-gray-50 text-gray-400 cursor-not-allowed opacity-70"
                      : "bg-white hover:bg-gray-50"
                  : isPast
                    ? "bg-gray-50 text-gray-300 cursor-not-allowed opacity-70"
                    : "bg-gray-50 text-gray-400"
              } border ${isToday ? "border-indigo-300" : "border-gray-200"}`}
            >
              <span
                className={`text-sm ${
                  isToday ? "bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center" : ""
                }`}
              >
                {day.date()}
              </span>

              {/* Indicadores de eventos */}
              {hasEvents && (
                <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                  <div className="flex space-x-1">
                    {dayEvents.length > 2 ? (
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    ) : (
                      dayEvents.map((_, i) => <span key={i} className="w-2 h-2 bg-indigo-500 rounded-full"></span>)
                    )}
                  </div>
                </div>
              )}

              {/* Mostrar primer evento si hay espacio */}
              {hasEvents && dayEvents[0] && (
                <div className="mt-1 w-full px-1">
                  <div
                    className="text-xs truncate bg-indigo-50 text-indigo-700 rounded px-1 py-0.5"
                    title={dayEvents[0].title}
                  >
                    {dayEvents[0].title}
                  </div>
                  {dayEvents.length > 1 && (
                    <div className="text-xs text-gray-500 text-center mt-0.5">+{dayEvents.length - 1} más</div>
                  )}
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Botón para añadir eventos */}
      <div className="flex justify-center">
        <motion.button
          id="calendar-add-event-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => {
            setSelectedDay(dayjs()) // Usar la fecha actual si no hay día seleccionado
            setShowModal(true)
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Añadir evento
        </motion.button>
      </div>

      <AddEventCalendar
        showModal={showModal}
        setShowModal={setShowModal}
        onCreateEvent={handleCreateEvent}
        selectedDate={selectedDay ? selectedDay.toDate() : new Date()}
      />
    </div>
  )
}
