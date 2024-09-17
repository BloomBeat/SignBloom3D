import { useState, useEffect, Fragment } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

function SearchBarAdmin() {
  const [searchResults, setSearchResults] = useState([]); // hold search results
  const [selectedSearch, setSelectedSearch] = useState(null); // hold the selected item
  const [query, setQuery] = useState(''); // hold the search query

  // Fetch data from backend
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/vocab', {
          params: {
            find: 'ตา',
            category: 'ร่างกายภายนอก',
            parts_of_speech: 'คำนาม'
          }
        });
        setSearchResults(response.data);
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

  return (
    <Combobox value={selectedSearch} onChange={setSelectedSearch}>
      <div className="relative w-full mx-auto">
        <Combobox.Input
          className="w-full h-4 py-2 pl-3 pr-10 text-sm text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(item) => (item ? item.name : '')}
          placeholder="ค้นหา..."
        />
        {filteredSearchResults.length > 0 && (
          <Combobox.Options className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {filteredSearchResults.map((item) => (
              <Combobox.Option key={item.id} value={item} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`cursor-pointer select-none relative py-2 pl-4 pr-4 ${
                      active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                    }`}
                  >
                    {selected && (
                      <CheckIcon className="w-5 h-5 inline-block mr-2" />
                    )}
                    {item.name}
                  </li>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}

export default SearchBarAdmin;