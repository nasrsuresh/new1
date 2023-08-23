"use client";
import ButtonGroup from "@/components/Buttons/ButtonGroup";
import Header from "@/components/Header";
import ContextualHeader from "@/components/Sections/Contextual/ContextualHeader";
import InitialSearchResult from "@/components/Sections/Contextual/InitialSearchResult";
import InputContainer from "@/components/Sections/Contextual/InputContainer";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import DataSelected from "@/components/Sections/Contextual/DataSelected";
import {
  GET_ALL_SENTENCES_URL_CONCALL,
  GET_SOURCE,
  GET_SOURCE_CONCALL,
  LINK_10K_URL,
  SEARCH_URL,
  SEARCH_URL_CONCALL,
  SET_INDEX_KEY_URL,
  SET_INDEX_KEY_URL_CONCALL,
  TEST_DOC_HTML_AS_STRING,
  TEST_SEARCH_DATA,
  TEST_TRANSCRIPT_HTML_AS_STRING,
} from "@/Constants";
import Head from "next/head";
import { freeOptions, options } from "@/Constants/CompanyOptions";

// Create a nested array
const nestedArray = [];

for (let i = 0; i < 10; i++) {
  const innerArray = [];
  const numParagraphs = Math.floor(Math.random() * (10 - 7 + 1)) + 7; // Generating 7 to 10 paragraphs

  for (let j = 0; j < numParagraphs; j++) {
    const paragraph = faker.lorem.paragraph();
    innerArray.push(paragraph);
  }

  nestedArray.push(innerArray);
}
export default function ContextualSeach() {
  const [searchData, setSearchData] = useState(false);
  const [dataSelected, setDataSelected] = useState(false);
  const [sourceName, setSourceName] = useState("");
  const buttons = ["10 k", "Transcripts"];
  const [selectedButton, setSelectedButton] = useState(buttons[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownTerm, setDropdownTerm] = useState("");
  const [fullDoc, setFullDoc] = useState("");
  useEffect(() => {
    setDataSelected(false);
    setSearchData(false);
    setSearchTerm("");
    setDropdownTerm("");
    setFullDoc("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedButton]);
  function isAnyStringMatching(stringsArray, targetString) {
    return stringsArray.some((string) => string == targetString);
  }
  const handleSearch = (search, dropdown) => {
    console.log("HANDLE SEARCH");

    if (
      !isAnyStringMatching(freeOptions, dropdown) ||
      search.length < 3 ||
      dropdown.length < 3
    ) {
      alert("Invalid Input");
      return;
    }
    setDropdownTerm(dropdown);
    setSearchTerm(search);

    dropdown = dropdown.split(", ")[dropdown.split(", ").length - 1];

    if (selectedButton == buttons[0]) {
      fetch(SET_INDEX_KEY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: dropdown }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const sName = data?.message?.substr(
            18,
            data?.message?.indexOf(".") - 18
          );
          console.log(data.message);

          setFullDoc(TEST_DOC_HTML_AS_STRING);

          fetch(SEARCH_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: search }),
          })
            .then((response) => response.json())
            .then((data) => {
              const sortedData = data.results;
              const consecutiveSentences = [];
              for (let i = 0; i < sortedData.length; i += 5) {
                var temp = [];
                for (let j = 0; j < 5; j++) {
                  const element = sortedData[i + j];
                  temp.push(element);
                }
                consecutiveSentences.push(temp);
              }
              console.log(consecutiveSentences, "conscetu");
              setSearchData(consecutiveSentences || []);
            })
            .catch((error) => console.error("Error:", error));
          fetch(LINK_10K_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ symbol: dropdown }),
          })
            .then((response) => response.text())
            .then((data) => {
              fetch(data, {
                method: "GET",                
              })
                .then((response) => response.text())
                .then((html) => {
                  // console.log(html);
                  setFullDoc(
                    html.replace(
                      /<img([^>]+)src="([^"]+)"/g,
                      (match, attributes, oldSrc) => {
                        const newSrc = new URL(oldSrc, data).href;
                        return `<img${attributes}src="${newSrc}"`;
                      }
                    )
                  );
                })
                .catch((error) => console.error("Error:", error));
            })
            .catch((error) => console.error("Error:", error));
          fetch(SEARCH_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: search }),
          })
            .then((response) => response.json())
            .then((data) => {
              const sortedData = data.results;
              const consecutiveSentences = [];
              for (let i = 0; i < sortedData.length; i += 5) {
                var temp = [];
                for (let j = 0; j < 5; j++) {
                  const element = sortedData[i + j];
                  temp.push(element);
                }
                consecutiveSentences.push(temp);
              }
              console.log(consecutiveSentences, "conscetu");
              setSearchData(consecutiveSentences || []);
            })
            .catch((error) => console.error("Error:", error));
        })
        .catch((error) => console.error("Error In SET_INDEX_KEY:", error));
    } else {
      fetch(SET_INDEX_KEY_URL_CONCALL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: dropdown }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          fetch(GET_ALL_SENTENCES_URL_CONCALL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ symbol: dropdown }),
          })
            .then((response) => response.json())
            .then((data) => {
              let sentences = "";
              data?.result?.forEach((sentence) => {
                sentences += "<div>" + sentence["Sentence"] + "</div>";
              });
              sentences += "";
              console.log("transcript full data", data);
              setFullDoc(sentences);
              setSourceName(data.Source);
            });

          // setFullDoc(TEST_TRANSCRIPT_HTML_AS_STRING);
          fetch(SEARCH_URL_CONCALL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: search }),
          })
            .then((response) => response.json())
            .then((data) => {
              const sortedData = data.results;
              const consecutiveSentences = [];
              for (let i = 0; i < sortedData.length; i += 5) {
                var temp = [];
                for (let j = 0; j < 5; j++) {
                  const element = sortedData[i + j];
                  temp.push(element);
                }
                consecutiveSentences.push(temp);
              }
              console.log(consecutiveSentences);
              setSearchData(consecutiveSentences || []);
            })
            .catch((error) => console.error("Error:", error));
        })
        .catch((error) => console.error("Error In SET_INDEX_KEY:", error));
    }
  };

  return (
    <main className="h-[100vh] bg-[#F7F8F9]">
      <Header />
      <div className="w-100 h-[92vh] p-8">
        {!dataSelected && (
          <div className="mt-3">
            <ContextualHeader onSearch={handleSearch} />
          </div>
        )}

        {!dataSelected && (
          <div className="my-5">
            <ButtonGroup
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
              buttons={buttons}
            />
          </div>
        )}

        {Boolean(searchData) ? (
          <div className="my-5">
            {dataSelected ? (
              <DataSelected
                data={searchData}
                sourceName={sourceName}
                label={`Search results for ${searchTerm} for ${dropdownTerm} Showing ${searchData?.length} results`}
                fullDoc={fullDoc}
              />
            ) : (
              <InitialSearchResult
                data={searchData || []}
                onDataSelect={setDataSelected}
                sourceName={sourceName}
                label={`Search results for ${searchTerm} for ${dropdownTerm} Showing ${searchData?.length} results`}
              />
            )}
          </div>
        ) : (
          <div className="my-5">
            <InputContainer />
          </div>
        )}
        {Boolean(dataSelected) && (
          <div className="flex items-center justify-end">
            <button
              className="border p-3 text-blue-500 rounded-md"
              onClick={() => {
                // setSearchData(false);
                setDataSelected(false);
              }}
            >
              Back to Contextual Search
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
