"use client"

import { useState, useEffect } from "react"
import { unstable_noStore as noStore } from "next/cache"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { CheckCircleIcon, ClockIcon, XCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline"

const ClientSelect = dynamic(() => import("./ClientSelect"), { ssr: false })

export default function HomeHabits() {
  noStore()
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchHabits = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/habits", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setHabits(data)
      } else {
        console.error("Error fetching habits")
      }
    } catch (error) {
      console.error("Error fetching habits:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  const getStatusInfo = (status) => {
    switch (status) {
      case "finalizada":
        return {
          icon: CheckCircleIcon,
          color: "text-green-500",
          bgColor: "bg-green-50",
          label: "Completado",
        }
      case "en curso":
        return {
          icon: ClockIcon,
          color: "text-amber-500",
          bgColor: "bg-amber-50",
          label: "En progreso",
        }
      default:
        return {
          icon: XCircleIcon,
          color: "text-gray-400",
          bgColor: "bg-gray-50",
          label: "Pendiente",
        }
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Hábitos 🏆</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={fetchHabits}
            className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-colors"
            title="Actualizar hábitos"
          >
            <ArrowPathIcon className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link href="/habits" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
            <span>Ver todos</span>
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-100 scroll_container">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : habits.length > 0 ? (
          habits.map((habit) => {
            const statusInfo = getStatusInfo(habit.status || "pendiente")
            const StatusIcon = statusInfo.icon

            return (
              <div key={habit.id} className="py-4 flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-bold text-gray-900">{habit.name}</h3>
                    <span
                      className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
                    >
                      {statusInfo.label}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{habit.description}</p>
                </div>

                <ClientSelect id={habit.id} currentStatus={habit.status || "pendiente"} />
              </div>
            )
          })
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">No hay hábitos registrados.</p>
            <Link
              href="/habits"
              className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Crear nuevo hábito
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
