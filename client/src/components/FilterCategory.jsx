import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid';

function FilterCategory({ setCategory }) {
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (category) => {
    setSelected(category);
    if (setCategory) {
      setCategory(category);
    }
  };

  const clearSelection = (event) => {
    event.stopPropagation();
    setSelected(null);
    setQuery('');
    if (setCategory) {
      setCategory(null);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, []);

  useEffect(() => {
    if (query === '') {
      setFilteredResults(searchResults);
    } else {
      setFilteredResults(
        searchResults.filter((item) =>
          item.category.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, searchResults]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/vocab/category');
      const results = Array.isArray(response.data) ? response.data : [];
      setSearchResults(results);
      setFilteredResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button className="h-10 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="absolute flex justify-center px-1 text-xs bg-white top-0 translate-x-0 -translate-y-2 z-10 text-gray-500">
              หมวดหมู่
            </span>
            <span className="block truncate">
              {selected ? selected : 'ไม่ได้ระบุ'}
            </span>
            {selected && (
              <span onClick={clearSelection} className="absolute inset-y-0 right-6 flex items-center pr-2 cursor-pointer">
                <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              <div className="relative px-3 py-2">
                <input
                  type="text"
                  className="w-full rounded-md border-2 border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ค้นหา..."
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              {loading ? (
                <div className="py-2 px-4 text-gray-500">Loading...</div>
              ) : filteredResults.length === 0 ? (
                <div className="py-2 px-4 text-gray-500">No results found</div>
              ) : (
                filteredResults.map((item, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`
                    }
                    value={item.category}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {item.category}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default FilterCategory;
