import { useState, useEffect, useCallback } from "react";
import {debounce} from 'lodash';
import SearchBar from '../../components/Searchbar';
import CustomBtn from '../../components/Botton';

export const HomePage = () => {
  const [message, setMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState(null);
  const [query, setQuery] = useState('');

  // Debounced function to fetch search results
  const fetchSearchResults = useCallback(
    debounce(async (searchQuery) => {
      try {
        const response = await fetch(`/api/vocab/?find=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.suggestions);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setMessage('Failed to load search results');
      }
    }, 200), 
    []
  );
  
  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query, fetchSearchResults]);

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
            searchResults = {searchResults}
          />
          <CustomBtn label="ค้นหา"/>
        </div>
      </div>
    </div>
  )
};