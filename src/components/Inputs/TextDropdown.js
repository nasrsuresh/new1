import React, { useState, useRef, useEffect } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });

const TextDropdown = ({ options, onSelect, availableOptions }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    const newFilteredOptions = options.filter(
      (option) => option.toLowerCase().includes(newInputValue.toLowerCase())
      //  &&
      // availableOptions.includes(option) // Filter only available options
    );
    // if (newFilteredOptions.length > 0) {
      setInputValue(newInputValue);
      setFilteredOptions(newFilteredOptions);
      setDropdownVisible(true);
    // } else {
    //   setFilteredOptions(options);
    // }
  };

  const handleOptionSelect = (option) => {
    setInputValue(option);
    setFilteredOptions(options);
    setDropdownVisible(false);
  };

  const handleInputBlur = () => {
    if (filteredOptions.length == 0) {
      setInputValue(JSON.stringify(filteredOptions));
    }
    setTimeout(() => {
      if (!inputRef.current.contains(document.activeElement)) {
        setDropdownVisible(false);
      }
    }, 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleInputBlur);
    return () => {
      document.removeEventListener("mousedown", handleInputBlur);
    };
  }, []);
  useEffect(() => {
    onSelect(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);
  return (
    <div
      className={`h-12 relative inline-block text-left ${inter.className} w-[350px] font-bold shadow-md max-w-full`}
      ref={inputRef}
    >
      <input
        type="text"
        className="w-full h-12 px-4 py-2 pr-8 rounded bg-[#F7F8F9] border border-primary outline-none"
        placeholder="Select an option"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setDropdownVisible(true)}
      />
      {dropdownVisible && (
        <ul
          className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded shadow-md"
          style={{ height: "400px", overflow: "auto" }}
        >
          {filteredOptions?.map((option) => (
            <li key={option} className="cursor-pointer hover:bg-gray-100">
              <button
                className="w-full py-2 px-4 disabled:opacity-20"
                onClick={(e) => {
                  handleOptionSelect(option);

                  // e.stopPropagation(); // Prevent event propagation
                }}
                disabled={!availableOptions.includes(option)} // Disable blocked options
              >
                <p className="w-full text-left">{option}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TextDropdown;
