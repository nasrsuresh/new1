"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import TextCard from "@/components/Cards/TextCard";
import AAPLSearchbar from "@/components/Inputs/AAPLSearchbar";
import AAPLPagination from "@/components/Pagination/AAPLFooter";
import { useState } from "react";

const AAPL = () => {
  const [paginationSelected, setPaginationSelected] = useState(0);
  return (
    <div className="w-[40%] bg-white p-9  h-[92vh]">
      {paginationSelected === 0 && (
        <div className="flex gap-3 my-5 p-2 font-bold -tracking-2 text-base">
          <div className="min-w-fit">
          <PrimaryButton text="AAPL 10k" />
          </div>
          <AAPLSearchbar />
        </div>
      )}
       {paginationSelected === 1 && (
        <div className="flex gap-3 my-5 p-2 font-bold -tracking-2 text-base">
          
          <PrimaryButton text="AAPL, Flash Report" />
         
        </div>
      )}
      
      {paginationSelected === 2 && (
        <div className="flex gap-3 my-5 p-2 font-bold -tracking-2 text-base">
          
          <PrimaryButton text="Sec GPT" />
         
        </div>
      )}
      <TextCard />
      <AAPLPagination
        selected={paginationSelected}
        setSelected={setPaginationSelected}
      />
    </div>
  );
};

export default AAPL;
