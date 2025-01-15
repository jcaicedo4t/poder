"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname(); // Obtiene la ruta actual

  useEffect(() => {
    // Inicia la animación de salida cuando cambia la ruta
    setIsTransitioning(true);

    const timeout = setTimeout(() => {
      // Finaliza la animación de salida después de 300ms
      setIsTransitioning(false);
    }, 0); // Duración de la transición

    return () => clearTimeout(timeout); // Limpia el temporizador
  }, [pathname]);

  return (
    <div
      className={`page-transition ${
        isTransitioning ? "fade-out" : "fade-in"
      }`}
    >
      {children}
    </div>
  );
}
