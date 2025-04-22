"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircleIcon, ClockIcon, CalendarIcon } from "@heroicons/react/24/outline"
import Loader from "../components/Loader"

export default function HomeTask() {
  const { data: session, status } = useSession()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      if (status === "authenticated") {
        try {
          setLoading(true)
          const response = await fetch("/api/tasks")
          if (response.ok) {
            const data = await response.json()
            setTasks(data)
          } else {
            console.error("Error fetching tasks:", response.statusText)
          }
        } catch (error) {
          console.error("Error fetching tasks:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchTasks()
  }, [status])

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "short",
      }).format(date)
    } catch (error) {
      return ""
    }
  }

  // Función para obtener información de prioridad
  const getPriorityInfo = (priority) => {
    switch (priority) {
      case "alta":
        return { color: "text-red-600", bgColor: "bg-red-50" }
      case "media":
        return { color: "text-amber-600", bgColor: "bg-amber-50" }
      case "baja":
        return { color: "text-green-600", bgColor: "bg-green-50" }
      default:
        return { color: "text-gray-600", bgColor: "bg-gray-50" }
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 h-[500px] flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 h-[500px] flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Inicia sesión para ver tus tareas</p>
        <Link
          href="/login"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Iniciar sesión
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Tareas 📕</h2>
        <Link href="/task" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
          <span>Ver todas</span>
        </Link>
      </div>

      <div className="divide-y divide-gray-100 scroll_container">
        {tasks.length > 0 ? (
          tasks.map((task) => {
            const priorityInfo = getPriorityInfo(task.priority || "media")

            return (
              <div key={task.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {task.is_completed ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <ClockIcon className="h-5 w-5 text-amber-500 mr-2" />
                    )}
                    <h3
                      className={`text-lg font-bold ${task.is_completed ? "text-gray-400 line-through" : "text-gray-900"}`}
                    >
                      {task.title}
                    </h3>
                  </div>

                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task.is_completed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {task.is_completed ? "Completada" : "Pendiente"}
                  </span>
                </div>

                <p className={`text-gray-500 mt-1 ${task.is_completed ? "text-gray-400" : ""}`}>{task.description}</p>

                {task.due_date && (
                  <div className="flex items-center mt-2 text-sm">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="text-gray-500">{formatDate(task.due_date)}</span>

                    {task.priority && (
                      <span
                        className={`ml-3 px-2 py-0.5 rounded-full text-xs font-medium ${priorityInfo.bgColor} ${priorityInfo.color}`}
                      >
                        {task.priority === "alta" ? "Prioritaria" : task.priority === "media" ? "Media" : "Baja"}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">No hay tareas registradas.</p>
            <Link
              href="/task"
              className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Crear nueva tarea
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
