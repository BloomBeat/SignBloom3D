import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid';

const statuses = [
  { id: 1, name: 'Open', th: 'ได้รับคำร้อง'},
  { id: 2, name: 'Closed', th: 'เเก้ไขคำร้องเสร็จสิ้น'},
  { id: 3, name: 'In Progress', th: 'เเก้ไขคำร้อง'},
  { id: 4, name: 'On hold', th: 'ตรวจสอบคำร้อง'},
  { id: 5, name: 'Canceled', th: 'ปฎิเสธคำร้อง'},
];

function FilterStatus({ setStatus }) {
  const [selected, setSelected] = useState(null);

  const handleChange = (status) => {
    setSelected(status);
      if (setStatus) {
        setStatus(status.name.toLowerCase());
      }
  };
  

  const clearSelection = (event) => {
    event.stopPropagation();
    setSelected(null);
    if (setStatus) {
      setStatus(null);
    }
  };

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button className="h-10 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="absolute flex justify-center px-1 text-xs bg-white top-0 translate-x-0 -translate-y-2 z-10 text-gray-500">สถานะคำร้อง</span>
            <span className="block truncate">{selected ? selected.th : 'ไม่ได้ระบุ'}</span>
            {selected && (
              <span onClick={clearSelection} className="absolute inset-y-0 right-6 flex items-center pr-2 cursor-pointer">
                <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {statuses.map((status) => (
                <Listbox.Option
                  key={status.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`
                  }
                  value={status}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {status.th}
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
  );
}

export default FilterStatus;
