import React from "react";

const activities = [
  { id: 1, title: "Reunión it", time: "10:00 AM" },
  { id: 2, title: "Almuerzo", time: "12:00 PM" },
  { id: 3, title: "Mantenimiento de moto", time: "6:00 PM" },
];

export default function ActivityList() {
  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl">
      <div className="md:flex">
        <div className="p-8 w-full">
          <h2 className="text-2xl font-bold text-center mb-4">
            Actividades de hoy
          </h2>
          <ul className="mt-8">
            {activities.map((activity) => (
              <li
                key={activity.id}
                className="border-b last:border-none pb-4 mb-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    {activity.title}
                  </span>
                  <span className="text-gray-500">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
