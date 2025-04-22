"use client"

import { useState, useEffect, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import dayjs from "dayjs"

export default function AddEventCalendar({ showModal, setShowModal, onCreateEvent, selectedDate }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  // Actualizar fechas cuando se selecciona un día en el calendario
  useEffect(() => {
    if (selectedDate) {
      const today = dayjs(selectedDate)
      // Si la fecha es hoy, usar la hora actual redondeada a la siguiente hora
      let startHour = 9 // Hora predeterminada para inicio (9 AM)
      let endHour = 10 // Hora predeterminada para fin (10 AM)

      if (today.isSame(dayjs(), "day")) {
        const currentHour = dayjs().hour()
        startHour = currentHour + 1 // Próxima hora
        endHour = startHour + 1 // Una hora después
      }

      const startTime = today.hour(startHour).minute(0).format("YYYY-MM-DDTHH:mm")
      const endTime = today.hour(endHour).minute(0).format("YYYY-MM-DDTHH:mm")

      setFormData((prev) => ({
        ...prev,
        startDateTime: startTime,
        endDateTime: endTime,
      }))
    }
  }, [selectedDate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

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
    if (!formData.name.trim()) newErrors.name = "El título es obligatorio"
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria"
    if (!formData.startDateTime) newErrors.startDateTime = "La fecha y hora de inicio son obligatorias"
    if (!formData.endDateTime) newErrors.endDateTime = "La fecha y hora de fin son obligatorias"

    // Validar que la fecha de inicio no sea en el pasado
    const now = dayjs()
    const start = dayjs(formData.startDateTime)
    if (start.isBefore(now)) {
      newErrors.startDateTime = "No se pueden crear eventos en fechas pasadas"
    }

    // Validar que la fecha de fin sea posterior a la de inicio
    if (formData.startDateTime && formData.endDateTime) {
      const end = dayjs(formData.endDateTime)
      if (end.isSame(start) || end.isBefore(start)) {
        newErrors.endDateTime = "La fecha de fin debe ser posterior a la de inicio"
      }
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post(
        "/api/addEvent",
        {
          user_id: 1, // Hardcoded for demonstration, should be dynamic
          name: formData.name,
          description: formData.description,
          start_time: formData.startDateTime,
          end_time: formData.endDateTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.status === 200) {
        onCreateEvent()
        console.log("New event added:", response.data)
      } else {
        console.error("Error adding event")
      }
    } catch (error) {
      console.error("Error making request:", error)
    } finally {
      setIsSubmitting(false)
    }

    // Resetear el formulario
    setFormData({
      name: "",
      description: "",
      startDateTime: "",
      endDateTime: "",
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
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                    <CalendarIcon className="h-5 w-5 text-indigo-600 mr-2" />
                    Nuevo evento
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
                        Título del evento
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
                      <label
                        htmlFor="startDateTime"
                        className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                      >
                        <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                        Fecha y hora de inicio
                      </label>
                      <input
                        type="datetime-local"
                        id="startDateTime"
                        name="startDateTime"
                        value={formData.startDateTime}
                        onChange={handleChange}
                        min={dayjs().format("YYYY-MM-DDTHH:mm")} // Impedir seleccionar fechas pasadas en el input
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                          errors.startDateTime ? "border-red-300" : ""
                        }`}
                      />
                      {errors.startDateTime && <p className="mt-1 text-xs text-red-600">{errors.startDateTime}</p>}
                      {!errors.startDateTime && (
                        <p className="mt-1 text-xs text-gray-500">No se pueden crear eventos en fechas pasadas</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="endDateTime"
                        className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                      >
                        <ClockIcon className="h-4 w-4 mr-1 text-gray-500" />
                        Fecha y hora de fin
                      </label>
                      <input
                        type="datetime-local"
                        id="endDateTime"
                        name="endDateTime"
                        value={formData.endDateTime}
                        onChange={handleChange}
                        min={formData.startDateTime} // Impedir seleccionar fechas anteriores a la fecha de inicio
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                          errors.endDateTime ? "border-red-300" : ""
                        }`}
                      />
                      {errors.endDateTime && <p className="mt-1 text-xs text-red-600">{errors.endDateTime}</p>}
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
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Creando...
                        </>
                      ) : (
                        "Crear evento"
                      )}
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
