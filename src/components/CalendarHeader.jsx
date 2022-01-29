import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  function handlePrevoiusMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="logo" className="w-12 h-12 mr-2" />
      <h1 className="text-xl text-gray-500 font-semi-bold"> Calendar</h1>
      <button
        className="border border-gray-200 py-2 px-3 rounded-md mx-10 text-gray-600 hover:bg-gray-200"
        onClick={handleReset}
      >
        Today
      </button>
      <button className="w-8 h-8 flex items-center text-gray-400 hover:bg-gray-200 rounded-full">
        <ChevronLeftIcon onClick={handlePrevoiusMonth} />
      </button>
      <button className="w-8 h-8 flex items-center text-gray-400 hover:bg-gray-200 rounded-full">
        <ChevronRightIcon onClick={handleNextMonth} />
      </button>
      <h5 className="text-xl mx-4 hover:text-gray-600">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h5>
    </header>
  );
}

export default CalendarHeader;
