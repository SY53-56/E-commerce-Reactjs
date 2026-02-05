import React, { useState } from "react";

export default function DiscountCard() {
  const [rotate, setRotate] = useState(0);

  const spinWheel = () => {
    const randomDeg = Math.floor(Math.random() * 360) + 720; // 2+ rounds
    setRotate(prev => prev + randomDeg);
  };

  return (
    <div className="flex flex-col items-center gap-6 my-14">
      
      {/* Pointer */}
      <div className="w-0 h-0 
        border-l-[10px] border-r-[10px] border-b-[18px]
        border-l-transparent border-r-transparent border-b-red-500">
      </div>

      {/* Wheel */}
      <div
        className="relative w-80 h-80 rounded-full  border-4 border-white  shadow-xl transition-transform duration-[3000ms] ease-out"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-800  rounded-full z-10 "></div>
        </div>

        {/* Labels */}
        <div className="absolute  top-6 left-1/2 -translate-x-1/2 font-bold bg-green-400 text-green-600">
          10%
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 font-bold bg-amber-400 text-blue-600">
          20%
        </div>
        <br className="border-2 border-black"/>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-bold bg-cyan-600 text-purple-600">
          30%
        </div>

        <div className="absolute left-6 top-1/2 -translate-y-1/2 font-bold bg-orange-600 text-red-500 text-sm">
          NO DISCOUNT
        </div>
      </div>

      {/* Button */}
      <button
        onClick={spinWheel}
        className="px-6 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 active:scale-95"
      >
        Spin
      </button>
    </div>
  );
}
