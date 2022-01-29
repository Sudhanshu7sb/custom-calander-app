import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

function Day({ day, rowIndex }) {
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filteredEvents?.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    // console.log(events);
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border border-gray-200 flex flex-col flex-wrap">
      <header className="flex flex-col items-center">
        {rowIndex === 0 && (
          <p className="text-sm p-1 my-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {/* {console.log(dayEvents, savedEvents)} */}
        {dayEvents?.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 text-gray-600 text-sm rounded mx-2 text-center`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Day;
