import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <div className="mt-7">
      <p className="text-gray-500 font-semibold m-2">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className={`flex items-center gap-x-2 w-2/5 m-1 p-1`}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className="text-sm text-gray-700 capitalize">{lbl}</span>
        </label>
      ))}
    </div>
  );
}

export default Labels;
