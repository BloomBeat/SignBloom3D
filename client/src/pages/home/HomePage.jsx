import { useState, useEffect, useCallback } from "react"; //manage state, side effect, memorized callback
import {debounce} from 'lodash'; //delays
import SearchBar from '../../components/Searchbar';
import CustomBtn from '../../components/Botton';

export const HomePage = () => { //define function HomPage
  const [searchResults, setSearchResults] = useState([]); 
  const [selectedSearch, setSelectedSearch] = useState(null);
  const [query, setQuery] = useState('')

  // Debounced function to fetch search results
  const fetchSearchResults = useCallback(
    debounce(async (searchQuery) => {
      try {
        const response = await fetch(`/api/vocab/?find=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.suggestions);
      } catch (error) {
        console.error('Error fetching search results:', error);
       
      }
    }, 200), //not sending too many API
    []
  );
  
  useEffect(() => {
      fetchSearchResults(query);
      console.log
  }, [query]);

  // Filter the search results based on the query
  const filteredSearchResults =
    query === ''
    // 20 =='20':true
    // 20 ==='20':false
      ? searchResults
      : searchResults.filter((item) => //check(filter) item[] is in db 
        item.name.toLowerCase().includes(query.toLowerCase())//check name in item[]. Is it in db
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
            searchResults = {searchResults}
          />
          <CustomBtn label="ค้นหา"/>
        </div>
      </div>
    </div>
  )
};