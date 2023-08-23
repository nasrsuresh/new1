const AAPLPagination = ({selected, setSelected}) => {
  return (
    <div className="flex gap-3 mt-8">
      {[1, 2, 3].map((v, i) => {
        return <div className={`h-1 w-24 rounded-md cursor-pointer ${selected === i ?"bg-primary": "bg-[#E7EAEE]"}`} onClick={() => setSelected(i)} key={i}></div>;
      })}
    </div>
  );
};

export default AAPLPagination;
