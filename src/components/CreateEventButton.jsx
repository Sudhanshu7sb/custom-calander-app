import React, { useContext } from "react";
import plus from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";

function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      className="border py-3 px-3 shadow-md hover:shadow-xl rounded-full flex items-center"
      onClick={() => setShowEventModal(true)}
    >
      <img src={plus} alt="add event" className="w-7 h-7" />
      <span className="mx-1  px-2">Create</span>
    </button>
  );
}

export default CreateEventButton;
