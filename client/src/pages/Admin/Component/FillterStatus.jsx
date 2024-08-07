import React from 'react'
import { useState } from 'react'
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
      <div className="relative">
        <ComboboxInput
        aria-label='Assignee'
        displayValue={(status)=> status?.name}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full rounded-lg border-none bg-red-300 py-1.5 pr-8 pl-3 text-sm/6 text-red-300',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-red-300/25'
            "
        />
      <ComboboxOptions anchor="bottom" className="'w-[var(--input-width)] rounded-xl border border-red-300 bg-red-300 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'" >
        {Filterstatus.map((status)=>(
          <ComboboxOption key={status.id} value={status} 
          className="w-full rounded-xl border border-red-300 bg-red-300 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"> 
            {/* <CheckIcon className="invisible size-5 group-data-[selected]:visible"/> */}
            <div className="text-sm/6 text-red-300">
              {status.name}
              </div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    
      </div>
      </Combobox>
  )
}

export default FilterStatus;