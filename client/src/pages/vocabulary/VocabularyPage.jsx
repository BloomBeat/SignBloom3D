import { Fragment, useEffect, useState, useRef } from 'react';
import Searchbar from "../../components/Searchbar"; 
import FilterCategory from "../../components/FilterCategory";
import FilterInterpreter from "../../components/FilterInterpreter";
import FilterWordtype from "../../components/FilterWordtype";
import { FunnelIcon, ArrowsUpDownIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from '@headlessui/react';
import axios from 'axios';

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

export const Vocabulary = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [activeRowIndex, setActiveRowIndex] = useState(null);
    const [type, setType] = useState("ASC");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const TableRef = useRef(null);
    const firstRender = useRef(true);

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
        const sorted = [...searchResults].sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);
    
            return type === 'ASC' ? dateA - dateB : dateB - dateA;
        });
    
        setSearchResults(sorted);
        setType(prevType => prevType === 'ASC' ? 'DSC' : 'ASC');
    };
    

    const fetchSearchResults = async (pageNum) => {
        if (loading) return; 
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/vocab', {
                params: {
                    find: '',
                    category: '',
                    parts_of_speech: '',
                    page: pageNum
                }
            });
    
            let results = Array.isArray(response.data.suggestions) ? response.data.suggestions : [];
    
            results = results.map(item => ({
                ...item,
                updated_at: new Date(item.updated_at).toISOString().split('T')[0]
            }));
    
            setSearchResults(prevResults => [...prevResults, ...results]);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return; 
        }

        fetchSearchResults(page);
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (TableRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = TableRef.current;
                if (scrollTop + clientHeight >= scrollHeight - 5) {
                    setPage(prevPage => prevPage + 1);
                }
            }
        };

        const container = TableRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="flex items-center flex-col h-[calc(100%-4rem)]">
            <div className="xl:text-[5rem] text-[4rem]  font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-base to-primary-content from-65% mt-10">
                SignBloom3D
            </div>

            <div className="flex flex-col justify-center items-center mt-14 lg:w-[57rem] w-3/4">
                <Searchbar />
                <div className="flex flex-row justify-between w-full mt-4">
                    <FilterWordtype />
                    <FilterWordtype />
                    <FilterInterpreter />
                </div>
            </div>

            <div ref={TableRef} className="overflow-y-auto my-[4rem] w-10/12 flex flex-col items-center">
                <table className="w-full table-fixed">
                    <thead className="border-b-2 text-xs overflow-hidden not-italic font-semibold text-left">
                        <tr>
                            <th className="sticky top-0 bg-white">
                                <div className='relative flex flex-row justify-between w-full'>
                                    <MyDropdown sorting={sorting} />
                                </div>
                            </th>
                            <th className="py-3 px-4 sticky top-0 bg-white">หมวดหมู่</th>
                            <th className="py-3 px-4 sticky top-0 bg-white">ชนิดของคำ</th>
                            <th className="py-3 px-4 sticky top-0 bg-white">คำอธิบาย</th>
                            <th className="py-3 px-4 sticky top-0 bg-white">จัดโดย</th>
                            <th onClick={sortingTime} className="py-3 px-4 cursor-pointer sticky top-0 bg-white">
                                <div className='flex flex-row justify-between w-full'>
                                    วันที่ <ArrowsUpDownIcon className='size-4 text-blue-500' />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((data, index) => (
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
                {loading && <p className="text-center py-4">Loading...</p>}
            </div>
        </div>
    );
};
