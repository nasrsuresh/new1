import { FiSearch } from "react-icons/fi";

const AAPLSearchbar = () => {
  return (
    <div className="flex items-center px-2 border border-primary rounded-md w-full">
      <FiSearch size={24} />

      <input
        type="text"
        className="w-full outline-none border-none pl-2 placeholder-gray-600"
        placeholder="Search..."
      />
    </div>
  );
};

export default AAPLSearchbar;
