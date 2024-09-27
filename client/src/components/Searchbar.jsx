import { Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
function SearchBar({
  selectedSearch,
  setSelectedSearch,
  setQuery,
  searchResults,
}) {

  return (
    <div className="">
    <Combobox value={selectedSearch} onChange={setSelectedSearch}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default  text-left outline-none sm:text-sm">
          <Combobox.Input
            className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            onChange={(search) => setQuery(search.target.value)}
            displayValue={(vocab) => (vocab ? vocab.name : '')}
            placeholder="ค้นหา..."
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {searchResults.length === 0 ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              searchResults.map((item) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                         {item.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  </div>
  );
}

{/* <Combobox value={selectedSearch} onChange={setSelectedSearch}> 
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
    </Combobox> */}

export default SearchBar;