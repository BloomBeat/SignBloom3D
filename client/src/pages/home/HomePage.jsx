import { useState, useEffect } from "react";
// import Navbaruser from '../../components/Navbaruser';
import SearchBar from '../../components/Searchbar';
import CustomBtn from '../../components/Botton';

// client/src/components/Navbaruser.jsx
export const Home = () => {
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => setMessage(data.message));
  // }, []);
  // return <div className="mt-10 flex w-full flex-col">{message}</div>;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch('/api/search'); // Replace with your API endpoint
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchSearchResults();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbaruser/> */}

      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center space-y-10">
          <img src="/SignBloom3DLogo.png" alt="Public Image" className="w-max h-max object-cover" />
          
          {/* Flex container for SearchBar and Button */}
          <div className="flex items-center space-x-4">
            <SearchBar />
            <CustomBtn label="ค้นหา"/>
          </div>
        </div>
      </div>
    </div>
 
  )
};
