"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Calendar from "./HomeCalendar"
import CalendarEvents from "./CalendarEvent"
import EventDetails from "./components/EventDetails"
import { PlusIcon, ViewColumnsIcon, CalendarIcon } from "@heroicons/react/24/outline"

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [view, setView] = useState("calendar") // "calendar" o "list"
  const [reload, setReload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateEvent = () => {
    setReload(true)
    setIsLoading(true)
  }

  const handleReloaded = () => {
    setReload(false)
    setIsLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Mi Calendario</h1>

        <div className="flex items-center space-x-4">
          {/* Selector de vista */}
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setView("calendar")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                view === "calendar" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <CalendarIcon className="h-5 w-5 inline-block mr-1" />
              <span className="hidden sm:inline">Calendario</span>
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                view === "list" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <ViewColumnsIcon className="h-5 w-5 inline-block mr-1" />
              <span className="hidden sm:inline">Lista</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendario principal - ahora ocupa todo el ancho siempre */}
        <div className="lg:col-span-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {view === "calendar" ? (
              <div className="p-4">
                <CalendarEvents onCreateEvent={handleCreateEvent} onSelectEvent={setSelectedEvent} />
              </div>
            ) : (
              <div className="p-4">
                <Calendar reload={reload} onReloaded={handleReloaded} onSelectEvent={setSelectedEvent} />
              </div>
            )}
          </div>
        </div>

        {/* Lista de próximos eventos */}
        <div className="lg:col-span-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Próximos eventos</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById("add-event-button").click()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Nuevo Evento
                </motion.button>
              </div>
              <Calendar
                reload={reload}
                onReloaded={handleReloaded}
                onSelectEvent={setSelectedEvent}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Panel de detalles del evento como overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
              onClick={() => setSelectedEvent(null)}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md z-50 relative"
            >
              <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
