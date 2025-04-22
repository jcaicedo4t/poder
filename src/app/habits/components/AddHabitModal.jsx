"use client"

import { useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"

const categories = [
  { id: "salud", name: "Salud" },
  { id: "bienestar", name: "Bienestar" },
  { id: "desarrollo", name: "Desarrollo personal" },
  { id: "productividad", name: "Productividad" },
  { id: "finanzas", name: "Finanzas" },
  { id: "otros", name: "Otros" },
]

const frequencies = [
  { id: "daily", name: "Diario" },
  { id: "weekly", name: "Semanal" },
  { id: "monthly", name: "Mensual" },
  { id: "custom", name: "Personalizado" },
]

export default function AddHabitModal({ showModal, setShowModal, addHabit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "salud",
    frequency: "daily",
  })
  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio"
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria"
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    addHabit({
      ...formData,
      user_id: 1, // En un caso real, esto vendría del contexto de autenticación
    })

    // Resetear el formulario
    setFormData({
      name: "",
      description: "",
      category: "salud",
      frequency: "daily",
    })

    setShowModal(false)
  }

  const handleFocus = (name) => {
    setFocusedField(name)
  }

  const handleBlur = (name) => {
    if (!formData[name]) {
      setFocusedField(null)
    }
  }

  const isActive = (name) => {
    return focusedField === name || formData[name]
  }

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setShowModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Crear nuevo hábito
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowModal(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={() => handleBlur("name")}
                        className={`peer h-10 w-full rounded-lg border bg-transparent px-3 py-2 outline-none transition-all ${
                          errors.name
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-indigo-500"
                        }`}
                      />
                      <label
                        htmlFor="name"
                        className={`absolute left-3 transition-all duration-200 ${
                          isActive("name")
                            ? "-top-2.5 text-xs text-indigo-600 bg-white px-1"
                            : "top-2 text-sm text-gray-500"
                        }`}
                      >
                        Nombre del hábito
                      </label>
                      {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        onFocus={() => handleFocus("description")}
                        onBlur={() => handleBlur("description")}
                        className={`peer w-full rounded-lg border bg-transparent px-3 py-2 outline-none transition-all ${
                          errors.description
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-indigo-500"
                        }`}
                      />
                      <label
                        htmlFor="description"
                        className={`absolute left-3 transition-all duration-200 ${
                          isActive("description")
                            ? "-top-2.5 text-xs text-indigo-600 bg-white px-1"
                            : "top-2 text-sm text-gray-500"
                        }`}
                      >
                        Descripción
                      </label>
                      {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                        Frecuencia
                      </label>
                      <select
                        id="frequency"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        {frequencies.map((frequency) => (
                          <option key={frequency.id} value={frequency.id}>
                            {frequency.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Crear hábito
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
