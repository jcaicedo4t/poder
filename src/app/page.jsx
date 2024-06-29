import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-transparent-600 text-black text-center py-20">
        <Image
          className="mx-auto mb-8"
          src="/images/list1.png"
          alt="Next.js Logo"
          width={150}
          height={37}
          priority
        />
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido a su agenda de Hábitos
        </h1>
        <p className="text-xl mb-8">
          Realice un seguimiento de sus hábitos y mejore su productividad.
        </p>
        <Link href="/calendar">
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 cursor-pointer">
            Empezar
          </button>
        </Link>
      </section>

      {/* Features Section */}
    </div>
  );
}
