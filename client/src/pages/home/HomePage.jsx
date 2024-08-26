import { useState, useEffect } from "react";
import SearchBar from '../../components/Searchbar';
import CustomBtn from '../../components/Botton';
import api from '../../hooks/api';
import axios from "axios";

export const Home = () => {
  const [message, setMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]); // hold search results
  const [selectedSearch, setSelectedSearch] = useState(null); // hold the selected item
  const [query, setQuery] = useState(''); // hold the search query

    // Fetch search results from the API when the component mounts or query changes
    useEffect(() => {
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(`/api/vocab/?find=${query}`);
          const data = await response.json();
          setSearchResults(data.suggestions); // Assuming 'results' is the array of search results
        } catch (error) {
          console.error('Error fetching search results:', error);
          setMessage('Failed to load search results');
          
        }
        console.log(searchResults);
      };
  
      if (query) {
        fetchSearchResults();
      }
    }, [query]);

  // Filter the search results based on the query
  const filteredSearchResults =
  query === ''
    ? searchResults
    : searchResults.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <div className="h-4/5 flex flex-col items-center justify-center">

          {/* Image */}
          {/* <img src="/SignBloom3DLogo.png" alt="Public Image" /> */}
          <div className="flex flex-col justify-center items-center">
            <div className="xl:text-[5rem] text-[4rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-base to-primary-content from-65%">
                SignBloom3D
            </div>

          {/* Flex container for SearchBar and Button */}
            <div className="flex items-center mt-10 gap-4 lg:w-[50rem] w-3/4">
            <SearchBar
            selectedSearch={selectedSearch}
            setSelectedSearch={setSelectedSearch}
            setQuery={setQuery}
            filteredSearchResults={filteredSearchResults}
            />
            <CustomBtn label="ค้นหา"/>
          </div>
        </div>
    </div>
  )
};