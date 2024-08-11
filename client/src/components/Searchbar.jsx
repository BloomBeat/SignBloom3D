import { Fragment } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

function SearchBar({
  selectedSearch,
  setSelectedSearch,
  setQuery,
  filteredSearchResults,
}) {

  return (
    <Combobox value={selectedSearch} onChange={setSelectedSearch}>
      <div className="relative w-full mx-auto">
        <Combobox.Input
          className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(item) => (item ? item.name : '')}
          placeholder="ค้นหา..."
        />
        {/* {filteredSearchResults.length > 0 && (
          <Combobox.Options className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {filteredSearchResults.map((item) => (
              <Combobox.Option key={item.id} value={item} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`cursor-pointer select-none relative py-2 pl-4 pr-4 ${active ? 'bg-blue-500 text-white' : 'bg-white text-black'
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
        )} */}
      </div>
    </Combobox>
  );
}

export default SearchBar;