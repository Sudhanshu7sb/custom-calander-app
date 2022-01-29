import {
  XIcon,
  TrashIcon,
  ClockIcon,
  BookmarkIcon,
  CheckIcon,
} from "@heroicons/react/outline";
import { MenuAlt3Icon } from "@heroicons/react/solid";
import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

function EventModal() {
  const { setShowEventModal, daySelected, dispatchedEvents, selectedEvent } =
    useContext(GlobalContext);
  console.log(selectedEvent, "slctevnt");
  console.log(dispatchedEvents, "de");

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  console.log(title, "title");

  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvents = {
      id: selectedEvent ? selectedEvent.id : Date.now(),
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
    };

    if (selectedEvent) {
      dispatchedEvents({ type: "update", payload: calendarEvents });
    } else {
      dispatchedEvents({ type: "push", payload: calendarEvents });
    }

    setShowEventModal(false);
  }

  return (
    <div className="h-screen w-full  bg-gray-600 bg-opacity-80 left-0 top-0 fixed flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-lg w-1/4 ">
        <header className="flex gap-x-5 py-2 items-center justify-end bg-gray-300 pr-3">
          <button>
            {selectedEvent && (
              <TrashIcon
                className="w-5 h-5 cursor-pointer"
                onClick={() => {
                  dispatchedEvents({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
              />
            )}
          </button>

          <XIcon
            className="w-5 h-5 cursor-pointer text-red-500"
            onClick={() => setShowEventModal(false)}
          />
        </header>

        <div className="p-3">
          <div className="grid grid-cols-5">
            <input
              placeholder="Add Event"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              required
              className="col-start-2 col-span-5 pt-3 border-0  w-full text-gray-600 text-xl font-semibold pb-2  border-b-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <p className="flex items-center mt-4">
            <span className="w-5 h-5 font-thin mr-4">
              <ClockIcon className="h-5 w-5" />
            </span>
            {daySelected?.format("dddd, MMMM DD")}
          </p>
          <p className="flex items-center mt-4">
            <span className="w-5 h-5 font-thin mr-4">
              <MenuAlt3Icon className="h-5 w-5" />
            </span>
            <input
              placeholder="Add Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="col-start-2 col-span-5 pt-3 border-0  w-full text-gray-600 pb-2  border-b-2 focus:outline-none focus:border-blue-500"
            />
          </p>
          <div className="flex items-center mt-4">
            <span className="w-5 h-5 font-thin mr-4">
              <BookmarkIcon className="h-5 w-5" />
            </span>
            <div className="flex gap-x-2 items-center">
              {labelsClasses.map((label, i) => (
                <span
                  type="checkbox"
                  key={i}
                  onClick={() => setSelectedLabel(label)}
                  className="w-5 h-5 border font-thin flex justify-around items-center rounded-full"
                >
                  <CheckIcon
                    className={`h-5 w-5  bg-${label}-500 rounded-full font-extralight text-white cursor-pointer   `}
                  />
                </span>
              ))}
              <span className={`text-${selectedLabel}-500`}>
                {selectedLabel ? selectedLabel : ""}
              </span>
            </div>
          </div>
        </div>

        <footer className="flex justify-end py-3 px-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="border bg-blue-500 text-white py-1 px-3 rounded-md"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}

export default EventModal;
