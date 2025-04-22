"use client"

export default function LogoAlternatives() {
  const logos = [
    {
      id: "calendar",
      name: "Calendario con Marca de Verificación",
      description: "Representa organización y cumplimiento de tareas",
      render: (width, height) => (
        <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      ),
    },
    {
      id: "clock",
      name: "Reloj con Hojas",
      description: "Simboliza gestión del tiempo y crecimiento",
      render: (width, height) => (
        <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Círculo del reloj */}
          <circle cx="20" cy="20" r="16" fill="#4F46E5" />
          <circle cx="20" cy="20" r="14" fill="white" />

          {/* Marcadores de horas */}
          <rect x="19" y="8" width="2" height="3" rx="1" fill="#4F46E5" />
          <rect x="19" y="29" width="2" height="3" rx="1" fill="#4F46E5" />
          <rect x="29" y="19" width="3" height="2" rx="1" fill="#4F46E5" />
          <rect x="8" y="19" width="3" height="2" rx="1" fill="#4F46E5" />

          {/* Manecillas */}
          <rect x="19.5" y="14" width="1" height="8" rx="0.5" fill="#4F46E5" />
          <rect x="19.5" y="19.5" width="1" height="7" rx="0.5" transform="rotate(-45 19.5 19.5)" fill="#4F46E5" />

          {/* Hojas/brotes */}
          <path d="M30 12C28 10 26 12 26 12C26 12 28 14 30 12Z" fill="#10B981" />
          <path d="M32 15C30 13 28 15 28 15C28 15 30 17 32 15Z" fill="#10B981" />
          <circle cx="30" cy="13.5" r="1" fill="#10B981" />
        </svg>
      ),
    },
    {
      id: "compass",
      name: "Brújula Moderna",
      description: "Representa dirección y orientación hacia metas",
      render: (width, height) => (
        <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Círculo exterior */}
          <circle cx="20" cy="20" r="16" fill="#4F46E5" />
          <circle cx="20" cy="20" r="14" fill="white" />

          {/* Marcadores de dirección */}
          <path d="M20 6L22 10H18L20 6Z" fill="#4F46E5" />
          <path d="M34 20L30 22V18L34 20Z" fill="#4F46E5" />
          <path d="M20 34L18 30H22L20 34Z" fill="#4F46E5" />
          <path d="M6 20L10 18V22L6 20Z" fill="#4F46E5" />

          {/* Aguja de la brújula */}
          <path d="M20 20L26 14L16 26L20 20Z" fill="#F59E0B" />
          <path d="M20 20L14 26L24 14L20 20Z" fill="#4F46E5" />

          {/* Centro */}
          <circle cx="20" cy="20" r="2" fill="white" />
          <circle cx="20" cy="20" r="1" fill="#4F46E5" />
        </svg>
      ),
    },
    {
      id: "letter-a",
      name: "Letra A Estilizada",
      description: "Representa la identidad de marca 'Agenda'",
      render: (width, height) => (
        <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fondo */}
          <rect x="4" y="4" width="32" height="32" rx="16" fill="#4F46E5" />

          {/* Letra A */}
          <path d="M20 8L28 32H24L22 26H14L12 32H8L16 8H20Z" fill="white" />

          {/* Líneas de lista */}
          <rect x="16" y="20" width="8" height="2" rx="1" fill="#4F46E5" />

          {/* Marca de verificación */}
          <path d="M14 18L16 20L19 17" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "progress",
      name: "Círculo de Progreso",
      description: "Representa progreso y ciclos continuos",
      render: (width, height) => (
        <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Círculo base */}
          <circle cx="20" cy="20" r="16" fill="#4F46E5" />

          {/* Segmento de progreso */}
          <path d="M20 4A16 16 0 0 1 36 20L20 20L20 4Z" fill="#F59E0B" />

          {/* Círculo central */}
          <circle cx="20" cy="20" r="12" fill="white" />

          {/* Marcas de progreso */}
          <rect x="19" y="12" width="2" height="8" rx="1" fill="#4F46E5" />
          <rect x="19" y="19" width="8" height="2" rx="1" fill="#4F46E5" />

          {/* Punto central */}
          <circle cx="20" cy="20" r="2" fill="#4F46E5" />
        </svg>
      ),
    },
  ]

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Opciones de Logo</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Elige el logo perfecto para tu aplicación
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Cada diseño representa diferentes aspectos de productividad, organización y desarrollo personal.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex flex-col bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex-shrink-0 bg-indigo-50 p-6 flex items-center justify-center">
                {logo.render(100, 100)}
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{logo.name}</h3>
                  <p className="mt-3 text-base text-gray-500">{logo.description}</p>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Seleccionar este logo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
