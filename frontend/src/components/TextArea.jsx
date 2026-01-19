  
   import React from "react";
const TextArea = React.memo(({ label, name, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-300">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="w-full px-4 py-2 bg-gray-900 text-white
      border border-gray-700 rounded-lg outline-none
      focus:ring-2 focus:ring-amber-400 resize-none transition"
    />
  </div>
));
export default TextArea