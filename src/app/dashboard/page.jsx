"use client";
import { signIn, useSession } from "next-auth/react";
export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // Mientras se carga la sesión
    return <div>Cargando...</div>;
  }

  if (!session) {
    // Si no hay sesión, redirige o muestra un mensaje de error
    return <div>No se ha iniciado sesión.</div>;
  }

  // Cuando haya sesión y esté cargada correctamente
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
          {" "}
          <div class="text-center sm:text-left mb-14">
            <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
              Bienvenido  {" "}{session.user.name}! 👋
            </h1>
          </div>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Calendario</h2>
            <p className="text-gray-700">
              Aquí puedes ver tus eventos y tareas programadas.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Hábitos</h2>
            <p className="text-gray-700">
              Seguimiento de tus hábitos diarios, semanales o mensuales.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Tareas</h2>
          <p className="text-gray-700">
            Lista de tareas pendientes y completadas.
          </p>
        </div>
      </div>
    </>
  );
}
