import { useEffect, useState, useRef } from 'react';
import Searchbar from "./_components/Searchbar.jsx"; 
import FilterCategory from "../../components/FilterCategory";
import FilterWordtype from "../../components/FilterWordtype";
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import MyDropdown from "./_components/Dropdown.jsx";
import axios from 'axios';

export const Vocabulary = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [activeRowIndex, setActiveRowIndex] = useState(null);
    const [type, setType] = useState("ASC");
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState(null);
    const [wordtype, setWordtype] = useState(null);
    const [searchbar, setSearchbar] = useState("");
    const [loading, setLoading] = useState(false);
    const TableRef = useRef(null);
    const firstRender = useRef(true);
    const [hasMoreData, setHasMoreData] = useState(true);

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
                    find: searchbar || '',
                    category: category || '',
                    parts_of_speech: wordtype || '',
                    page: pageNum
                }
            });
    
            let results = Array.isArray(response.data.suggestions) ? response.data.suggestions : [];
    
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
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return; 
        }
        if(hasMoreData){
        fetchSearchResults(page);
        }
    }, [page, category, wordtype, searchbar ,hasMoreData]);

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

    useEffect(() => {
        setSearchResults([]); 
        setPage(1); 
        setHasMoreData(true);
    }, [category, wordtype, searchbar]);

    return (
        <div className="flex items-center flex-col h-[calc(100%-4rem)]">
            <div className="xl:text-[5rem] text-[4rem]  font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-base to-primary-content from-65% mt-10">
                SignBloom3D
            </div>

            <div className="flex flex-col justify-center items-center mt-14 lg:w-[57rem] w-3/4">
            <Searchbar setSearchbar={setSearchbar} />

                <div className="flex flex-row justify-between w-full mt-4 gap-4">
                    <FilterCategory setCategory={setCategory} />
                    <FilterWordtype setWordtype={setWordtype} />
                </div>
            </div>

            <div ref={TableRef} className="overflow-y-auto my-[4rem] w-10/12 flex flex-col items-center">
    <table className="w-full table-fixed">
        <thead className="border-b-2 text-xs overflow-hidden not-italic font-semibold text-left text-black">
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
            {
                searchResults.map((data, index) => (
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
                ))
            }
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
