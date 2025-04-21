"use client"

import { XMarkIcon } from "@heroicons/react/24/outline"

const categories = [
  { id: "all", name: "Todas" },
  { id: "trabajo", name: "Trabajo" },
  { id: "personal", name: "Personal" },
  { id: "salud", name: "Salud" },
  { id: "finanzas", name: "Finanzas" },
  { id: "educacion", name: "Educación" },
  { id: "otros", name: "Otros" },
]

const priorities = [
  { id: "all", name: "Todas" },
  { id: "alta", name: "Alta" },
  { id: "media", name: "Media" },
  { id: "baja", name: "Baja" },
]

const statuses = [
  { id: "all", name: "Todas" },
  { id: "pending", name: "Pendientes" },
  { id: "completed", name: "Completadas" },
]

export default function TaskFilters({ filters, setFilters }) {
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    })
  }

  const clearFilters = () => {
    setFilters({
      status: "all",
      priority: "all",
      category: "all",
      search: "",
    })
  }

  const isFiltersActive =
    filters.status !== "all" || filters.priority !== "all" || filters.category !== "all" || filters.search !== ""

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Filtros</h3>
        {isFiltersActive && (
          <button onClick={clearFilters} className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
            <XMarkIcon className="h-4 w-4 mr-1" />
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtro por estado */}
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por prioridad */}
        <div>
          <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Prioridad
          </label>
          <select
            id="priority-filter"
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {priorities.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por categoría */}
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
