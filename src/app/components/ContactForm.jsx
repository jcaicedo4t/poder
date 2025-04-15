"use client"

import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
    message: "",
    acceptTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Limpiar error del campo cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es obligatorio"
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio"

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del email no es válido"
    }

    if (!formData.profession.trim()) newErrors.profession = "La profesión es obligatoria"
    if (!formData.acceptTerms) newErrors.acceptTerms = "Debes aceptar los términos y condiciones"

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
      // Aquí normalmente enviarías los datos a tu API
      // Por ahora simulamos una respuesta exitosa después de un breve retraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitStatus({
        success: true,
        message: "¡Tu postulación ha sido enviada con éxito! Nos pondremos en contacto contigo pronto.",
      })

      // Resetear el formulario después de enviar
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        profession: "",
        message: "",
        acceptTerms: false,
      })
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Ha ocurrido un error al enviar tu postulación. Por favor, intenta nuevamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-auto relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar formulario"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Postúlate a nuestro equipo</h2>
            <p className="text-gray-600 mt-1">Completa el formulario para unirte a nosotros</p>
          </div>

          {submitStatus ? (
            <div className={`rounded-md p-4 mb-6 ${submitStatus.success ? "bg-green-50" : "bg-red-50"}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {submitStatus.success ? (
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${submitStatus.success ? "text-green-800" : "text-red-800"}`}>
                    {submitStatus.message}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitStatus(null)
                    if (submitStatus.success) {
                      onClose()
                    }
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {submitStatus.success ? "Cerrar" : "Intentar nuevamente"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={() => handleFocus("firstName")}
                    onBlur={() => handleBlur("firstName")}
                    className={`peer h-10 w-full rounded-lg border bg-transparent px-3 py-2 outline-none transition-all ${
                      errors.firstName
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-indigo-500"
                    }`}
                  />
                  <label
                    htmlFor="firstName"
                    className={`absolute left-3 transition-all duration-200 ${
                      isActive("firstName")
                        ? "-top-2.5 text-xs text-indigo-600 bg-white px-1"
                        : "top-2 text-sm text-gray-500"
                    }`}
                  >
                    Nombre
                  </label>
                  {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={() => handleFocus("lastName")}
                    onBlur={() => handleBlur("lastName")}
                    className={`peer h-10 w-full rounded-lg border bg-transparent px-3 py-2 outline-none transition-all ${
                      errors.lastName
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-indigo-500"
                    }`}
                  />
                  <label
                    htmlFor="lastName"
                    className={`absolute left-3 transition-all duration-200 ${
                      isActive("lastName")
                        ? "-top-2.5 text-xs text-indigo-600 bg-white px-1"
                        : "top-2 text-sm text-gray-500"
                    }`}
                  >
                    Apellido
                  </label>
                  {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  className={`peer h-10 w-full rounded-lg border bg-transparent px-3 py-2 outline-none transition-all ${
                    errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-indigo-500"
                  }`}
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 transition-all duration-200 ${
                    isActive("email") ? "-top-2.5 text-xs text-indigo-600 bg-white px-1" : "top-2 text-sm text-gray-500"
                  }`}
                >
                  Correo electrónico
                </label>
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="profession"
                  id="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  onFocus={() => handleFocus("profession")}
                  onBlur={() => handleBlur("profession")}
                  className={`peer h-10 w-full rounded-lg border bg-transparent px-3 py-2 outline-none transition-all ${
                    errors.profession
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-indigo-500"
                  }`}
                />
                <label
                  htmlFor="profession"
                  className={`absolute left-3 transition-all duration-200 ${
                    isActive("profession")
                      ? "-top-2.5 text-xs text-indigo-600 bg-white px-1"
                      : "top-2 text-sm text-gray-500"
                  }`}
                >
                  Profesión
                </label>
                {errors.profession && <p className="mt-1 text-xs text-red-600">{errors.profession}</p>}
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                  className="peer w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 outline-none transition-all focus:border-indigo-500"
                />
                <label
                  htmlFor="message"
                  className={`absolute left-3 transition-all duration-200 ${
                    isActive("message")
                      ? "-top-2.5 text-xs text-indigo-600 bg-white px-1"
                      : "top-2 text-sm text-gray-500"
                  }`}
                >
                  Mensaje (opcional)
                </label>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                    Acepto los términos y condiciones
                  </label>
                  {errors.acceptTerms && <p className="mt-1 text-xs text-red-600">{errors.acceptTerms}</p>}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
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
                      Enviando...
                    </>
                  ) : (
                    "Enviar postulación"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
