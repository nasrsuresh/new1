"use client";
import React, { useState } from "react";

import { Inter } from "next/font/google";
const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });
const ButtonGroup = ({
  selectedButton,
  setSelectedButton,
  buttons = ["10 k", "Transcripts"],
}) => {
  

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div className={`${inter.className} flex items-center justify-center`}>
      <div className="flex p-2 bg-white rounded-sm border flex-wrap">
        {buttons.map((button) => (
          <button
            key={button}
            className={`py-1 px-4 min-w-fit rounded focus:outline-none w-fit ${
              selectedButton === button
                ? "bg-primary text-white"
                : "bg-white text-gray-600"
            }`}
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
