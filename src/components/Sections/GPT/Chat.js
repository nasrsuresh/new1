import { ASK_SEC_GPT_URL } from "@/Constants";
import { freeOptions } from "@/Constants/CompanyOptions";
import ButtonGroup from "@/components/Buttons/ButtonGroup";
import ChatInput from "@/components/Inputs/ChatInput";
import { useState } from "react";

const Chat = ({ dropdownValue }) => {
  const [chatList, setChatList] = useState([]);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const addToChat = (text) => {
    const newChat = [...chatList, { text: text, type: "user_question" }];
    setChatList(newChat);
    setLoadingAnswer(true);

    if (!dropdownValue && dropdownValue?.length < 3) {
      console.log("Insuffiencent data");
    } else {
      console.log("HANDLE SEARCH");
      function isAnyStringMatching(stringsArray, targetString) {
        // if (dropdownValue) console.log("Invalid Input" + dropdownValue);

        return stringsArray.some((string) => string == targetString);
      }
      if (!isAnyStringMatching(freeOptions, dropdownValue)) {
        if (dropdownValue) console.log("Invalid Input" + dropdownValue);
        setLoadingAnswer(true);

        return;
      }
      const dropdown = dropdownValue?.split(", ").pop();

      fetch(ASK_SEC_GPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: dropdown || "company name",
          user_question: text,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setChatList([...newChat, { text: data.answer, type: "answer" }]);
          setLoadingAnswer(false);
        })
        .catch((error) => {
          setLoadingAnswer(false);
          console.error("Error In SET_INDEX_KEY:", error);
        });
    }
  };

  return (
    <div className="rounded-md 4 w-full bg-white border max-h-[75vh] min-h-[75vh] flex items-center justify-center">
      <div className="w-[90%] h-[90%] flex flex-col gap-5 ">
        <ButtonGroup
          selectedButton={"Chat with 10k report and Chat with transcripts"}
          buttons={["Chat with 10k report and Chat with transcripts"]}
        />
        <div className="flex flex-1 overflow-hidden overflow-y-auto flex-col">
          {chatList.map((e, i) =>
            e.type == "user_question" ? (
              <div
                key={i}
                className="w-full p-4 border-solid border-y-2  border-y-gray-200"
              >
                Q{Math.floor(i / 2) + 1}) {e.text}
              </div>
            ) : (
              <div key={i} className="w-full p-5 bg-gray-50">
                {e.text.split("\n").map((t, i) => {
                  return <p key={i}>{t}</p>;
                })}
              </div>
            )
          )}
        </div>
        <ChatInput addToChat={addToChat} loading={loadingAnswer} />
        <p className="text-sm text-[#64748b] font-medium leading-8	-tracking-2 -mt-2 text-center">
          Comprehend the key highlights of a 10K and transcripts with the help
          of Sec GPT
        </p>
      </div>
    </div>
  );
};

export default Chat;
