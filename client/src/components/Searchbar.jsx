import { useState, Fragment } from 'react'
import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

const search = [
 //connect with backend
]

function SearchBar() {
  const [SelectedSearch, setSelectedSearch] = useState(search[0])
  const [query, setQuery] = useState('')

  const filteredsearch =
    query === ''
      ? search
      : search.filter((Search) => {
          return Search.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={SelectedSearch} onChange={setSelectedSearch}>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(Search) => Search.name}
      />
      <Combobox.Options>
        {filteredsearch.map((Search) => (
          <Combobox.Option key={Search.id} value={Search} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`${
                  active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
              >
                {selected && <CheckIcon />}
                {Search.name}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}