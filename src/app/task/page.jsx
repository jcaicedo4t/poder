"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PlusIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import AddTaskModal from "./components/AddTaskModal"
import TaskCard from "./components/TaskCard"
import TaskFilters from "./components/TaskFilters"

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
    search: "",
  })

  // Simular carga de tareas desde la API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // En un caso real, aquí harías una llamada a la API
        // Por ahora, usamos datos de ejemplo
        const sampleTasks = [
          {
            id: 1,
            title: "Completar informe mensual",
            description: "Finalizar el informe de ventas para la reunión del viernes",
            is_completed: false,
            due_date: "2023-12-15",
            priority: "alta",
            category: "trabajo",
          },
          {
            id: 2,
            title: "Comprar víveres",
            description: "Ir al supermercado para la cena del fin de semana",
            is_completed: true,
            due_date: "2023-12-10",
            priority: "media",
            category: "personal",
          },
          {
            id: 3,
            title: "Llamar al médico",
            description: "Agendar cita para chequeo anual",
            is_completed: false,
            due_date: "2023-12-20",
            priority: "alta",
            category: "salud",
          },
          {
            id: 4,
            title: "Pagar facturas",
            description: "Pagar facturas de servicios públicos",
            is_completed: false,
            due_date: "2023-12-25",
            priority: "media",
            category: "finanzas",
          },
          {
            id: 5,
            title: "Preparar presentación",
            description: "Crear diapositivas para la reunión con el cliente",
            is_completed: false,
            due_date: "2023-12-18",
            priority: "alta",
            category: "trabajo",
          },
        ]

        setTimeout(() => {
          setTasks(sampleTasks)
          setLoading(false)
        }, 800) // Simular tiempo de carga
      } catch (error) {
        console.error("Error fetching tasks:", error)
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: tasks.length + 1,
      is_completed: false,
    }
    setTasks([...tasks, newTask])
  }

  const updateTaskStatus = (id, isCompleted) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              is_completed: isCompleted,
            }
          : task,
      ),
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: e.target.value,
    })
  }

  // Filtrar tareas según los criterios
  const filteredTasks = tasks.filter((task) => {
    // Filtrar por estado
    if (filters.status !== "all") {
      if (filters.status === "completed" && !task.is_completed) return false
      if (filters.status === "pending" && task.is_completed) return false
    }

    // Filtrar por prioridad
    if (filters.priority !== "all" && task.priority !== filters.priority) return false

    // Filtrar por categoría
    if (filters.category !== "all" && task.category !== filters.category) return false

    // Filtrar por búsqueda
    if (
      filters.search &&
      !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !task.description.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false

    return true
  })

  // Agrupar tareas por categoría
  const tasksByCategory = filteredTasks.reduce((acc, task) => {
    const category = task.category || "otros"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(task)
    return acc
  }, {})

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Mis Tareas</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Barra de búsqueda */}
          <div className="relative flex-grow sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={filters.search}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Buscar tareas"
            />
          </div>

          {/* Botones de filtro y añadir */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filtros
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nueva Tarea
            </motion.button>
          </div>
        </div>
      </div>

      {/* Panel de filtros */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <TaskFilters filters={filters} setFilters={setFilters} />
        </motion.div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredTasks.length === 0 ? (
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
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay tareas</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filters.search || filters.status !== "all" || filters.priority !== "all" || filters.category !== "all"
              ? "No se encontraron tareas con los filtros aplicados."
              : "Comienza creando una nueva tarea para organizar tu día."}
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Nueva Tarea
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
            <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-medium text-indigo-800 capitalize">{category}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {categoryTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TaskCard task={task} onStatusChange={updateTaskStatus} onDelete={deleteTask} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <AddTaskModal showModal={showModal} setShowModal={setShowModal} addTask={addTask} />
    </div>
  )
}
