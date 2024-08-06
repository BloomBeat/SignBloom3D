import React from 'react'
import {useState} from React
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'

const interpr = [
  {id: 1 ,name: 'ล่ามโทรทัศน์'},
  {id: 2 ,name: 'ล่ามทั่วไป'},
]

function FilterInterpr(){
  const [SelectedInterpr, setSelectedInterpr] = useState(interpr[0])
  const [query, setQuery] = useState('')  
  const Filterinterpr =
    query == ''
      ? interpr
      : interpr.filter((interpr) =>{
          return interpr.name.toLowerCase().includes(query.toLowerCase())
      })
  
  return (
    <Combobox value={SelectedInterpr} onChange={setSelectedInterpr} onClose={() => setQuery('')}>
      <ComboboxInput
       aria-label='Assignee'
       displayValue={(interpr)=> interpr?.name}
       onChange={(event) => setQuery(event.target.value)}
       />
    <ComboboxOptions anchor="bottom" className="border empty:invisible" >
      {filteredinterpr.map((interpr)=>(
        <ComboboxOption key={interpr.id} value={interpr} className="group flex gap-2 bg-white data-[focus]:bg-blue-100"> 
          <CheckIcon className="invisible size-5 group-data-[selected]:visible"/>
          {interpr.name}
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  
    </Combobox>
  )
}

export default FilterInterpr;

//not fetch witd backend yet