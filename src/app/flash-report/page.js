"use client";
import Header from "@/components/Header";
import ReportContent from "@/components/Sections/Reports/ReportContent";
import Sidebar from "@/components/Sections/Reports/Sidebar";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import {
  COMPANY_DATA_URL,
  COMPANY_OTHER_INFO_URL,
  STOCK_DATA_URL,
} from "@/Constants";
export default function FlashReport() {
  const [selectedLink, setSelectedLink] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [otherData, setOtherData] = useState(null);
  const [selectedGraphOption, setSelectedGraphOption] = useState(0);
  const [dropdownValue, setDropdownValue] = useState(null);
  const graphOptions = ["1_month", "1_year", "5_year"];
  const getStockData = (dropdown, period = "1_month") => {
    fetch(STOCK_DATA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol: dropdown,
        period: graphOptions[selectedGraphOption],
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        const stock_data = [];
        data?.stock_price_data?.forEach((e) =>
          stock_data.push({ name: e.date, pv: e.close_price })
        );
        // console.log(stock_data.length);
        setGraphData({ data: stock_data.reverse() });
      })
      .catch((e) => console.log("Error STOCK_DATA_URL:", e));
  };
  useEffect(() => {
    if (dropdownValue?.length > 3) {
      getStockData(dropdownValue, graphOptions[selectedGraphOption]);
    }
  }, [selectedGraphOption]);
  const handleDropdown = (dropdown) => {
    setGraphData(null);
    setCompanyData(null);
    setSelectedLink(null);
    setOtherData(null);
    getStockData(dropdown, graphOptions[selectedGraphOption]);

    fetch(COMPANY_DATA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol: dropdown }),
    })
      .then((response) => response.json())
      .then((data) => {
        const company_data = {
          title: "Comapny Data",
          data: [
            { attribute: "vol Avg.", value: data["Vol Avg"] },
            { attribute: "P/E TTM", value: data["P/E TTM"] },
            { attribute: "Website", value: data["Website"] },
            { attribute: "CEO", value: data["CEO"] },
            {
              attribute: "Full Time Employees",
              value: data["Full Time Employees"],
            },
            { attribute: "Currency", value: data["Currency"] },
            { attribute: "Revenue", value: data["Revenue, 2022"] },
            { attribute: "Net Income, 2022", value: data["Net Income, 2022"] },
          ],
        };
        setCompanyData(company_data);
        // console.log(company_data, "Company Data");
      })
      .catch((e) => console.log("Error STOCK_DATA_URL:", e));

    fetch(COMPANY_OTHER_INFO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol: dropdown }),
    })
      .then((response) => response.json())
      .then((data) => {
        const array_of_headings = [];

        const titles = ["Executive Insights", "Deep Dive"];
        const sources = ["source_10k", "source_concall"];

        const paragraphHeadings = [
          {
            alerts_and_warnings: "Alerts & Warnings",
            financial_highlights: "Financial Highlights",
            strategic_focus: "Strategic Focus & Future Plans",
          },
          {
            swot_analysis: "Swot Analysis",
            investment_themes: "Investment Themes",
            risk_mitigations: "Risk & Mitigations",
            challenges_highlighted: "Challenges Highlighted in",
            transcript: "Transcript",
          },
        ];
        const sourceData = {
          alerts_and_warnings: 0,
          financial_highlights: 0,
          strategic_focus: 1,
          swot_analysis: 0,
          investment_themes: 1,
          risk_mitigations: 0,
          challenges_highlighted: 0,
          transcript: 1,
        };

        for (let i = 0; i < titles.length; i++) {
          const title = titles[i];
          const innerArray = [];

          const numParagraphs = Object.keys(paragraphHeadings[i]).length; // Generating 3 to 5 paragraphs
          const mainId = faker.database.mongodbObjectId();

          for (let j = 0; j < numParagraphs; j++) {
            const para_index = Object.keys(paragraphHeadings[i])[j];
            const paragraph = paragraphHeadings[i][para_index];
            // console.log(para_index, "para");
            const id = faker.database.mongodbObjectId();
            const dataArray = [];
            const str_for_this_para = data[para_index];
            if (para_index == "alerts_and_warnings") {
              const data_for_this_para = str_for_this_para?.split("\n\n") || [];
              // console.log(data_for_this_para);

              for (let j = 0; j < data_for_this_para.length; j++) {
                const q_data = data_for_this_para[j].split(":");
                const title = q_data[0];
                const paragraph = q_data[1] || "some undefined";

                const id = faker.database.mongodbObjectId();

                dataArray.push({
                  paragraph,
                  title,
                  id,
                  type: "card",
                  bold: true,
                });
              }

              if (data_for_this_para.length > 0)
                innerArray.push({
                  text: paragraph,
                  id,
                  dataArray,
                  source:
                    data[sources[sourceData[para_index]]] || "undetermined",
                });
            } else if (para_index == "financial_highlights") {
              const data_for_this_para = str_for_this_para?.split("-") || [];
              for (let j = 0; j < data_for_this_para.length; j++) {
                const q_data = data_for_this_para[j].split("- ");
                const title = q_data[0];
                // const paragraph = q_data[1] || "some undefined";

                const id = faker.database.mongodbObjectId();
                if (title.length > 3)
                  dataArray.push({
                    // paragraph,
                    title,
                    id,
                    type: "card",
                    bold: false,
                  });
              }

              if (dataArray.length > 0)
                innerArray.push({
                  text: paragraph,
                  id,
                  dataArray,
                  source:
                    data[sources[sourceData[para_index]]] || "undetermined",
                });
            } else if (para_index == "strategic_focus") {
              const sections = str_for_this_para.split(/\n{2,}/);

              // Initialize variables to store the parsed data
              const jsonData = [];
              let currentSection = null;

              // Loop through each section and parse the content
              sections.forEach((section) => {
                if (section.endsWith(":")) {
                  // This section contains only a title
                  currentSection = {
                    title: section.replace(":", ""),
                    paragraphs: [],
                  };
                  jsonData.push(currentSection);
                } else if (currentSection) {
                  // This section contains paragraphs
                  const paragraphs = section.split("\n");
                  currentSection.paragraphs =
                    currentSection.paragraphs.concat(paragraphs);
                }
              });
              for (let j = 0; j < jsonData.length; j++) {
                const title = jsonData[j].title;
                const paragraph = (
                  <>
                    {jsonData[j].paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </>
                );
                const id = faker.database.mongodbObjectId();
                if (title?.length > 3)
                  dataArray.push({
                    paragraph,
                    title,
                    id,
                    type: "card",
                    bold: true,
                  });
              }

              if (dataArray.length > 0)
                innerArray.push({
                  text: paragraph,
                  id,
                  dataArray,
                  source:
                    data[sources[sourceData[para_index]]] || "undetermined",
                });
            } else if (para_index == "swot_analysis") {
              const data_for_this_para = str_for_this_para?.split("\n\n") || [];
              // console.log(data_for_this_para);

              for (let j = 0; j < data_for_this_para.length; j++) {
                const q_data = data_for_this_para[j].split(":");
                const title = q_data[0];
                const paragraph =
                  q_data[1].replace("- ", "") || "some undefined";

                const id = faker.database.mongodbObjectId();

                dataArray.push({
                  paragraph,
                  title,
                  id,
                  type: "card",
                  bold: true,
                });
              }

              if (data_for_this_para.length > 0)
                innerArray.push({
                  text: paragraph,
                  id,
                  dataArray,
                  source:
                    data[sources[sourceData[para_index]]] || "undetermined",
                });
            } else if (para_index == "investment_themes") {
              const sections = str_for_this_para.split(/\n{2,}/);
              const jsonData = [];
              let currentSection = null;

              sections.forEach((section) => {
                if (section.endsWith(":")) {
                  currentSection = {
                    title: section.replace(":", ""),
                    paragraphs: [],
                  };
                  jsonData.push(currentSection);
                } else if (currentSection) {
                  currentSection.paragraphs = currentSection.paragraphs.concat(
                    section.split("\n")
                  );
                }
              });

              for (let j = 0; j < jsonData.length; j++) {
                const title = jsonData[j].title;
                const paragraph = (
                  <>
                    {jsonData[j].paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </>
                );
                const id = faker.database.mongodbObjectId();
                if (title?.length > 3)
                  dataArray.push({
                    paragraph,
                    title,
                    id,
                    type: "card",
                    bold: true,
                  });
              }

              if (dataArray.length > 0) {
                innerArray.push({
                  text: paragraph,
                  id,
                  dataArray,
                  source:
                    data[sources[sourceData[para_index]]] || "undetermined",
                });
              }
            } else if (para_index == "risk_mitigations") {
              // console.log(data_for_this_para);
              const parsedData = str_for_this_para
                .split(/\n{2,}/)
                .map((section) => {
                  const [title, ...paragraph] = section
                    .split("\n")
                    .map((line) => line.trim());
                  return title
                    ? { title, paragraph }
                    : { type: "paragraph", paragraph };
                });

              for (let j = 0; j < parsedData.length; j++) {
                const title = parsedData[j].title.replace("- ", "");
                const paragraph = (
                  <>
                    {parsedData[j].paragraph?.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </>
                );
                dataArray.push({
                  paragraph,
                  title,
                  id: faker.database.mongodbObjectId(),
                  type: "card",
                  bold: true,
                });
              }

              if (parsedData.length > 0) {
                innerArray.push({
                  text: paragraph,
                  id,
                  dataArray,
                  source:
                    data[sources[sourceData[para_index]]] || "undetermined",
                });
              }
            } else if (para_index == "challenges_highlighted") {
              // console.log(data_for_this_para);

              const cleanedText = str_for_this_para.trim();
              const sections = cleanedText.split(/\n{2,}/);

              sections.forEach((section) => {
                const lines = section.split("\n").map((line) => line.trim());
                const title = lines[0]
                  .replace(/^\d+\./, "")
                  .replace("- ", "")
                  .trim();
                const paragraph = lines.slice(1).join(" ");

                if (title && paragraph) {
                  dataArray.push({
                    paragraph,
                    title,
                    id: faker.database.mongodbObjectId(),
                    type: "card",
                    bold: true,
                  });
                }
              });

              if (dataArray.length > 0) {
                innerArray.push({
                  text: paragraph,
                  id,
                  dataArray,
                  source:
                    data[sources[sourceData[para_index]]] || "undetermined",
                });
              }
            }
          }

          array_of_headings.push({
            title: title,
            paragraphs: innerArray,
            id: mainId,
          });
        }
        setOtherData(array_of_headings);
        console.log(array_of_headings);
      })
      .catch((e) => console.log("Error STOCK_DATA_URL:", e));
    setDropdownValue(dropdown);
  };

  return (
    <main className="h-[100vh] bg-[#F7F8F9]">
      <Header />
      <div className="w-100 h-[92vh] p-8 flex">
        <Sidebar
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink}
          data={otherData}
          handleDropdownChange={handleDropdown}
        />
        <ReportContent
          graphData={graphData}
          data={selectedLink}
          companyData={companyData}
          selectedGraphOption={selectedGraphOption}
          setSelectedGraphOption={setSelectedGraphOption}
        />
      </div>
    </main>
  );
}
