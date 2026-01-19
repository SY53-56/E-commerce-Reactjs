import React from "react";
const Select = React.memo(({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-300">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 bg-gray-900 text-white
      border border-gray-700 rounded-lg cursor-pointer
      focus:ring-2 focus:ring-amber-400 transition"
    >
      <option value="">Choose Category</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </option>
      ))}
    </select>
  </div>
));

export default Select