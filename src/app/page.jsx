"use client"
import Image from "next/image"
import Link from "next/link"
import Pricing from "./components/Pricing"
import Testimonial from "./components/Testimonials"
import Teams from "./components/Teams"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

export default function Home() {
  const { data: session, status } = useSession()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
            <div className={`lg:w-1/2 transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                  ✨ Organiza tu vida de manera inteligente
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gray-900">Bienvenido a tu</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                  Agenda Personal
                </span>
              </h1>
              <p className="text-gray-600 text-xl mb-8 max-w-2xl leading-relaxed">
                Transforma tu productividad con una plataforma intuitiva que te ayuda a 
                <span className="font-semibold text-indigo-600"> organizar tu vida</span>, 
                <span className="font-semibold text-purple-600"> gestionar hábitos</span> y 
                <span className="font-semibold text-indigo-600"> alcanzar tus metas</span> de manera eficiente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href={status === "authenticated" ? "/dashboard" : "/login"}>
                  <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg">
                    <span className="flex items-center justify-center gap-2">
                      Empezar ahora
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </Link>
                <Link href="#features">
                  <button className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-200 rounded-xl font-semibold hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Conocer más
                  </button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">10K+</div>
                  <div className="text-sm text-gray-600">Usuarios activos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600">Satisfacción</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">24/7</div>
                  <div className="text-sm text-gray-600">Disponibilidad</div>
                </div>
              </div>
            </div>
            
            <div className={`lg:w-1/2 relative transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="relative">
                {/* Floating cards effect */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl transform rotate-3 opacity-50"></div>
                <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl transform rotate-1 opacity-70"></div>
                
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <Image
                      src="/images/list1.png"
                      alt="Agenda Personal"
                      width={280}
                      height={280}
                      className="mx-auto object-contain rounded-2xl mb-6 hover:scale-105 transition-transform duration-300"
                      priority
                    />
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Tareas completadas hoy</span>
                        <span className="ml-auto text-green-600 font-semibold">8/10</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Hábitos en progreso</span>
                        <span className="ml-auto text-blue-600 font-semibold">5</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Eventos esta semana</span>
                        <span className="ml-auto text-purple-600 font-semibold">12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas para ser más
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> productivo</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre las herramientas que transformarán tu manera de organizar el tiempo y alcanzar tus objetivos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gestión de Tareas</h3>
              <p className="text-gray-600 leading-relaxed">
                Organiza y prioriza tus tareas con un sistema intuitivo que te ayuda a mantener el foco en lo importante.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Calendario Inteligente</h3>
              <p className="text-gray-600 leading-relaxed">
                Planifica eventos y citas con recordatorios automáticos que se sincronizan con todos tus dispositivos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Seguimiento de Hábitos</h3>
              <p className="text-gray-600 leading-relaxed">
                Construye rutinas positivas con un sistema de seguimiento que te motiva a mantener la consistencia.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Análisis de Productividad</h3>
              <p className="text-gray-600 leading-relaxed">
                Visualiza tu progreso con reportes detallados que te ayudan a identificar patrones y mejorar continuamente.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Acceso Multiplataforma</h3>
              <p className="text-gray-600 leading-relaxed">
                Sincroniza tus datos en tiempo real entre web, móvil y escritorio para acceder desde cualquier lugar.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Recordatorios Inteligentes</h3>
              <p className="text-gray-600 leading-relaxed">
                Recibe notificaciones personalizadas que se adaptan a tu rutina y te ayudan a no olvidar nada importante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Pricing />
      <Testimonial />
      <Teams />
    </div>
  )
}
