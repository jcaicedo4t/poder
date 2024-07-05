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
      <HabitList habits={habits} setShowModal={setShowModal}/>
    
      <AddHabitModal
        showModal={showModal}
        setShowModal={setShowModal}
        addHabit={addHabit}
      />

    
    </>
  );
}
