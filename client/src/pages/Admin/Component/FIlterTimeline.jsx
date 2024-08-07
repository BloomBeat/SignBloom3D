import React from 'react'
import {useState} from React
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'

const time = [
  {id: 1 ,name: 'มกราคม'},
  {id: 2 ,name: 'กุมภาพันธ์'},
  {id: 3 ,name: 'มีนาคม'},
  {id: 4 ,name: 'เมษายน'},
  {id: 5 ,name: 'พฤษภาคม'},
  {id: 6 ,name: 'มิถุนายน'},
  {id: 7 ,name: 'กรกฎาคม'},
  {id: 8 ,name: 'สิงหาคม'},
  {id: 9 ,name: 'กันยายน'},
  {id: 10 ,name: 'ตุลาคม'},
  {id: 11 ,name: 'พฤศจิกายน'},
  {id: 12 ,name: 'ธันวาคม'},
]

function FilterTime(){
  const [SelectedTime, setSelectedTime] = useState(time[0])
  const [query, setQuery] = useState('')  
  const Filtertime =
    query == ''
      ? time
      : time.filter((time) =>{
          return time.name.toLowerCase().includes(query.toLowerCase())
      })
  
  return (
    <Combobox value={SelectedTime} onChange={setSelectedTime} onClose={() => setQuery('')}>
      <ComboboxInput
       aria-label='Assignee'
       displayValue={(time)=> time?.name}
       onChange={(event) => setQuery(event.target.value)}
       />
    <ComboboxOptions anchor="bottom" className="border empty:invisible" >
      {filteredtime.map((time)=>(
        <ComboboxOption key={time.id} value={time} className="group flex gap-2 bg-white data-[focus]:bg-blue-100"> 
          <CheckIcon className="invisible size-5 group-data-[selected]:visible"/>
          {time.name}
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  
    </Combobox>
  )
}

export default FilterTime;

//not fetch witd backend yet