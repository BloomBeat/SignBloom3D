import { useState, useEffect } from "react";
import Navbaruser from '../../components/Navbaruser';
import SearchBar from '../../components/Searchbar';
import BtnFind from '../../components/BtnFind';

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
    <div className="min-h-screen flex flex-col">
      <Navbaruser/>
      <div className="flex-grow flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <SearchBar />
          <BtnFind/>
        </div>
      </div>
    </div>
  )
};
