// import React from 'react'
// import { useState } from 'react'
// import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'

// const status = [
//   {id: 1 ,name: 'ตรวจสอบคำร้อง'},
//   {id: 2 ,name: 'กำลังแก้ไข'},
//   {id: 3 ,name: 'แก้ไขเสร็จสิ้น'},
// ] 

// function FilterStatus(){
//   const [SelectedStatus, setSelectedStatus] = useState(status[0])
//   const [query, setQuery] = useState('')  
//   const Filterstatus =
//     query == ''
//       ? status
//       : status.filter((status) =>{
//           return status.name.toLowerCase().includes(query.toLowerCase())
//       })
  
//   return (
//     <Combobox value={SelectedStatus} onChange={setSelectedStatus} onClose={() => setQuery('')}>
//       <div className="relative">
//         <ComboboxInput
//         aria-label='Assignee'
//         displayValue={(status)=> status?.name}
//         onChange={(event) => setQuery(event.target.value)}
//         className="w-full rounded-lg border-none bg-red-300 py-1.5 pr-8 pl-3 text-sm/6 text-red-300',
//               'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-red-300/25'
//             "
//         />
//       <ComboboxOptions anchor="bottom" className="'w-[var(--input-width)] rounded-xl border border-red-300 bg-red-300 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
//             'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'" >
//         {Filterstatus.map((status)=>(
//           <ComboboxOption key={status.id} value={status} 
//           className="w-full rounded-xl border border-red-300 bg-red-300 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
//             'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"> 
//             {/* <CheckIcon className="invisible size-5 group-data-[selected]:visible"/> */}
//             <div className="text-sm/6 text-red-300">
//               {status.name}
//               </div>
//           </ComboboxOption>
//         ))}
//       </ComboboxOptions>
    
//       </div>
//       </Combobox>
//   )
// }

// export default FilterStatus;

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const statuses = [
  {id: 1 ,name: 'ได้รับคำร้อง'},
  {id: 2 ,name: 'ตรวจสอบคำร้อง'},
  {id: 3 ,name: 'กำลังแก้ไข'},
  {id: 4 ,name: 'แก้ไขเสร็จสิ้น'},
]

export default function FillterStatus () {
  const [selected, setSelected] = useState(statuses
  [0])

  return (
    <div className="fixed top-16 w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Label>สถานะ</Listbox.Label>
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {statuses.map((status, statusIdx) => (
                <Listbox.Option
                  key={statusIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={status}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {status.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
