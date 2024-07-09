import { useState } from 'react';
import axios from 'axios';

export default function AddHabitModal({ showModal, setShowModal }) {
  const [habit, setHabit] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabit((prevHabit) => ({
      ...prevHabit,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/addHabit', {
        user_id: 1,  // Hardcoded for demonstration, should be dynamic
        ...habit,
        frequency: 'daily'  // Can be dynamic based on your logic
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.status === 200) {
        const newHabit = response.data;
        console.log('New habit added:', newHabit);
   // Refresh the list of habits
      } else {
        console.error('Error adding habit');
      }
    } catch (error) {
      console.error('Error making request:', error);
    }
    
    setHabit({ name: '', description: '' });
    setShowModal(false);
  };

  return (
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
                  id="name"
                  name="name"
                  value={habit.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nombre del hábito"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  id="description"
                  name="description"
                  value={habit.description}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Descripción del hábito"
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
