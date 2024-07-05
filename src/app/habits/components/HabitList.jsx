export default function HabitList({ habits, setShowModal }) {
  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg">
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="flex justify-between items-center mb-4">
            {/* Añadido para centrar el título */}
            <h2 className="text-2xl font-bold text-center w-full">Hábitos</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-transparent border border-gray-300 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center transform transition duration-400 hover:scale-105"
            >
              +
            </button>
          </div>
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
