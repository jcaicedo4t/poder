import { sql } from "@vercel/postgres";

export default async function Task() {
  let rows = [];

  try {
    const result = await sql`SELECT * FROM tasks`; 
    rows = result.rows; 
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Tareas</h2>
      <div className="divide-y divide-gray-200">
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
