"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircleIcon, ClockIcon, XCircleIcon, TrashIcon } from "@heroicons/react/24/outline"

export default function HabitCard({ habit, onStatusChange, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusInfo = (status) => {
    switch (status) {
      case "finalizada":
        return {
          icon: CheckCircleIcon,
          color: "text-green-500",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          label: "Completado",
        }
      case "en curso":
        return {
          icon: ClockIcon,
          color: "text-amber-500",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          label: "En progreso",
        }
      default:
        return {
          icon: XCircleIcon,
          color: "text-gray-400",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          label: "Pendiente",
        }
    }
  }

  const statusInfo = getStatusInfo(habit.status)
  const StatusIcon = statusInfo.icon

  const getFrequencyText = (frequency) => {
    switch (frequency) {
      case "daily":
        return "Diario"
      case "weekly":
        return "Semanal"
      case "monthly":
        return "Mensual"
      default:
        return "Personalizado"
    }
  }

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-gray-900">{habit.name}</h3>
            <span
              className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
            >
              {statusInfo.label}
            </span>
            {habit.streak > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                🔥 {habit.streak} días
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">{habit.description}</p>

          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span className="mr-3">{getFrequencyText(habit.frequency)}</span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              {isExpanded ? "Menos detalles" : "Más detalles"}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex border rounded-md overflow-hidden">
            <button
              onClick={() => onStatusChange(habit.id, "pendiente")}
              className={`px-3 py-1 text-xs font-medium ${
                habit.status === "pendiente" ? "bg-gray-100 text-gray-800" : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              Pendiente
            </button>
            <button
              onClick={() => onStatusChange(habit.id, "en curso")}
              className={`px-3 py-1 text-xs font-medium ${
                habit.status === "en curso" ? "bg-amber-100 text-amber-800" : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              En curso
            </button>
            <button
              onClick={() => onStatusChange(habit.id, "finalizada")}
              className={`px-3 py-1 text-xs font-medium ${
                habit.status === "finalizada"
                  ? "bg-green-100 text-green-800"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              Completado
            </button>
          </div>

          <button
            onClick={() => onDelete(habit.id)}
            className="p-1 rounded-full text-gray-400 hover:text-red-500 focus:outline-none"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-xs font-medium text-gray-500 uppercase">Frecuencia</h4>
              <p className="mt-1 font-medium">{getFrequencyText(habit.frequency)}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-xs font-medium text-gray-500 uppercase">Racha actual</h4>
              <p className="mt-1 font-medium">{habit.streak} días</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-xs font-medium text-gray-500 uppercase">Categoría</h4>
              <p className="mt-1 font-medium capitalize">{habit.category || "Sin categoría"}</p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Editar hábito</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
