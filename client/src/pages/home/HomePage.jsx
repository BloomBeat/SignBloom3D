import { useState, useEffect } from "react";
// import Navbaruser from '../../components/Navbaruser';
import SearchBar from '../../components/Searchbar';
import CustomBtn from '../../components/Botton';

export const HomePage = () => {
  const [message, setMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]); // hold search results
  const [selectedSearch, setSelectedSearch] = useState(null); // hold the selected item
  const [query, setQuery] = useState(''); // hold the search query

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await api.get("/search"); // Replace with your API endpoint
        if (response.data.vocabularySuggestions.length() !== 0){
          setSearchResults(response.vocabularySuggestions);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchSearchResults();
  }, []);

  // Filter the search results based on the query
  const filteredSearchResults =
  query === ''
    ? searchResults
    : searchResults.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

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
