import { useState } from 'react'
import { Combobox } from '@headlessui/react'

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
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options>
        {filteredPeople.map((person) => (
          <Combobox.Option key={person} value={person}>
            {person}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}