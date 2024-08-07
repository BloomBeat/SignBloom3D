import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const category =[
//backend
]

function FilterCategory() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [query, setQuery] = useState('')

  const filteredCategory =
    query === ''
      ? categories
      : categories.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <ComboboxInput onChange={(event) => setQuery(event.target.value)} />
      <ComboboxOptions>
        {filteredPeople.map((person) => (
          <ComboboxOption key={person} value={person}>
            {person}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
}

export default FilterCategory;