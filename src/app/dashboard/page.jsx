import Saludo from "../components/Saludo";
import HomeCalendar from "../calendar/HomeCalendar";
import HomeHabits from "../habits/HomeHabits";
import HomeTask from "../task/HomeTask";
export default function Dashboard() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          <div className="text-center sm:text-left mb-14">
            <Saludo />
          </div>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <HomeCalendar />
          <HomeHabits /> 
          <HomeTask />
        </div>
      </div>
    </>
  );
}
