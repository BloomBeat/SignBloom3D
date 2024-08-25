import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { MantineProvider } from '@mantine/core';
import { MonthPicker } from '@mantine/dates';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/th';

function FilterTime({value, setValue}) {
  const [showPicker, setShowPicker] = useState(false);
  const [prevValue, setPrevValue] = useState([null, null]);

  const handleClear = (event) => {
    event.stopPropagation();
    setValue([null, null]);
    setPrevValue([null, null]);
  };

  const handleChange = (newValue) => {
    if (newValue[0] && newValue[1]) {
      setValue([new Date(newValue[0]),new Date(newValue[1])]);
      setPrevValue(newValue);
      if (newValue[0] !== prevValue[0] || newValue[1] !== prevValue[1]) {
        setShowPicker(false);
      }
    } else {
      setPrevValue(newValue);
    }
  };



  return (
    <MantineProvider>
      <div className="w-full relative mt-1">
        <Listbox value={value} onChange={handleChange}>
          <div className="relative">
            <Listbox.Button
              className="h-10 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              onClick={() => setShowPicker(!showPicker)}
            >
              <span className="absolute flex justify-center px-1 text-xs bg-white top-0 translate-x-0 -translate-y-2 z-10 text-gray-500">เลือกช่วงเวลา</span>
              <span className="block truncate">
                {value[0] && value[1] ? `${value[0].toLocaleString('th', { month: 'long' })} ${value[0].getFullYear()} - ${value[1].toLocaleString('th', { month: 'long' })} ${value[1].getFullYear()}` : 'ไม่ได้ระบุ'}
              </span>
              {value[0] && value[1] && (
                <span onClick={handleClear} className="absolute inset-y-0 right-6 flex items-center pr-2 cursor-pointer">
                  <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              )}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              show={showPicker}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <MonthPicker
                className='absolute flex justify-center mt-1 py-2 z-10 w-full bg-white rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none'
                type="range"
                allowSingleDateInRange
                value={prevValue}
                onChange={handleChange}
                locale="th"
              />
            </Transition>
          </div>
        </Listbox>
      </div>
    </MantineProvider>
  );
}

export default FilterTime;
