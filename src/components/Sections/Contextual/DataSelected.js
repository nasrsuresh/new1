"use client";
import { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });
import ResearchSearchCard from "@/components/Cards/ResearchSearchCard";
import DataCard from "@/components/Cards/DataCard";

const DataSelected = ({
  data,
  onDataSelect,
  sourceName = "2022_10K report",
  label,
  fullDoc,
}) => {
  const similarPositions = [];

  data?.forEach((result) => {
    try {
      result?.forEach?.((r) => {
        if (r.Type == "similar_sentences") {
          similarPositions.push(r.Position);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
  const [cardSelected, setCardSelected] = useState(0);

  const docContainerRef = useRef();
  function highlightNestedChildren(element, searchText) {
    if (element.textContent.includes(searchText)) {
      element.scrollIntoView({ behavior: "smooth" });
      element.style.backgroundColor = "yellow";
    }

    const childDivs = element.querySelectorAll("div");
    for (const childDiv of childDivs) {
      highlightNestedChildren(childDiv, searchText);
    }
  }

  function findAndHighlight(
    rootElement,
    searchText,
    stackSize = 0,
    foundInParent = false
  ) {
    const divsToSearch = rootElement?.children;
    let found = false;
    for (const div of divsToSearch) {
      if (div?.textContent?.includes(searchText)) {
        console.log("found");
        div.scrollIntoView({ behavior: "smooth" });

        // div.style.backgroundColor = "blue";

        if (div?.children?.length > 0) {
          // div.backgroundColor = "blue"
          div?.children?.forEach?.((element) => {
            console.log(
              "found1",
              searchText.replace(":", ""),
              element.textContent
            );
          });
          findAndHighlight(div, searchText.replace(":", ""), stackSize, true);
        } else {
          highlightNestedChildren(div, searchText);
          // console.log(div);
          found = true;
          console.log("found2");
        }
        return;
      }
    }
    if (foundInParent && !found) {
      console.log("showing parent");
      highlightNestedChildren(rootElement, searchText);
    }
    if (!found && stackSize < 5) {
      console.log("not dounsa");
      let splitList = searchText.split(": ");
      if (splitList.length > 1) {
        console.log(splitList);
        console.log(splitList[1], rootElement);
        for (let index = 1; index < splitList.length; index++) {
          const element = splitList[index];
          findAndHighlight(
            rootElement,
            splitList[splitList.length - 1],
            ++stackSize
          );
        }
      } else {
        let splitList = searchText.split(",");
        splitList = splitList.filter((e) => e.length > 3);
        if (splitList.length > 1) {
          console.log(splitList);
          console.log(splitList[1], rootElement);
          for (let index = 1; index < splitList.length; index++) {
            const element = splitList[index];
            findAndHighlight(
              rootElement,
              splitList[splitList.length - 1],
              ++stackSize
            );
          }
        }
      }
    }
  }
  const goToText = (e) => {
    // console.log(data?.[e]?.[2]?.["Cleaned Sentence"]);
    // const divs = docContainerRef.current?.children; // Replace with a class that identifies your scrollable divs
    console.log("trying", data?.[e]?.[2]?.["Cleaned Sentence"]);

    findAndHighlight(
      docContainerRef.current,
      data?.[e]?.[2]?.["Cleaned Sentence"].replace(/^(?:[A-Z][a-z]*\s*)+/g, '')
    );
  };
  const handleCardSelect = (e) => {
    if (e == cardSelected) goToText(e);
    setCardSelected(e);
  };
  useEffect(() => {
    goToText(cardSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardSelected]);
  return (
    <div
      className={`${inter.className} flex gap-4 px-5 py-8 w-full flex-col border  `}
    >
      <div className="w-full">
        <div className="flex-row flex justify-center gap-8">
          <p className="text-base font-bold">{label || "No label"}</p>
          <p className="text-base font-bold">Source: {sourceName}</p>
        </div>
      </div>
      <div className="w-full flex flex-row gap-4 flex-1">
        <div className="flex flex-col w-[30%] max-h-[65vh] min-h-[65vh] bg-white overflow-hidden overflow-y-auto">
          {data?.map((v, i) => {
            return (
              <DataCard
                data={v}
                key={i}
                index={i}
                onSelect={handleCardSelect}
                isSelected={cardSelected === i}
              />
            );
          })}
        </div>
        <div className="flex w-[70%] max-h-[65vh] min-h-[65vh] bg-white border px-5 py-8 flex-col overflow-hidden overflow-y-scroll">
          <div
            ref={docContainerRef}
            dangerouslySetInnerHTML={{ __html: fullDoc }}
          />
        </div>
      </div>
    </div>
  );
};

export default DataSelected;
