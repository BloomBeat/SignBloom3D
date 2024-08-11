import { React , useState } from 'react'
import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

const interpreters= [
  {id: 1 ,name: 'ล่ามหูดี'},
  {id: 2 ,name: 'ล่ามหูหนวก'},
  {id: 3 ,name: 'ล่ามหูตึง'},
]

function FilterInterpreter(){
  const [selectInterpreter, setSelectInterpreter] = useState(interpreters[0])
  const [query, setQuery] = useState('')  
  const Filterinterpreter =
    query == ''
      ? interpreters
      : interpreters.filter((interpreters) =>{
          return interpreters.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <Combobox value={selectInterpreter} onChange={setSelectInterpreter} onClose={() => setQuery('')}>
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