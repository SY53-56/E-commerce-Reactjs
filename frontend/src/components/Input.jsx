

import React from 'react'


const Input = React.memo(({ label, name, value, multiple, className, onChange, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-300">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value} 
    multiple={multiple}
      onChange={onChange}
      className={`w-full px-4 py-2 bg-gray-900 text-white
      border border-gray-700 rounded-lg outline-none
      focus:ring-2 focus:ring-amber-400 transition ${className}`}
    />
  </div>
));
export default Input
