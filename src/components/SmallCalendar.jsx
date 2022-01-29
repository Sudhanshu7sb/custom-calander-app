import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getMonth } from "../util";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import GlobalContext from "../context/GlobalContext";

function SmallCalendar() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  function handlePrevoiusMonth() {
    setCurrentMonthIndex(currentMonthIndex - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIndex(currentMonthIndex + 1);
  }
  function getDayClass(day) {
    const format = "DD-MM-YYYY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slctDay = daySelected && daySelected.format(format);

    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (slctDay === currDay) {
      return "bg-blue-100 rounded-full text-blue-400 font-bold";
    } else {
      return "";
    }
  }

  return (
    <div className="mt-9">
      <header className="flex items-center justify-between">
        <p className="text-gray-500 hover:text-gray-600">
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            "MMMM YYYY"
          )}
        </p>

        <nav className="flex items-center">
          <button className="w-5 h-5 mx-5 flex  items-center text-gray-400  text-sm hover:text-gray-600">
            <ChevronLeftIcon onClick={handlePrevoiusMonth} />
          </button>
          <button className="w-5 h-5 flex items-center text-gray-400 text-sm hover:text-gray-600">
            <ChevronRightIcon onClick={handleNextMonth} />
          </button>
        </nav>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span className="text-sm text-center py-1 ">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, indx) => (
              <button
                key={indx}
                className={`py-1 w-full ${getDayClass(day)}`}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIndex);
                  setDaySelected(day);
                }}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SmallCalendar;
