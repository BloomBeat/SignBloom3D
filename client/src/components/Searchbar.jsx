import { useState, useEffect, Fragment } from 'react'
import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

function SearchBar() {
  //hold search results
  const [searchResults, setSearchResults] = useState([]);
  //hold the selected item
  const [SelectedSearch, setSelectedSearch] = useState(null);
  //hold the search query
  const [query, setQuery] = useState('');
  
  //Fetch data from Backend
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
  }, []); // Empty dependency array ensures this runs only once

  const filteredsearch =
    query === ''
      ? searchResults
      : searchResults.filter((Search) => {
          return Search.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={SelectedSearch} onChange={setSelectedSearch}>
      <div className="relative w-full max-w-xs mx-auto">
      <Combobox.Input
        className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(Search) => Search.name}
        placeholder="ค้นหา..."
      />
      {filteredSearchResults.length > 0 && (
      <Combobox.Options className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
        {filteredsearch.map((Search) => (
          <Combobox.Option key={Search.id} value={Search} as={Fragment}>
            {({ active, selected }) => (
              <li
                  className={`cursor-pointer select-none relative py-2 pl-4 pr-4 ${
                  active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
              >
                {selected && 
                <CheckIcon className="w-5 h-5 inline-block mr-2"/>}
                {Search.name}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>)}
    </div>
    </Combobox>
    );
  }

export default SearchBar;