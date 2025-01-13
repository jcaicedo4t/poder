import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from 'next/cache';

export default async function HomeHabits() {
  noStore();
  let eventse = [];
  eventse = [];
  try {
    const eventsr = await sql`SELECT * FROM habits`;
    eventse = eventsr.rows;
    console.log(eventsr);
  } catch (error) {
    console.error("Error fetching calendar eventse:", error);
  }

  // console.log(rows);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Hábitos 🏆</h2>

      <div className="divide-y divide-gray-200 scroll_container">
        {eventse.map((habit) => (
          <div key={habit.id} className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{habit.name}</h3>
                <p className="text-gray-500">{habit.description}</p>

              </div>
              <div>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Pendiente
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
