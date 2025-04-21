"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrashIcon, CalendarIcon, FlagIcon, PencilIcon } from "@heroicons/react/24/outline"
import { format, isPast, isToday } from "date-fns"
import { es } from "date-fns/locale"

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return format(date, "d 'de' MMMM, yyyy", { locale: es })
    } catch (error) {
      return dateString
    }
  }

  const getDueStatus = (dateString) => {
    try {
      const date = new Date(dateString)
      if (isPast(date) && !isToday(date)) {
        return {
          label: "Vencida",
          color: "text-red-600",
          bgColor: "bg-red-50",
        }
      } else if (isToday(date)) {
        return {
          label: "Hoy",
          color: "text-amber-600",
          bgColor: "bg-amber-50",
        }
      } else {
        return {
          label: formatDate(dateString),
          color: "text-green-600",
          bgColor: "bg-green-50",
        }
      }
    } catch (error) {
      return {
        label: dateString,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
      }
    }
  }

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case "alta":
        return {
          label: "Alta",
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        }
      case "media":
        return {
          label: "Media",
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
        }
      case "baja":
        return {
          label: "Baja",
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        }
      default:
        return {
          label: "Normal",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        }
    }
  }

  const dueStatus = getDueStatus(task.due_date)
  const priorityInfo = getPriorityInfo(task.priority)

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <input
                type="checkbox"
                checked={task.is_completed}
                onChange={(e) => onStatusChange(task.id, e.target.checked)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <h3 className={`text-lg font-medium ${task.is_completed ? "text-gray-400 line-through" : "text-gray-900"}`}>
              {task.title}
            </h3>
            <span
              className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                task.is_completed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}
            >
              {task.is_completed ? "Completada" : "Pendiente"}
            </span>
          </div>
          <p className={`mt-1 text-sm ${task.is_completed ? "text-gray-400" : "text-gray-500"}`}>{task.description}</p>

          <div className="mt-2 flex items-center text-xs text-gray-500">
            <div className="flex items-center mr-4">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span className={`${dueStatus.color}`}>{dueStatus.label}</span>
            </div>
            <div className="flex items-center mr-4">
              <FlagIcon className="h-4 w-4 mr-1" />
              <span className={`${priorityInfo.color}`}>{priorityInfo.label}</span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              {isExpanded ? "Menos detalles" : "Más detalles"}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {}} // Aquí iría la función para editar
            className="p-1 rounded-full text-gray-400 hover:text-indigo-500 focus:outline-none"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
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
              <h4 className="text-xs font-medium text-gray-500 uppercase">Fecha de vencimiento</h4>
              <p className="mt-1 font-medium">{formatDate(task.due_date)}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-xs font-medium text-gray-500 uppercase">Prioridad</h4>
              <p className="mt-1 font-medium capitalize">{task.priority}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-xs font-medium text-gray-500 uppercase">Categoría</h4>
              <p className="mt-1 font-medium capitalize">{task.category || "Sin categoría"}</p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Editar tarea</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
