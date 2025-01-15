
import Calendar from "../calendar/HomeCalendar";
import CalendarEvents from "../calendar/CalendarEvent";

export default function Example() {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 mb-5">
        Próximos eventos
      </h2>
      <div className="lg:grid">
        <CalendarEvents />
        <div className="mr-24 w-[40rem]">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
