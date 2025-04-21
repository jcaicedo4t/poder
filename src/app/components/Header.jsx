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
    { name: "Calendario", href: "/calendar" },
    { name: "Habitos", href: "/habits" },
    { name: "Tareas", href: "/task" },
  ]

  return (
    <header className="bg-white ">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href={status === "authenticated" ? "/dashboard" : "/"} className="flex items-center">
            <Logo size="default" />
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          <Link
            href={status === "authenticated" ? "/dashboard" : "/"}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors"
          >
            Inicio
          </Link>
          {status === "authenticated" &&
            authenticatedNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {status === "authenticated" ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src={session.user.image || "/placeholder.svg?height=32&width=32"}
                alt="Foto de perfil"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-semibold text-gray-900">{session.user.name}</span>
            </div>
            <button
              className="ml-4 inline-flex items-center justify-center rounded-md bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
              onClick={async () => {
                await signOut({ callbackUrl: "/" })
              }}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              Iniciar sesión
            </Link>
          </div>
        )}
      </nav>

      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <Logo size="small" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar menú</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Inicio
                </Link>
                {status === "authenticated" &&
                  authenticatedNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
              <div className="py-6">
                {status === "authenticated" ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-3">
                      <img
                        src={session.user.image || "/placeholder.svg?height=32&width=32"}
                        alt="Foto de perfil"
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="text-sm font-semibold text-gray-900">{session.user.name}</span>
                    </div>
                    <button
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={async () => {
                        await signOut({ callbackUrl: "/" })
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
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
