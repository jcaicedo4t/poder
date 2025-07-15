"use client"
import { useState } from "react"
import Link from "next/link"
import { Dialog, DialogPanel } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useSession, signOut } from "next-auth/react"
import Logo from "./Logo"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const authenticatedNavigation = [
    { name: "Calendario", href: "/calendar", icon: "📅" },
    { name: "Hábitos", href: "/habits", icon: "⚡" },
    { name: "Tareas", href: "/task", icon: "✅" },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href={status === "authenticated" ? "/dashboard" : "/"} className="flex items-center group">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <Logo size="default" />
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-2">
          <Link
            href={status === "authenticated" ? "/dashboard" : "/"}
            className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-all duration-300 rounded-lg hover:bg-indigo-50 group"
          >
            <span className="flex items-center gap-2">
              🏠 Inicio
            </span>
            <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
          </Link>
          {status === "authenticated" &&
            authenticatedNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-all duration-300 rounded-lg hover:bg-indigo-50 group"
              >
                <span className="flex items-center gap-2">
                  {item.icon} {item.name}
                </span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
              </Link>
            ))}
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {status === "authenticated" ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <div className="relative">
                <img
                  src={session.user.image || "/placeholder.svg?height=32&width=32"}
                  alt="Foto de perfil"
                  className="h-9 w-9 rounded-full ring-2 ring-indigo-200 transition-transform hover:scale-105"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">{session.user.name}</span>
                <span className="text-xs text-gray-500">En línea</span>
              </div>
            </div>
            <button
              className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              onClick={async () => {
                await signOut({ callbackUrl: "/" })
              }}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar sesión
              </span>
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/login"
              className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Iniciar sesión
              </span>
            </Link>
          </div>
        )}
      </nav>

      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white/95 backdrop-blur-md px-6 py-6 sm:max-w-sm border-l border-gray-200/50 shadow-2xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 group">
              <div className="transition-transform duration-300 group-hover:scale-105">
                <Logo size="small" />
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-xl p-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar menú</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-8 flow-root">
            <div className="-my-6 divide-y divide-gray-200/50">
              <div className="space-y-3 py-6">
                <Link
                  href="/"
                  className="group -mx-3 flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-lg">🏠</span>
                  Inicio
                </Link>
                {status === "authenticated" &&
                  authenticatedNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group -mx-3 flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
              </div>
              <div className="py-6">
                {status === "authenticated" ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                      <div className="relative">
                        <img
                          src={session.user.image || "/placeholder.svg?height=32&width=32"}
                          alt="Foto de perfil"
                          className="h-10 w-10 rounded-full ring-2 ring-indigo-200"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{session.user.name}</span>
                        <span className="text-xs text-gray-500">En línea</span>
                      </div>
                    </div>
                    <button
                      className="group w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 px-4 py-3 text-base font-semibold text-white shadow-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                      onClick={async () => {
                        await signOut({ callbackUrl: "/" })
                      }}
                    >
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="group w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-base font-semibold text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
