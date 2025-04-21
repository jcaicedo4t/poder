"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { XMarkIcon, CalendarIcon, ClockIcon, TrashIcon, PencilIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import dayjs from "dayjs"

export default function EventDetails({ event, onClose }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  if (!event) return null

  const formatDateTime = (dateTimeString) => {
    const date = dayjs(dateTimeString)
    return {
      date: date.format("D [de] MMMM, YYYY"),
      time: date.format("h:mm A"),
      day: date.format("dddd"),
    }
  }

  const startDateTime = formatDateTime(event.start_time)
  const endDateTime = formatDateTime(event.end_time)

  // Calcular duración del evento
  const calculateDuration = () => {
    const start = dayjs(event.start_time)
    const end = dayjs(event.end_time)
    const diffMinutes = end.diff(start, "minute")
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60

    if (hours === 0) {
      return `${minutes} minutos`
    } else if (minutes === 0) {
      return `${hours} ${hours === 1 ? "hora" : "horas"}`
    } else {
      return `${hours} ${hours === 1 ? "hora" : "horas"} y ${minutes} minutos`
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      // Aquí iría la llamada a la API para eliminar el evento
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulación
      onClose()
    } catch (error) {
      console.error("Error deleting event:", error)
      setIsDeleting(false)
    }
  }

  const handleComplete = async () => {
    setIsCompleting(true)
    try {
      // Aquí iría la llamada a la API para marcar el evento como completado
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulación
      onClose()
    } catch (error) {
      console.error("Error completing event:", error)
      setIsCompleting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="bg-indigo-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-medium text-indigo-800">Detalles del evento</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Cerrar">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h1>
          <p className="text-gray-600">{event.description}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-gray-900 font-medium">{startDateTime.date}</p>
              <p className="text-gray-500 capitalize">{startDateTime.day}</p>
            </div>
          </div>

          <div className="flex items-start">
            <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-gray-900 font-medium">
                {startDateTime.time} - {endDateTime.time}
              </p>
              <p className="text-gray-500">Duración: {calculateDuration()}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {isDeleting ? (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <TrashIcon className="h-4 w-4 mr-2" />
            )}
            Eliminar
          </button>

          <button
            onClick={() => {}}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Editar
          </button>

          {!event.is_completed && (
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isCompleting ? (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <CheckCircleIcon className="h-4 w-4 mr-2" />
              )}
              Marcar como completado
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
