import { sql } from "@vercel/postgres";
import Image from "next/image";
import Link from "next/link";
export default async function Task() {
  let rows = [];

  try {
    const result = await sql`SELECT * FROM tasks  ORDER BY id DESC LIMIT 3`;
    rows = result.rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 h-[500px]">
      <h2 className="text-xl font-bold mb-6">
        Tareas 📕
        <Link
          href="/task"
          style={{
            float: "right",
          }}
        >
          <Image
            src="/images/addtask.png"
            width={35}
            className="float-right"
            height={35}
            alt="Agregar hábito"
          />
        </Link>
      </h2>
      <div className="divide-y divide-gray-200 ">
        {rows.map((task) => (
          <div key={task.id} className="py-4">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p className="text-gray-500">{task.description}</p>
            {task.is_completed ? (
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Completada
              </span>
            ) : (
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                Pendiente
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
