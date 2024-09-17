import { Combobox } from '@headlessui/react';

function SearchBar({
  selectedSearch,
  setSelectedSearch,
  setQuery,
  searchResults,
}) {

  return (
    <Combobox value={selectedSearch} onChange={setSelectedSearch}> 
      <div className="relative w-full mx-auto">
        <Combobox.Input
          className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          onChange={(search) => setQuery(search.target.value)}
          displayValue={(vocab) => (vocab ? vocab.name : '')}
          placeholder="ค้นหา..."
        />
        <Combobox.Options>
          {searchResults.map((item) => (
            <Combobox.Option key={item} value={item}>
              {item.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}

export default SearchBar;