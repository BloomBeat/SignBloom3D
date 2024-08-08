import React from 'react'
import {useState} from React
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'

const interpreters= [
  {id: 1 ,name: 'ล่ามโทรทัศน์'},
  {id: 2 ,name: 'ล่ามชุมชน'},
  {id: 3 ,name: 'คนหูดี'},
  {id: 4 ,name: 'คนหูตึง'},
  {id: 5 ,name: 'คนหูหนวก'},
]

function FilterInterpreter(){
  const [SelectInterpreter, setSelectInterpreter] = useState(interpreters[0])
  const [query, setQuery] = useState('')  
  const Filterinterpreter =
    query == ''
      ? interpreters
      : interpreters.filter((interpreters) =>{
          return interpreters.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <Combobox value={SelectInterpreter} onChange={setSelectInterpreter} onClose={() => setQuery('')}>
      <ComboboxInput
       aria-label='Assignee'
       displayValue={(interpreters)=> interpreters?.name}
       onChange={(event) => setQuery(event.target.value)}
       />
    <ComboboxOptions anchor="bottom" className="border empty:invisible" >
      {FilterInterpreter.map((interpreters)=>(
        <ComboboxOption key={interpreters.id} value={interpreters} className="group flex gap-2 bg-white data-[focus]:bg-blue-100"> 
          <CheckIcon className="invisible size-5 group-data-[selected]:visible"/>
          {interpreters.name}
        </ComboboxOption>
      ))}
    </ComboboxOptions>

    </Combobox>
  )
}

export default FilterInterpreter