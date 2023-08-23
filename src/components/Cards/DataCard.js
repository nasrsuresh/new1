const DataCard = ({ data, index, onSelect, isSelected }) => {
  
  return (
    <div
      onClick={() => onSelect(index)}
      className={`flex gap-2  itmes-start border p-5 flex-row m-2 rounded-md cursor-pointer hover:shadow-lg ${isSelected ? "border-[#C00000] bg-[#F9E6E6]": ""}`}
    >
      <div 
          className={`text-gray-800 font-medium text-base leading-8 -tracking-2`}
          >{index + 1}.</div>
      <div className="felx flex-col gap-2">
        <p
          className={`text-gray-800 font-medium text-base leading-6 -tracking-2`}
        >
          {data[2]?.["Cleaned Sentence"].replace(":", "") || JSON.stringify(data[index])}
        </p>
      </div>
    </div>
  );
};
export default DataCard;
