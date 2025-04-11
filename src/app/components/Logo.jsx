"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function Logo({ size = "default" }) {
  const router = useRouter()
  const { status } = useSession()

  // Determinar tamaños basados en el prop size
  const dimensions = {
    small: { width: 30, height: 30, textSize: "text-lg" },
    default: { width: 40, height: 40, textSize: "text-xl" },
    large: { width: 50, height: 50, textSize: "text-2xl" },
  }

  const { width, height, textSize } = dimensions[size] || dimensions.default

  const handleClick = () => {
    if (status === "authenticated") {
      router.push("/dashboard")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex items-center cursor-pointer" onClick={handleClick}>
      <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
        {/* Opción 1: Calendario con Marca de Verificación */}
        <svg
          width={width}
          height={height}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          {/* Base del calendario */}
          <rect x="4" y="8" width="32" height="28" rx="3" fill="#4F46E5" />
          <rect x="6" y="16" width="28" height="18" rx="2" fill="white" />

          {/* Parte superior del calendario */}
          <rect x="8" y="4" width="4" height="8" rx="1" fill="#4F46E5" />
          <rect x="28" y="4" width="4" height="8" rx="1" fill="#4F46E5" />

          {/* Líneas de días */}
          <rect x="10" y="20" width="4" height="4" rx="1" fill="#E0E7FF" />
          <rect x="18" y="20" width="4" height="4" rx="1" fill="#E0E7FF" />
          <rect x="26" y="20" width="4" height="4" rx="1" fill="#E0E7FF" />

          <rect x="10" y="26" width="4" height="4" rx="1" fill="#E0E7FF" />
          <rect x="18" y="26" width="4" height="4" rx="1" fill="#E0E7FF" />
          <rect x="26" y="26" width="4" height="4" rx="1" fill="#10B981" />

          {/* Marca de verificación */}
          <path
            d="M27 26.5L28 27.5L29.5 26"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className={`ml-2 font-bold ${textSize} text-gray-900`}>Agenda</span>
    </div>
  )
}
