
"use client"
import Image from "next/image";

import Link from "next/link";
import Contend from "./habits/components/Contend";
import Pricing from "./components/Pricing";
import Testimonial from "./components/Testimonials"
import Teams from "./components/Teams"
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-transparent-600 text-black text-center py-20  pb-[15rem]">
        <Image
          className="mx-auto mb-8"
          src="/images/list1.png"
          alt="Next.js Logo"
          width={150}
          height={37}
          priority
        />
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido a su agenda
        </h1>
        <p className="text-xl mb-8">
        Gestione sus hábitos y tareas de manera eficiente para maximizar su productividad.
        </p>
        <Link href={status === "authenticated" ? "/calendar" : "/login"}>
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 cursor-pointer">
            Empezar
          </button>
        </Link>
      </section>
     <Pricing/>
     <Testimonial/>
     <Teams/>
      {/* <Contend/> */}

      {/* Features Section */}
    </div>
  );
}
