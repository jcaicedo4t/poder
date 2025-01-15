
import Calendar from "../calendar/HomeCalendar";
import CalendarEvents from "../calendar/CalendarEvent";

export default function Example() {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 mb-5">
        Próximos eventos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <CalendarEvents />
        <div className="grid grid-cols-1 ">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
