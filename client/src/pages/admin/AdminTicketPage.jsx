import { useEffect, useState, useRef } from 'react';
import Searchbar from "../vocabulary/_components/Searchbar";
import FilterStatus from "./components/FilterStatus";
import FilterTime from "./components/FilterTime";
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import MyDropdown from "../vocabulary/_components/Dropdown";
import api from "../../hooks/api"

export const AdminTicketPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [activeRowIndex, setActiveRowIndex] = useState(null);
    const [type, setType] = useState("ASC");
    const [page, setPage] = useState(1);
    const [searchbar, setSearchbar] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [value, setValue] = useState([null, null]);
    const TableRef = useRef(null);
    const firstRender = useRef(true);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);

    const handleRowClick = (index) => setActiveRowIndex(index);

    const sorting = (order) => {
        const sorted = [...searchResults].sort((a, b) =>
            order === 'ASC'
                ? a.vocabulary.localeCompare(b.vocabulary, 'th')
                : b.vocabulary.localeCompare(a.vocabulary, 'th')
        );
        setSearchResults(sorted);
    };

    const formatPeriod = (value) => {
        if (!value || value.length !== 2 || !value[0] || !value[1]) {
            return '';
        }
        const startPeriod = `${value[0].getFullYear()},${(value[0].getMonth() + 1).toString().padStart(2, '0')}`;
        const endPeriod = `${value[1].getFullYear()},${(value[1].getMonth() + 1).toString().padStart(2, '0')}`;

        return `${startPeriod},${endPeriod}`;
    };

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
            const period = formatPeriod(value);
            const response = await api.get('ticket', {
                params: {
                    find: searchbar || '',
                    status: status || '',
                    period: period || '',
                    page: pageNum
                }
            });
            let results = Array.isArray(response.data.tickets) ? response.data.tickets : [];
            setHasMoreData(results.length > 0);
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

    const getStatusDiv = (status) => {
        switch (status) {
            case 'open':
                return (
                    <div className="w-fit h-fit px-4 py-2 rounded-md bg-green-100 text-green-800">
                        ได้รับ
                    </div>
                );
            case 'in progress':
                return (
                    <div className="w-fit h-fit px-4 py-2 rounded-md bg-blue-100 text-blue-800">
                        เเก้ไข
                    </div>
                );
            case 'closed':
                return (
                    <div className="w-fit h-fit px-4 py-2 rounded-md bg-purple-100 text-purple-800">
                        เสร็จสิ้น
                    </div>
                );
            case 'on hold':
                return (
                    <div className="w-fit h-fit px-4 py-2 rounded-md bg-amber-100 text-amber-800">
                        ตรวจสอบ
                    </div>
                );
            case 'canceled':
                return (
                    <div className="w-fit h-fit px-4 py-2 rounded-md bg-red-100 text-red-800">
                        ปฎิเสธ
                    </div>
                );
            default:
                return (
                    <div className="w-fit h-fit px-4 py-2 rounded-md bg-gray-100 text-gray-600">
                        ไม่ทราบ
                    </div>
                );
        }
    };

    useEffect(() => {
            if (firstRender.current) {
                firstRender.current = false;
                return;
            }
            if (hasMoreData) {
                fetchSearchResults(page);
            }
    }, [page, initialLoadComplete, hasMoreData]);

    useEffect(() => {
        setSearchResults([]);
        setPage(1);
        setHasMoreData(true);
        setInitialLoadComplete(!initialLoadComplete)
    }, [searchbar, status, value]);

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
            <div className="xl:text-[5rem] text-[4rem] text-primary-base font-bold text-pri mt-10">
                ปัญหาที่พบ
            </div>

            <div className="flex flex-col justify-center items-center mt-14 lg:w-[57rem] w-3/4">
                <Searchbar setSearchbar={setSearchbar} />
                <div className="flex flex-row justify-between w-full mt-4 gap-4">
                    <FilterStatus setStatus={setStatus} />
                    <FilterTime value={value} setValue={setValue} />
                </div>
            </div>

            <div ref={TableRef} className="overflow-y-auto my-[4rem] w-10/12 flex flex-col items-center">
                <table className="w-full table-fixed">
                    <thead className="border-b-2 text-xs overflow-hidden not-italic font-semibold text-left">
                        <tr>
                            <th className="py-3 px-4 sticky top-0 bg-white">หัวข้อ</th>
                            <th className="sticky top-0 bg-white">
                                <div className='relative flex flex-row justify-between w-full'>
                                    <MyDropdown sorting={sorting} />
                                </div>
                            </th>
                            <th className="py-3 px-4 sticky top-0 bg-white">หมวดหมู่</th>
                            <th className="py-3 px-4 sticky top-0 bg-white">ชนิดของคำ</th>
                            <th className="py-3 px-4 sticky top-0 bg-white">รายล    ะเอียด</th>
                            <th className="py-3 px-4 sticky top-0 bg-white">สถานะ</th>
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
                                <td className="py-5 px-4 truncate">{data.title}</td>
                                <td className="py-5 px-4 truncate">{data.vocabulary}</td>
                                <td className="py-5 px-4 truncate">{data.category}</td>
                                <td className="py-5 px-4 truncate">{data.parts_of_speech}</td>
                                <td className="py-5 px-4 truncate">{data.description}</td>
                                <td className="py-3 px-4 truncate text-center">
                                    {getStatusDiv(data.status)}
                                </td>
                                <td className="py-5 px-4 truncate">{data.updated_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <p className="text-center py-8">Loading...</p>}
                {!hasMoreData && !loading && (
                    <p className="text-center py-8 text-gray-500">No more data available</p>
                )}
            </div>
        </div>
    );
};
