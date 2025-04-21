"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PlusIcon } from "@heroicons/react/24/outline"
import AddHabitModal from "./components/AddHabitModal"
import HabitCard from "./components/HabitCard"

export default function Habits() {
  const [habits, setHabits] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  // Simular carga de hábitos desde la API
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        // En un caso real, aquí harías una llamada a la API
        // Por ahora, usamos datos de ejemplo
        const sampleHabits = [
          {
            id: 1,
            name: "Ejercicio diario",
            description: "30 minutos de actividad física",
            status: "en curso",
            streak: 5,
            frequency: "daily",
            category: "salud",
          },
          {
            id: 2,
            name: "Meditación",
            description: "15 minutos de meditación mindfulness",
            status: "finalizada",
            streak: 12,
            frequency: "daily",
            category: "bienestar",
          },
          {
            id: 3,
            name: "Lectura",
            description: "Leer 20 páginas de un libro",
            status: "pendiente",
            streak: 0,
            frequency: "daily",
            category: "desarrollo",
          },
          {
            id: 4,
            name: "Programación",
            description: "Practicar código por 1 hora",
            status: "en curso",
            streak: 8,
            frequency: "weekly",
            category: "desarrollo",
          },
        ]

        setTimeout(() => {
          setHabits(sampleHabits)
          setLoading(false)
        }, 800) // Simular tiempo de carga
      } catch (error) {
        console.error("Error fetching habits:", error)
        setLoading(false)
      }
    }

    fetchHabits()
  }, [])

  const addHabit = (habit) => {
    const newHabit = {
      ...habit,
      id: habits.length + 1,
      streak: 0,
      status: "pendiente",
    }
    setHabits([...habits, newHabit])
  }

  const updateHabitStatus = (id, newStatus) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              status: newStatus,
              streak: newStatus === "finalizada" ? habit.streak + 1 : habit.streak,
            }
          : habit,
      ),
    )
  }

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id))
  }

  // Agrupar hábitos por categoría
  const habitsByCategory = habits.reduce((acc, habit) => {
    const category = habit.category || "otros"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(habit)
    return acc
  }, {})

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mis Hábitos</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Nuevo Hábito
        </motion.button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : habits.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tienes hábitos</h3>
          <p className="mt-1 text-sm text-gray-500">Comienza creando un nuevo hábito para mejorar tu rutina diaria.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Nuevo Hábito
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(habitsByCategory).map(([category, categoryHabits]) => (
            <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-medium text-indigo-800 capitalize">{category}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {categoryHabits.map((habit) => (
                  <motion.div
                    key={habit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HabitCard habit={habit} onStatusChange={updateHabitStatus} onDelete={deleteHabit} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <AddHabitModal showModal={showModal} setShowModal={setShowModal} addHabit={addHabit} />
    </div>
  )
}
