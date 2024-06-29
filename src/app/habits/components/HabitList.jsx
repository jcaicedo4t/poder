import React from 'react';

export default function HabitList({ habits }) {
  return (

     <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg">
      <div className="md:flex">
        <div className="p-8 w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Hábitos</h2>
          <ul>
            {habits.map((habit, index) => (
              <li key={index} className="border-b last:border-none pb-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{habit}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
