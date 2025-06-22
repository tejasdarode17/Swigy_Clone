import { FaStar } from "react-icons/fa";

const TopSectionRestaurentMenu = ({ topSectionData }) => {
  
  return (
    <div className="w-[50%] mx-auto">
      <div className="mt-15 mb-10 w-[95%] mx-auto">
        <h1 className="text-3xl font-bold">{topSectionData?.name}</h1>
      </div>
      <div className="bg-gradient-to-b from-white via-[#ebebf2] to-[#dfdfe7] pt-0 px-4 pb-4 rounded-b-[36px]">
        <div className="rounded-[20px] border border-[rgba(2,6,12,0.15)] bg-white shadow-[0_8px_16px_0_rgba(0,0,0,0.04)]">
          <div className="pl-5 pt-5 pb-5">
            <div className="flex items-center gap-2 font-bold">
              <FaStar className="rounded-4xl text-green-600" />
              <div className="flex gap-1 ">
                <p>{topSectionData?.avgRating}</p>
                <p>({topSectionData?.totalRatingsString})</p>
              </div>
              <p>-</p>
              <p>{topSectionData?.costForTwoMessage}</p>
            </div>
            <div>
              <p className="text-[#FF5200] underline">
                {topSectionData?.cuisines?.join(", ")}
              </p>
            </div>
            <div className="flex gap-3">
              <p className="font-bold">Outlet</p>
              <p>{topSectionData?.areaName}</p>
            </div>
            <div>
              <p className="font-bold">
                {topSectionData?.sla?.slaString?.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSectionRestaurentMenu;
