import React from 'react'
import {useState} from React
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'

const WordType = [
  {id: 1 ,name: 'คำนาม(น)'},
  {id: 2 ,name: 'คำกริยา(ก)'},
  {id: 3 ,name: 'คำสรรพนาม(ส)'},
  {id: 4 ,name: 'คำวิเศษ(ว)'},
]

function FilterWordType(){
  const [SelectedWordType, setSelectedWordType] = useState(WordType[0])
  const [query, setQuery] = useState('')  
  const FilterWordType =
    query == ''
      ? WordType
      : WordType.filter((WordType) =>{
          return WordType.name.toLowerCase().includes(query.toLowerCase())
      })
  
  return (
    <Combobox value={SelectedWordType} onChange={setSelectedWordType} onClose={() => setQuery('')}>
      <ComboboxInput
       aria-label='Assignee'
       displayValue={(WordType)=> WordType?.name}
       onChange={(event) => setQuery(event.target.value)}
       />
    <ComboboxOptions anchor="bottom" className="border empty:invisible" >
      {filteredWordType.map((WordType)=>(
        <ComboboxOption key={WordType.id} value={WordType} className="group flex gap-2 bg-white data-[focus]:bg-blue-100"> 
          <CheckIcon className="invisible size-5 group-data-[selected]:visible"/>
          {WordType.name}
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  
    </Combobox>
  )
}

export default FilterWordType;

//not fetch witd backend yet