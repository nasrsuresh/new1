"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
const ResearchSearchBar = ({
  inputClassName,
  btnClassName,
  onSubmit,
  ...props
}) => {
  const [value, setValue] = useState("");
  return (
    <div className={"flex items-center w-full "}>
      <input
        type="text"
        placeholder="Search for symbol or company"
        className={
          "h-12 w-[60%] px-4 py-2 border border-primary rounded-l-md focus:outline-none " +
          inputClassName
        }
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        disabled={value.length < 4}
        onClick={() => onSubmit(value)}
        className={
          "h-12 w-20 flex  justify-center items-center w bg-primary hover:opacity-80  border-primary text-white px-4 py-[9px] rounded-r-md " +
          btnClassName +
          (value.length < 4 ? " disabled:opacity-20 " : "")
        }
      >
        <FiSearch size={24} />
      </button>
    </div>
  );
};

export default ResearchSearchBar;
