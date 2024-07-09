import { sql } from "@vercel/postgres";

export default async function Calendar() {
  let events = [];

  try {
    const eventsr = await sql`SELECT * FROM calendarevents`; 
    events = eventsr.rows; 
    // console.log(events); 
  } catch (error) {
    console.error("Error fetching calendar events:", error);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Calendario 📅</h2>
      <div className="divide-y divide-gray-200">
      {events.map((event) => (
          <div key={event.id} className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="text-gray-500">{event.description}</p>
                <p className="text-gray-500">
                  {formatDate(event.start_time)} - {formatDate(event.end_time)}
                </p>
              </div>
              <div>
                {event.is_completed ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completada
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Pendiente
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
}
