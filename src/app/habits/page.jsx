"use client";
import { useState } from "react";
import HabitList from "./components/HabitList";
import AddHabitModal from "./components/AddHabitModal";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  return (
    <>
      <HabitList habits={habits} />
      <button
        onClick={() => setShowModal(true)}
        className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 cursor-pointer"
      >
  +
      </button>
      <AddHabitModal
        showModal={showModal}
        setShowModal={setShowModal}
        addHabit={addHabit}
      />

    
    </>
  );
}
