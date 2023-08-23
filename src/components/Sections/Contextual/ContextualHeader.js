"use client";
import CompanyOptions, { freeOptions, options } from "@/Constants/CompanyOptions";
import ResearchSearchBar from "@/components/Inputs/ResearchSearchbar";
import TextDropdown from "@/components/Inputs/TextDropdown";
import { useState } from "react";



const ContextualHeader = ({ onSearch }) => {
  
  
  const [dropdownValue, setDropdownValue] = useState("");
  const handleSearch = (e) => {
    onSearch(e, dropdownValue);
  };
  console.log(dropdownValue);
  return (
    <div className="flex flex-row items-center gap-4">
      <TextDropdown options={options} availableOptions={freeOptions} onSelect={setDropdownValue} />
      <ResearchSearchBar
        btnClassName="shadow-lg"
        inputClassName="text-gray-500 font-bold shadow-lg"
        placeholder="Search for phrase or word to get relevant snippet"
        onSubmit={handleSearch}
      />
    </div>
  );
};

export default ContextualHeader;
