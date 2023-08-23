"use client";
import { useState } from "react";
import { Inter } from "next/font/google";
import { BsArrowRight } from "react-icons/bs";
const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });
const InputContainer = () => {
  return (
    <div
      className={`${inter.className} flex py-12 justify-center w-full bg-white border h-[65vh]`}
    >
      <div className="flex w-[70%] flex-col">
        <p className="text-2xl font-bold">Examples</p>
        <div className="flex items-end flex-col gap-5 mt-8">
          <div className="w-[80%] text-gray-500 flex flex-row">
            <div className="flex-1">Inputs</div>
            <div className="flex-1">
              <p>Search Context</p>
            </div>
          </div>
          <div className="w-[80%] text-gray-500 flex flex-row">
            <div className="flex-1">
              <div className="border p-2 rounded-sm flex justify-between max-w-[350px] px-3">
                <p className="text-[#64748B]">Management Vision</p>
                <BsArrowRight size={24} className="text-[#64748B]" />
              </div>
            </div>
            <div className="flex-1">
              <p>
                Look for chairman statement, company strategy, future plans etc
              </p>
            </div>
          </div>
          <div className="w-[80%] text-gray-500 flex flex-row">
            <div className="flex-1">
              <div className="border p-2 rounded-sm flex justify-between max-w-[350px] px-3">
                <p className="text-[#64748B]">Layoff</p>
                <BsArrowRight size={24} className="text-[#64748B]" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium leading-6 -tracking-2">
                Automatically search for headcount, job cut, firing etc
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputContainer;
