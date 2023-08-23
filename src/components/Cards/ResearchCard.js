import Image from "next/image";

const ResearchCard = ({ data }) => {
  return (
    <div className="flex gap-10 w-[50%]">
      <div className="w-8 h-8 p-2 bg-[#F9E6E6] rounded-sm  flex items-center justify-center">
        <Image src={data.image} alt={data.title} className="w-6" />
      </div>
      <div>
        <h3 className="text-primary font-bold text-base  -tracking-2">
          {data.title}
        </h3>
        <p className="text-gray-600 font-medium text-base  -tracking-2 mt-4">
          {data.details}
        </p>
      </div>
    </div>
  );
};
export default ResearchCard;
