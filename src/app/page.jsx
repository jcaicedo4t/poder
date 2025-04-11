"use client"
import Image from "next/image"
import Link from "next/link"
import Pricing from "./components/Pricing"
import Testimonial from "./components/Testimonials"
import Teams from "./components/Teams"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="text-black">Bienvenido a su</span>
                <br />
                <span className="text-indigo-600">Agenda Personal</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-lg">
                Organice su vida, gestione sus hábitos y tareas de manera eficiente para maximizar su productividad y
                alcanzar sus metas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={status === "authenticated" ? "/dashboard" : "/login"}>
                  <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300">
                    Empezar ahora
                  </button>
                </Link>
                <Link href="#features">
                  <button className="px-8 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition duration-300">
                    Conocer más
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
            <section className="bg-transparent-600 text-black text-center py-20  pb-[8rem]">
                <Image
                  src="/images/list1.png"
                  alt="Agenda Personal"
                  width={200}
                  height={200}
                  className="mx-auto object-contain rounded-xl"
                  priority
                />
              </section>
              <div className="absolute -top-4 -right-4 w-full h-full bg-white-200 rounded-2xl -z-10"></div>
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
