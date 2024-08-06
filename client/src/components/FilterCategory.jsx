import React from 'react'
import {useState} from React
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
//list category
const category = [
  {id: 1 ,name: 'อาหาร'},
  {id: 2 ,name: 'อวัยวะ'},
  {id: 3 ,name: 'สัตว์'},
  {id: 4 ,name: 'สภาพอากาศ'},
  {id: 5 ,name: 'ครอบครัว'},
]

function FilterCategory(){
  const [selectedCategory, setSelectedCategory] = useState(category[0])
  const [query, setQuery] = useState('')  
  const FilterCategory =
    query == ''
      ? category
      : category.filter((category) =>{
          return category.name.toLowerCase().includes(query.toLowerCase())
      })
  
  return (
    <Combobox value={selectedCategory} onChange={setSelectedCategory} onClose={() => setQuery('')}>
      <ComboboxInput
       aria-label='Assignee'
       displayValue={(category)=> category?.name}
       onChange={(event) => setQuery(event.target.value)}
       />
    <ComboboxOptions anchor="bottom" className="border empty:invisible" >
      {filteredCategory.map((category)=>(
        <ComboboxOption key={category.id} value={category} className="group flex gap-2 bg-white data-[focus]:bg-blue-100"> 
          <CheckIcon className="invisible size-5 group-data-[selected]:visible"/>
          {category.name}
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  
    </Combobox>
  )
}

export default FilterCategory;

//not fetch witd backend yet