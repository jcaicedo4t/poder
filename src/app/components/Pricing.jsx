"use client"

import { CheckIcon } from "@heroicons/react/20/solid"
import { useState } from "react"

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState("monthly")

  const tiers = [
    {
      name: "Básico",
      id: "tier-basic",
      href: "#",
      priceMonthly: "Gratis",
      priceYearly: "Gratis",
      description: "Todo lo que necesitas para comenzar a organizar tu vida y mejorar tus hábitos diarios.",
      features: [
        "Seguimiento de hábitos",
        "Gestión de tareas",
        "Recordatorios diarios",
        "Vista de calendario mensual",
        "Estadísticas básicas",
      ],
      featured: false,
      mostPopular: false,
      color: "indigo",
    },
    {
      name: "Pro",
      id: "tier-pro",
      href: "#",
      priceMonthly: "$9.99",
      priceYearly: "$99.99",
      description: "Funcionalidades avanzadas para maximizar tu productividad y alcanzar todas tus metas.",
      features: [
        "Todas las funciones del plan Básico",
        "Sincronización con Google Calendar",
        "Estadísticas avanzadas",
        "Temas personalizados",
        "Exportación de datos",
        "Prioridad en soporte",
        "Sin anuncios",
      ],
      featured: true,
      mostPopular: true,
      color: "indigo",
    },
    {
      name: "Empresas",
      id: "tier-enterprise",
      href: "#",
      priceMonthly: "$19.99",
      priceYearly: "$199.99",
      description: "Solución completa para equipos y empresas que buscan mejorar la productividad colectiva.",
      features: [
        "Todas las funciones del plan Pro",
        "Gestión de equipos",
        "Asignación de tareas",
        "Tableros compartidos",
        "Reportes avanzados",
        "Integración con herramientas empresariales",
        "Soporte prioritario 24/7",
      ],
      featured: false,
      mostPopular: false,
      color: "indigo",
    },
  ]

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 mt-18" id="pricing">
      {/* Elementos decorativos de fondo */}
    
      {/* Círculos decorativos */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Planes</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">El plan perfecto para ti</p>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Selecciona el plan que mejor se adapte a tus necesidades y mejora tu productividad con nuestras
            herramientas.
          </p>
        </div>

        {/* Selector de período de facturación */}
        <div className="mt-16 flex justify-center">
          <div className="relative flex rounded-full bg-gray-100 p-1">
            <button
              type="button"
              className={`${
                billingPeriod === "monthly"
                  ? "bg-indigo-600 text-white"
                  : "bg-transparent text-gray-700 hover:text-gray-900"
              } relative w-32 rounded-full py-2 text-sm font-medium transition-colors duration-200 focus:outline-none`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Mensual
            </button>
            <button
              type="button"
              className={`${
                billingPeriod === "yearly"
                  ? "bg-indigo-600 text-white"
                  : "bg-transparent text-gray-700 hover:text-gray-900"
              } relative w-32 rounded-full py-2 text-sm font-medium transition-colors duration-200 focus:outline-none`}
              onClick={() => setBillingPeriod("yearly")}
            >
              Anual
              <span className="absolute -top-2 -right-12 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                Ahorra 20%
              </span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-3xl ${
                tier.mostPopular
                  ? "ring-2 ring-indigo-600 bg-white shadow-xl"
                  : "ring-1 ring-gray-200 bg-white/60 shadow-lg"
              } p-8 xl:p-10 relative overflow-hidden`}
            >
              {tier.mostPopular && (
                <div 
                style={{
                  marginTop: '-0.1rem',
                }}
                className="absolute top-0 right-0 -mr-2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rotate-12 shadow-md">
                  Popular
                </div>
              )}

              <div className="flex items-center justify-between gap-x-4">
                <h3
                  className={`text-xl font-bold tracking-tight ${tier.mostPopular ? "text-indigo-600" : "text-gray-900"}`}
                >
                  {tier.name}
                </h3>
              </div>

              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {billingPeriod === "monthly" ? tier.priceMonthly : tier.priceYearly}
                </span>
                {tier.priceMonthly !== "Gratis" && (
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /{billingPeriod === "monthly" ? "mes" : "año"}
                  </span>
                )}
              </p>

              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>

              <div className="mt-8 flex-1">
                <div className="flex items-center gap-x-3">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">Incluye</h4>
                  <div className="h-px flex-auto bg-gray-100"></div>
                </div>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className={`h-6 w-5 flex-none text-${tier.color}-600`} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={tier.href}
                className={`mt-8 block rounded-md px-3.5 py-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.mostPopular
                    ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    : "bg-white text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300"
                }`}
              >
                {tier.mostPopular ? "Comenzar ahora" : "Seleccionar plan"}
              </a>
            </div>
          ))}
        </div>

        {/* Garantía de devolución */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-indigo-600 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Garantía de devolución de 30 días sin preguntas
          </p>
        </div>
      </div>
    </div>
  )
}
