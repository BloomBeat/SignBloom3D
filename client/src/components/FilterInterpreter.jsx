import React from 'react'
import {useState} from React
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'

const interpreter = [
  {id: 1 ,name: 'ล่ามโทรทัศน์'},
  {id: 2 ,name: 'ล่ามทั่วไป'},
]

function FilterInterpr(){
  const [SelectInterpreter, setSelectInterpreter] = useState(interpreter[0])
  const [query, setQuery] = useState('')  
  const Filterinterpr =
    query == ''
      ? interpreter
      : interpreter.filter((interpreter) =>{
          return interpreter.name.toLowerCase().includes(query.toLowerCase())
      })
  
  return (
    <Combobox value={SelectInterpreter} onChange={setSelectInterpreter} onClose={() => setQuery('')}>
      <ComboboxInput
       aria-label='Assignee'
       displayValue={(interpreter)=> interpreter?.name}
       onChange={(event) => setQuery(event.target.value)}
       />
    <ComboboxOptions anchor="bottom" className="border empty:invisible" >
      {filteredinterpr.map((interpreter)=>(
        <ComboboxOption key={interpreter.id} value={interpreter} className="group flex gap-2 bg-white data-[focus]:bg-blue-100"> 
          <CheckIcon className="invisible size-5 group-data-[selected]:visible"/>
          {interpreter.name}
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  
    </Combobox>
  )
}

export default FilterInterpr;

//not fetch with backend yet