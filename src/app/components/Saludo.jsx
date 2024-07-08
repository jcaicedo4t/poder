"use client";
import { signIn, useSession } from "next-auth/react";
export default function Saludo() {
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
     
      <h1 className="text-3xl font-bold text-center mb-8">
          {" "}
          <div class="text-center sm:text-left mb-14">
            <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl text-left">
              Bienvenido  {" "}{session.user.name}! 👋
            </h1>
          </div>
        </h1>

 
    </>
  );
}
