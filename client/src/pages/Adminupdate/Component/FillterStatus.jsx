import React from 'react'
import {useState} from React
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'

const status = [
  {id: 1 ,name: 'ตรวจสอบคำร้อง'},
  {id: 2 ,name: 'กำลังแก้ไข'},
  {id: 3 ,name: 'แก้ไขเสร็จสิ้น'},
]

function FilterStatus(){
  const [SelectedStatus, setSelectedStatus] = useState(status[0])
  const [query, setQuery] = useState('')  
  const Filterstatus =
    query == ''
      ? status
      : status.filter((status) =>{
          return status.name.toLowerCase().includes(query.toLowerCase())
      })
  
  return (
    <Combobox value={SelectedStatus} onChange={setSelectedStatus} onClose={() => setQuery('')}>
      <ComboboxInput
       aria-label='Assignee'
       displayValue={(status)=> status?.name}
       onChange={(event) => setQuery(event.target.value)}
       />
    <ComboboxOptions anchor="bottom" className="border empty:invisible" >
      {filteredstatus.map((status)=>(
        <ComboboxOption key={status.id} value={status} className="group flex gap-2 bg-white data-[focus]:bg-blue-100"> 
          <CheckIcon className="invisible size-5 group-data-[selected]:visible"/>
          {status.name}
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  
    </Combobox>
  )
}

export default FilterStatus;