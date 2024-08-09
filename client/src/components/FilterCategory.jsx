
import { useState } from 'react'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'


const categories = [
  //fetch from backend
]

function MyCombobox() {
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