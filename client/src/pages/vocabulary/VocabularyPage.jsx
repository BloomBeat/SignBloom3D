import { Fragment, useEffect, useState } from 'react';
import Searchbar from "../../components/Searchbar";
import FilterCategory from "../../components/FilterCategory";
import FilterInterpreter from "../../components/FilterInterpreter";
import FilterWordtype from "../../components/FilterWordtype";
import { FunnelIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from '@headlessui/react';
import axios from 'axios';

const convertThaiDateToGregorian = (thaiDate) => {
    const [day, month, yearBuddhist] = thaiDate.split('/').map(Number);
    const yearGregorian = yearBuddhist - 543;
    return new Date(yearGregorian, month - 1, day);
};

function MyDropdown({ sorting }) {
    return (
        <Menu>
            <Menu.Button className="flex flex-row h-full w-full justify-between">
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

export const Vocabulary = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [activeRowIndex, setActiveRowIndex] = useState(null);
    const [type, setType] = useState("ASC");

    const handleRowClick = (index) => {
        setActiveRowIndex(index);
    }

    const sorting = (order) => {
        const sorted = [...searchResults].sort((a, b) =>
            order === 'ASC'
                ? a.name.localeCompare(b.name, 'th')
                : b.name.localeCompare(a.name, 'th')
        );
        setSearchResults(sorted);
    }

    const sortingTime = () => {
        const sorted = [...searchResults].sort((a, b) =>
            type === 'ASC'
                ? convertThaiDateToGregorian(a.updated_at) - convertThaiDateToGregorian(b.updated_at)
                : convertThaiDateToGregorian(b.updated_at) - convertThaiDateToGregorian(a.updated_at)
        );
        setSearchResults(sorted);
        setType(prevType => prevType === 'ASC' ? 'DSC' : 'ASC');
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/vocab', {
                    params: {
                        find: '',
                        category: '',
                        parts_of_speech: ''
                    }
                });

                const results = Array.isArray(response.data.vocabularySuggestions) ? response.data.vocabularySuggestions : [];
                setSearchResults(results);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, []);

    return (
        <div className="flex justify-center items-center mt-10 flex-col">
            <div className="text-[5rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-base to-primary-content from-65%">
                SignBloom3D
            </div>

            <div className="flex flex-col justify-center items-center mt-14 lg:w-[57rem] w-3/4">
                <Searchbar />
                <div className="flex flex-row justify-between w-full mt-4">
                    <FilterWordtype />
                    <FilterWordtype />
                    <FilterWordtype />
                </div>
            </div>

            <table className="w-10/12 my-[4rem] table-fixed">
                <thead className="border-b-2 text-xs overflow-hidden not-italic font-semibold text-left">
                    <tr>
                        <th className="flex flex-row justify-between py-3 px-4 relative cursor-pointer">
                            <MyDropdown sorting={sorting} />
                        </th>
                        <th className="py-3 px-4">หมวดหมู่</th>
                        <th className="py-3 px-4">ชนิดของคำ</th>
                        <th className="py-3 px-4">คำอธิบาย</th>
                        <th className="py-3 px-4">จัดโดย</th>
                        <th onClick={sortingTime} className="flex flex-row justify-between py-3 px-4 cursor-pointer">
                            วันที่ <ArrowsUpDownIcon className='size-4 text-blue-500' />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.slice(0, 20).map((data, index) => (
                        <tr
                            key={index}
                            onClick={() => handleRowClick(index)}
                            className={`text-sm text-gray-600 border-b-2 cursor-pointer ${activeRowIndex === index ? 'bg-secondary-content' : 'hover:bg-gray-200'}`}
                        >
                            <td className="py-5 px-4 truncate">{data.name}</td>
                            <td className="py-5 px-4 truncate">{data.category}</td>
                            <td className="py-5 px-4 truncate">{data.parts_of_speech}</td>
                            <td className="py-5 px-4 truncate">{data.description}</td>
                            <td className="py-5 px-4 truncate">{data.author}</td>
                            <td className="py-5 px-4 truncate">{data.updated_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
