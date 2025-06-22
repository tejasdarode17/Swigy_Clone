import RestaurentCard from "./RestaurentCard";
import { useContext, useState ,useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { filtredContext } from "../../Utils/Context";
const MainCards = ({ cardsData, title }) => {

  const [active, setactive] = useState()
  const { setFilterValue} = useContext(filtredContext)


  const filterOptions = [
    { label: "Fast Delivery" },
    { label: "Ratings 4.0+" },
    { label: "Pure Veg" },
    { label: "Less than Rs. 300" },
    { label: "Rs. 300 to Rs. 600" }
  ];

  function handelActive(label) {
    setactive(active === label ? null : label)
  }
  

  useEffect(() => {
    setFilterValue(active);
  }, [active]);
  

  return (
    <div>
      <div className="my-5 font-extrabold text-xl">
        <h1>{title}</h1>
      </div>

      {
        <div className="flex gap-2 mt-5 mb-10">
          {
            filterOptions.map((item , i) => (
              <button key={i} onClick={() => handelActive(item.label)} className={"p-2 border rounded-2xl cursor-pointer flex items-center gap-2 " + (active === item.label ? "active" : "null")} >
                {item.label}
                <p className="hidden">
                  <ImCancelCircle />
                </p>
              </button>
            ))
          }
        </div>
      }


      <div className="grid grid-cols-4 gap-5">
        {(cardsData || []).map(({ info, cta: { link } }, i) => (
          <div
            className="cursor-pointer hover:scale-90 duration-100"
            key={`${info.id}-${i}`}
          >
            <RestaurentCard {...info} link={link} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCards;
