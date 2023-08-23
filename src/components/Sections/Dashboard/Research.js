import ResearchCard from "@/components/Cards/ResearchCard";
import GPT_ICON from "@/../public/assets/Icons/gpt.png";
import NOTE_ICON from "@/../public/assets/Icons/note.png";
import SEARCH_ICON from "@/../public/assets/Icons/search.png";

import { Inter } from "next/font/google";
import ResearchSearchBar from "@/components/Inputs/ResearchSearchbar";
const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });

const RESEARCH_CARDS_ARRAY = [
  {
    title: "Contextual search",
    details: "Quickly uncover the hidden insights from 10k & transcripts.",
    image: SEARCH_ICON,
  },
  {
    title: "Flash Report",
    details:
      "Instantly unmask the key trends, warning signs, and the company's stratrgic orientation.",
    image: NOTE_ICON,
  },
  {
    title: "Sec GPT",
    details:
      "Comprehend the key highlights of a 10k and transcripts bt engaging in aconversation with Sec GPT.",
    image: GPT_ICON,
  },
];
const Research = () => {
  return (
    <div className={`${inter.className} w-[60%] p-8 bg-[#F7F8F9]  h-[92vh]`}>
      <div className="">
        <h1 className="text-2xl text-gray-800 font-bold">
          Research the company in the style of
        </h1>
        <h1 className="text-2xl text-gray-800 font-bold">
          {'"'}
          <span className="text-primary -tracking-2">Warren Buffet</span>
          {'"'}
        </h1>
      </div>
      {RESEARCH_CARDS_ARRAY.map((v, i) => (
        <div className="my-5" key={i}>
          <ResearchCard data={v} />
        </div>
      ))}
      <div className="w-full pt-5">
        <ResearchSearchBar />
      </div>
    </div>
  );
};

export default Research;
