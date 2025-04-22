"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/outline"
import Loader from "../components/Loader"
import dynamic from "next/dynamic"

const ClientSelect = dynamic(() => import("./ClientSelect"), { ssr: false })

export default function HomeHabits() {
  const { data: session, status } = useSession()
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHabits = async () => {
      if (status === "authenticated") {
        try {
          setLoading(true)
          const response = await fetch("/api/habits")
          if (response.ok) {
            const data = await response.json()
            setHabits(data)
          } else {
            console.error("Error fetching habits:", response.statusText)
          }
        } catch (error) {
          console.error("Error fetching habits:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchHabits()
  }, [status])

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
        <p className="text-gray-500 mb-4">Inicia sesión para ver tus hábitos</p>
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
        <h2 className="text-xl font-bold text-gray-900">Hábitos 🏆</h2>
        <Link href="/habits" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
          <Image src="/images/addhabits.png" width={35} height={35} alt="Gestionar hábitos" className="mr-2" />
          <span>Ver todos</span>
        </Link>
      </div>

      <div className="divide-y divide-gray-100 scroll_container">
        {habits.length > 0 ? (
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
