"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const people = [
  {
    name: "José Caicedo",
    role: "Fundador & Desarrollador Frontend",
    bio: "Apasionado por crear experiencias de usuario excepcionales y soluciones tecnológicas que mejoran la productividad.",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
    githubUrl: "#",
    skills: ["React", "Next.js", "UI/UX", "Tailwind CSS", "JavaScript"],
  },
  {
    name: "Ana García",
    role: "Diseñadora UX/UI",
    bio: "Especialista en diseño centrado en el usuario con experiencia en la creación de interfaces intuitivas y atractivas.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
    githubUrl: "#",
    skills: ["Figma", "Adobe XD", "Diseño de Interfaces", "Investigación de Usuarios", "Prototipado"],
  },
  {
    name: "Andres Gil",
    role: "QA & Testing",
    bio: "Experto en arquitectura de sistemas y bases de datos, con enfoque en la creación de APIs eficientes y seguras.",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
    githubUrl: "#",
    skills: ["Node.js", "PostgreSQL", "API REST", "AWS", "Seguridad"],
  },
]

export default function Teams() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <section className="relative bg-white py-24 sm:py-32" id="team">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width="200"
                height="200"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth="0"
              />
            </svg>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
          </svg>
        </div>
      </div>

      {/* Círculos decorativos */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Nuestro equipo</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Conoce a las personas detrás de la innovación
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Un grupo apasionado y dinámico dedicado a mejorar tu productividad y ayudarte a alcanzar tus metas.
          </p>
        </div>

        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {people.map((person, index) => (
            <motion.li
              key={person.name}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-white">
                  <img
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                    src={person.imageUrl || "/placeholder.svg"}
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                      <p className="text-base leading-7 text-indigo-600">{person.role}</p>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={person.twitterUrl}
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                        aria-label={`Twitter de ${person.name}`}
                      >
                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a
                        href={person.linkedinUrl}
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                        aria-label={`LinkedIn de ${person.name}`}
                      >
                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a
                        href={person.githubUrl}
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                        aria-label={`GitHub de ${person.name}`}
                      >
                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <p className="mt-2 text-base leading-7 text-gray-600">{person.bio}</p>
                </div>

                {/* Habilidades */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {person.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Tarjeta expandida con más información - visible en hover */}
                {activeIndex === index && (
                  <motion.div
                    className="absolute -bottom-4 left-0 right-0 bg-white rounded-lg shadow-xl p-6 z-10 border border-gray-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg">{person.name}</h4>
                        <p className="text-indigo-600">{person.role}</p>
                      </div>
                      <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setActiveIndex(null)}
                        aria-label="Cerrar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-3 text-gray-600">{person.bio}</p>
                    <div className="mt-4">
                      <h5 className="font-semibold text-sm text-gray-900">Especialidades:</h5>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {person.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-center space-x-4">
                        <a
                          href={person.twitterUrl}
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                          aria-label="Twitter"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a
                          href={person.linkedinUrl}
                          className="text-gray-400 hover:text-blue-700 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                        <a
                          href={person.githubUrl}
                          className="text-gray-400 hover:text-gray-900 transition-colors"
                          aria-label="GitHub"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Sección de unirse al equipo */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900">¿Quieres unirte a nuestro equipo?</h3>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos buscando personas talentosas y apasionadas para ayudarnos a construir el futuro de la productividad
            personal.
          </p>
          <a
            href="#careers"
            className="mt-8 inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ver posiciones abiertas
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
