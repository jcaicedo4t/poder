import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const ClientSelect = dynamic(() => import("./ClientSelect"), { ssr: false });

export default async function HomeHabits() {
  noStore();

  let eventse = [];
  try {
    const eventsr = await sql`SELECT * FROM habits ORDER BY id DESC LIMIT 5`;
    eventse = eventsr.rows;
  } catch (error) {
    console.error("Error fetching calendar events:", error);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 h-[500px] ">
      {/* Encabezado fijo */}
      <h2 className="text-xl font-bold mb-6">
        Hábitos 🏆
        <Link
          href="/habits"
          style={{
            float: "right",
          }}
        >
          <Image
            src="/images/addhabits.png"
            width={35}
            className="float-right"
            height={35}
            alt="Agregar hábito"
          />
        </Link>
      </h2>

      {/* Contenedor desplazable */}
      <div className="divide-y divide-gray-200  scroll_container ">
        {eventse.map((habit) => (
          <div
            key={habit.id}
            className="py-4 flex justify-between items-center mr-1"
          >
            {/* Nombre y descripción */}
            <div>
              <h3 className="text-lg font-bold">{habit.name}</h3>
              <p className="text-gray-500">{habit.description}</p>
            </div>

            {/* Estado y selector */}
            <ClientSelect id={habit.id} currentStatus={habit.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
