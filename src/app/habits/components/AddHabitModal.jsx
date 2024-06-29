import { useState } from 'react';

export default function AddHabitModal({ showModal, setShowModal, addHabit }) {
  const [habit, setHabit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabit(habit);
    setHabit('');
    setShowModal(false);
  };

  return  (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-black hover:text-black mr-2"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          <h2 className="text-1xl font-bold text-center mb-4">Nuevo Hábito</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                
                <input
                  type="text"
                  id="habit"
                  value={habit}
                  onChange={(e) => setHabit(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-end">
             
                <button
                  type="submit"
                  className="ml-3 shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 cursor-pointer"
                  >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
