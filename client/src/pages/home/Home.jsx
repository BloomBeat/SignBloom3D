import { useState, useEffect } from "react";
import Navbaruser from '../../components/Navbaruser';
import FilterStatus from "../Admin/Component/FilterStatus";
import Filtercategory from "../../components/FilterCategory";
// client/src/components/Navbaruser.jsx
export const Home = () => {
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => setMessage(data.message));
  // }, []);
  // return <div className="mt-10 flex w-full flex-col">{message}</div>;
  return (
    <div>
      <Navbaruser></Navbaruser>
      <div>
        <FilterStatus></FilterStatus>
      </div>
    </div>
 
  )
};
