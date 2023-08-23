import LineChart from "@/components/Charts/LineChart";
function isLink(text) {
  // Regular expression to match a basic URL pattern
  var urlPattern = /^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  return urlPattern.test(text);
}
export default function ReportContent({
  data,
  graphData,
  companyData,
  selectedGraphOption,
  setSelectedGraphOption,
}) {
  console.log(
    // graphData,
    data?.data?.dataArray?.filter((v) => v.type === "graph")
  );

  return (
    <div className="flex w-[70%] bg-white border gap-3 p-4 rounded-md  h-[85vh] overflow-hidden overflow-y-auto">
      <div className="flex flex-1 flex-col">
        {data?.data?.text && (
          <>
            <p className="text-2xl text-primary underline -tracking-2 leading-6 font-medium my-2">
              {data?.data?.text}
            </p>
            <p className="text-base text-[#1D4ED8] underline -tracking-2 leading-6 font-bold my-2">
              Source:{data?.data?.source}
            </p>
          </>
        )}
        {data?.data?.dataArray
          ?.filter((v) => v.type === "card")
          ?.map((v, i) => {
            return (
              <div key={i + "card"} className="flex flex-col gap-1] my-2">
                <p
                  className={`mb-2text-base -tracking-2 leading-6 text-[#323A46]
                    ${v.bold == true ? " font-bold" : ""}
                    `}
                >
                  {i + 1}. {v.title}
                </p>
                {v?.paragraph ? (
                  <p className="font-medium text-sm -tracking-2 leading-6 text-[#4B5768]">
                    {v.paragraph}
                  </p>
                ) : null}
              </div>
            );
          })}
      </div>
      <div className="flex flex-1 flex-col gap-3">
        {graphData?.data && (
          <div className="flex flex-1 flex-row gap-3 justify-around align-middle">
            {[{ name: "1M" }, { name: "1Y" }, { name: "5Y" }].map((e, i) => {
              return (
                <div
                  className="w-full "
                  key={e.name}
                  onClick={() => {
                    setSelectedGraphOption(i);
                  }}
                >
                  <p
                    className={`text-center  py-2 rounded font-bold cursor-default ${
                      i == selectedGraphOption ? "bg-red-100 text-red-600" : ""
                    }`}
                  >
                    {e.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <LineChart key={"chart"} data={graphData?.data} />

        {companyData?.data.map((com, ind) => {
          return (
            <div
              key={ind + "com"}
              className="flex justify-between items-center border-b px-1 py-1"
            >
              <p className="text-[#64748B] text-base font-medium">
                {com.attribute}
              </p>
              <p className="text-[#323A46] text-base font-medium">
                {isLink(com.value) ? (
                  <a href={com.value} className="text-blue-500" target="_blank">
                    {com.value}
                  </a>
                ) : (
                  com.value
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
