import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const ChatInput = ({ addToChat, loading }) => {
  const [chatText, setChatText] = useState("");
  const handleSearch = () => {
    console.log("clicked", chatText);
    // se
    if (chatText.length < 3) return
    addToChat(chatText);
    setChatText("");
  };
  return (
    <div className="flex h-[50px] items-center px-2 border border-primary rounded-md w-full shadow-sm shadow-primary">
      <input
        value={chatText}
        type="text"
        className="w-full outline-none border-none pl-2 placeholder-gray-600 text-bold "
        placeholder="Type your question here"
        onChange={(e) => setChatText(e.target.value)}
        disabled={loading}
      />
      <FiSearch onClick={handleSearch} size={24} />
    </div>
  );
};

export default ChatInput;
