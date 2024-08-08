import { useState, useEffect } from "react";
import Navbaruser from '../../components/Navbaruser';
import Searchbar from '../../components/Searchbar'
import SearchBar from '../../components/Searchbar';
import Btn from '../../components/Botton';

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
      <Navbaruser/>
      <Searchbar/>
      <div className="flex-grow flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <SearchBar />
          <CustomBtn/>
        </div>
      </div>
    </div>
 
  )
};