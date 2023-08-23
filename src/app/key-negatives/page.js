/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Header from "@/components/Header";
import TextDropdown from "@/components/Inputs/TextDropdown";
import DataSelected from "@/components/Sections/Contextual/DataSelected";
import InitialSearchResult from "@/components/Sections/Contextual/InitialSearchResult";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import ButtonGroup from "@/components/Buttons/ButtonGroup";
import InputContainer from "@/components/Sections/Contextual/InputContainer";
import { freeOptions, options } from "@/Constants/CompanyOptions";
import {
  GET_ALL_SENTENCES_URL_CONCALL_NEGATIVE,
  SET_SYMBOL_KEY_NEGATIVE_10K_URL,
  SET_SYMBOL_KEY_NEGATIVE_CONCALL_URL,
  TEST_DOC_HTML_AS_STRING,
  LINK_10K_URL,
} from "@/Constants";

export default function KeyNegatives() {
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownTerm, setDropdownTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [dataSelected, setDataSelected] = useState(false);
  const [fullDoc, setFullDoc] = useState("");
  const [sourceName, setSourceName] = useState("");

  const buttons = [
    "Key negative statements from transcripts",
    "Key critical statements from 10K",
  ];
  const [selectedButton, setSelectedButton] = useState(buttons[0]);
  useEffect(() => {
    if (!dropdownValue && dropdownValue?.length < 3) {
      console.log("Insuffiencent data");
    } else {
      console.log("HANDLE SEARCH");
      function isAnyStringMatching(stringsArray, targetString) {
        return stringsArray.some((string) => string == targetString);
      }
      if (!isAnyStringMatching(freeOptions, dropdownValue)) {
        // if (dropdownValue) alert("Invalid Input" + dropdownValue);
        return;
      }
      const dropdown = dropdownValue?.split(", ").pop();
      if (selectedButton) {
        setDropdownTerm(dropdownValue);
        if (selectedButton == buttons[0]) {
          setFullDoc("")
          setDataSelected("")
          setSourceName("")
          fetch(SET_SYMBOL_KEY_NEGATIVE_CONCALL_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ symbol: dropdown }),
          })
            .then((response) => response.json())
            .then((data) => {
              // console.log(data);
              const sortedData = data.result;
              const consecutiveSentences = [];
              const extractSubString = (str) => {
                return str.substr(11, str.lastIndexOf('"') - 11);
              };
              for (let i = 0; i < sortedData.length; i += 1) {
                var temp = [];
                temp.push({ "Cleaned Sentence": "" });
                temp.push({
                  "Cleaned Sentence": extractSubString(
                    sortedData[i]["previous"]
                  ),
                });
                temp.push({
                  "Cleaned Sentence": extractSubString(
                    sortedData[i]["highlighted"]
                  ),
                  Type: "similar_sentences",
                });
                temp.push({
                  "Cleaned Sentence": extractSubString(sortedData[i]["next"]),
                });
                temp.push({ "Cleaned Sentence": "" });

                consecutiveSentences.push(temp);
              }
              // console.log(consecutiveSentences, "conscetu");
              setSourceName(data.Source);

              setSearchData(consecutiveSentences);
              fetch(GET_ALL_SENTENCES_URL_CONCALL_NEGATIVE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symbol: dropdown }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("transcript full data", data);

                  let sentences = "";
                  data?.result?.forEach((sentence) => {
                    sentences += "<div>" + sentence["Sentence"] + "</div>";
                  });
                  sentences += "";
                  setFullDoc(sentences);
                  console.log(Object.keys(data));
                });
            })
            .catch((error) =>
              console.error(
                "Error In SET_SYMBOL_KEY_NEGATIVE_CONCALL_URL:",
                error
              )
            );
        } else {
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

          fetch(SET_SYMBOL_KEY_NEGATIVE_10K_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ symbol: dropdown }),
          })
            .then((response) => response.json())
            .then((data) => {
              const sortedData = data.result;
              const consecutiveSentences = [];

              for (let i = 0; i < sortedData.length; i += 1) {
                var temp = [];
                temp.push({ "Cleaned Sentence": "" });
                temp.push({
                  "Cleaned Sentence": sortedData[i][
                    "previous_sentence"
                  ].replaceAll("\n", ": "),
                });
                temp.push({
                  "Cleaned Sentence": sortedData[i][
                    "negative_sentence"
                  ].replaceAll("\n", ": "),
                  Type: "similar_sentences",
                });
                temp.push({
                  "Cleaned Sentence": sortedData[i]["next_sentence"].replaceAll(
                    "\n",
                    ": "
                  ),
                });
                temp.push({ "Cleaned Sentence": "" });

                consecutiveSentences.push(temp);
              }
              console.log(consecutiveSentences, "conscetu");
              setSearchData(consecutiveSentences);
            })
            .catch((error) => console.error("Error In SET_INDEX_KEY:", error));
        }
      }
    }
  }, [dropdownValue]);

  return (
    <main className="h-[100vh]  bg-[#F7F8F9]">
      <Header />

      <div className="w-100 h-[92vh] p-8">
        <div className={"items-center w-full "}>
          {!dataSelected && (
            <TextDropdown
              options={options}
              availableOptions={freeOptions}
              onSelect={setDropdownValue}
            />
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
        </div>
        {Boolean(searchData) ? (
          <>
            <div className="my-3">
              {dataSelected ? (
                <DataSelected
                  data={searchData || []}
                  sourceName={sourceName}
                  fullDoc={fullDoc}
                  label={`Search results for ${dropdownTerm}  Showing ${searchData?.length} results`}
                />
              ) : (
                <InitialSearchResult
                  data={searchData || []}
                  sourceName={sourceName}
                  onDataSelect={setDataSelected}
                  label={`Search results for ${dropdownTerm}  Showing ${searchData?.length} results`}
                />
              )}
            </div>
            {Boolean(dataSelected) && (
              <div className="flex items-center justify-end">
                <button
                  className="border p-3 text-blue-500 rounded-md"
                  onClick={() => {
                    setDataSelected(false);
                  }}
                >
                  Back to Key Negatives
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="my-3">
            <InputContainer />
          </div>
        )}
      </div>
    </main>
  );
}
