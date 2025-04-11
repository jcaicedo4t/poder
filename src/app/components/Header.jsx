"use client";
import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Logo from "./Logo"; // Asegúrate de importar tu componentes de log

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const authenticatedNavigation = [
    { name: "Calendario", href: "/calendar" },
    { name: "Habitos", href: "/habits" },
    { name: "Tareas", href: "/task" },
  ];

  return (
    <header
      className="bg-white"
      style={{
        height: "100px",
      }}
    >
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href={status === "authenticated" ? "/dashboard" : "/"}>
            <span className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Logo size="small" />
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link  href={status === "authenticated" ? "/dashboard" : "/"}>
            <span className="text-sm font-semibold leading-6 text-gray-900">
              Inicio
            </span>
          </Link>
          {status === "authenticated" && authenticatedNavigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
        {status === "authenticated" ? (
          <>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
              <img
                src={session.user.image}
                alt="Foto de perfil"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-sm font-semibold leading-6 text-gray-900">
                {session.user.name}
              </span>
              <button
                className="ml-3 flex items-center"
                onClick={async () => {
                  await signOut({ callbackUrl: "/" });
                }}
              >
         <Image
                     src="/images/logout.png"
                     width={25}
                     className="float-right"
                     height={25}
                     alt="Agregar hábito"
                   />
              </button>
            </div>
          </>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/login">
              <span className="text-sm font-semibold leading-6 text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </div>
        )}
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="/images/logo.png"
                  alt=""
                />
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="grid py-6">
                <Link href="/">
                  <span className="text-base font-semibold leading-7 text-gray-900">
                    Inicio
                  </span>
                </Link>
                {status === "authenticated" && authenticatedNavigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span className="text-base font-semibold leading-7 text-gray-900">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {status === "authenticated" ? (
                  <button
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={async () => {
                      await signOut({ callbackUrl: "/" });
                    }}
                  >
                    Sign out
                  </button>
                ) : (
                  <Link href="/login">
                    <span className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Log in
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
