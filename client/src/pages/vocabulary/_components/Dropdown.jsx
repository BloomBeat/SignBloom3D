import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FunnelIcon } from '@heroicons/react/20/solid';

function MyDropdown({ sorting }) {
    return (
        <Menu>
            <Menu.Button className="flex flex-row h-full w-full justify-between py-3 px-4">
                คำ <FunnelIcon className="size-3 text-blue-500" />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute mt-7 right-0 w-12 divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button onClick={() => sorting("ASC")}
                                    className={`${active ? 'bg-primary-base text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    ก-ฮ
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button onClick={() => sorting("DSC")}
                                    className={`${active ? 'bg-primary-base text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    ฮ-ก
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default MyDropdown;
