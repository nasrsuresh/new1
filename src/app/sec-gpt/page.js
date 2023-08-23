"use client";
import { freeOptions, options } from "@/Constants/CompanyOptions";
import Header from "@/components/Header";
import TextDropdown from "@/components/Inputs/TextDropdown";
import Chat from "@/components/Sections/GPT/Chat";
import { useEffect, useState } from "react";
// const options = ["Sales Options", "Sales Options 2", "Sales Options 3"];
export default function SecGpt() {
  const [dropdownValue, setDropdownValue] = useState("");
  useEffect(() => {
    if (dropdownValue.length > 4) {
    }
  }, [dropdownValue]);
  return (
    <main className="h-[100vh] bg-[#F7F8F9]">
      <Header />
      <div className="w-100 h-[92vh] p-8 flex justify-center">
        <div className="w-[85%] flex gap-3 flex-col">
          <div className="flex items-center justify-center gap-5 flex-col">
            <TextDropdown
              options={options}
              availableOptions={freeOptions}
              onSelect={setDropdownValue}
            />
            <Chat dropdownValue={dropdownValue} />
          </div>
        </div>
      </div>
    </main>
  );
}
