"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/outline"

export default function ClientSelect({ id, currentStatus }) {
  const [status, setStatus] = useState(currentStatus || "pendiente")
  const [showEmoji, setShowEmoji] = useState(null)
  const emojiRef = useRef(null)
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
  const [animateNow, setAnimateNow] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  const updateTargetPosition = useCallback(() => {
    if (emojiRef.current) {
      const rect = emojiRef.current.getBoundingClientRect()
      setTargetPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      updateTargetPosition()
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", updateTargetPosition)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", updateTargetPosition)
    }
  }, [updateTargetPosition])

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus)
    updateTargetPosition()

    // Primero actualizamos la posición
    setTimeout(() => {
      setShowEmoji(newStatus)

      // Luego iniciamos la animación
      setTimeout(() => {
        setAnimateNow(true)

        // Finalmente ocultamos
        setTimeout(() => {
          setShowEmoji(null)
          setAnimateNow(false)
        }, 2000)
      }, 500)
    }, 100)

    try {
      const response = await fetch("/api/update-habit-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (!response.ok) {
        console.error("Error al actualizar el estado")
      }
    } catch (error) {
      console.error("Error en la solicitud:", error)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "finalizada":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case "en curso":
        return <ClockIcon className="h-5 w-5 text-amber-500" />
      default:
        return <XCircleIcon className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusEmoji = (status) => {
    switch (status) {
      case "pendiente":
        return "😞"
      case "en curso":
        return "😊"
      case "finalizada":
        return "🏆"
      default:
        return "😞"
    }
  }

  return (
    <div className="flex items-center gap-2 relative">
      <span ref={emojiRef} className="text-2xl">
        {getStatusEmoji(status)}
      </span>

      <div className="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => handleStatusChange("pendiente")}
          className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-l-md ${
            status === "pendiente" ? "bg-gray-100 text-gray-700" : "bg-white text-gray-500 hover:bg-gray-50"
          } border border-gray-200`}
        >
          <XCircleIcon className="h-4 w-4 mr-1" />
          <span className="sr-only sm:not-sr-only sm:ml-1">Pendiente</span>
        </button>
        <button
          type="button"
          onClick={() => handleStatusChange("en curso")}
          className={`relative inline-flex items-center px-3 py-2 text-sm font-medium ${
            status === "en curso" ? "bg-amber-100 text-amber-700" : "bg-white text-gray-500 hover:bg-gray-50"
          } border-t border-b border-gray-200`}
        >
          <ClockIcon className="h-4 w-4 mr-1" />
          <span className="sr-only sm:not-sr-only sm:ml-1">En curso</span>
        </button>
        <button
          type="button"
          onClick={() => handleStatusChange("finalizada")}
          className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-r-md ${
            status === "finalizada" ? "bg-green-100 text-green-700" : "bg-white text-gray-500 hover:bg-gray-50"
          } border border-gray-200`}
        >
          <CheckCircleIcon className="h-4 w-4 mr-1" />
          <span className="sr-only sm:not-sr-only sm:ml-1">Completado</span>
        </button>
      </div>

      <AnimatePresence>
        {showEmoji && (
          <motion.div
            key={showEmoji}
            className="fixed text-6xl md:text-7xl pointer-events-none"
            initial={{
              x: windowSize.width / 2,
              y: windowSize.height / 2,
              scale: 2,
              opacity: 1,
            }}
            animate={
              animateNow
                ? {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    scale: 0.3,
                    opacity: 0,
                    transition: {
                      duration: 1,
                      ease: "easeInOut",
                    },
                  }
                : {
                    x: windowSize.width / 2,
                    y: windowSize.height / 2,
                    scale: 2,
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  }
            }
            style={{
              position: "fixed",
              top: -50, // Ajuste para centrar mejor el emoji
              left: -25, // Ajuste para centrar mejor el emoji
              zIndex: 50,
              transform: "translate(-50%, -50%)",
            }}
          >
            {getStatusEmoji(showEmoji)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
