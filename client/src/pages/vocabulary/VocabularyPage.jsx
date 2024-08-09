import { Fragment, useEffect, useRef, useState } from 'react';
import Searchbar from "../../components/Searchbar";
import Filterinterpreter from "../../components/FilterWordtype";
import { FunnelIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from '@headlessui/react';

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

const TestData = [
    { d1: "กกหมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "กหมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "จหมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "คหมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "กกหมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "ๅหมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "/หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "กกหมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "2-7-2024" },
]

export const Vocabulary = () => {
    const [data, setData] = useState(TestData);
    const [activeRowIndex, setActiveRowIndex] = useState(null);
    
    // For Time sort -> yang mai dai tum 
    const [orderT, setOrderT] = useState("ASC");

    const handleRowClick = (index) => {
        setActiveRowIndex(index);
    }

    const sorting = (order) => {
        if (order === 'ASC') {
            const sorted = [...data].sort((a, b) =>
                a.d1.localeCompare(b.d1, 'th')
            );
            setData(sorted);
        } else if (order === 'DSC') {
            const sorted = [...data].sort((a, b) =>
                b.d1.localeCompare(a.d1, 'th')
            );
            setData(sorted);
        }
    }

    // Yang mai dai tum -> 
    const sortTime = () => {
            
    }

    return (
        <div className="flex justify-center items-center mt-10 flex-col">
            <div className="text-[5rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-base to-primary-content from-65%">
                SignBloom3D
            </div>

            <div className="flex flex-col justify-center items-center mt-14 lg:w-[57rem] w-3/4">
                <Searchbar />
                <div className="flex flex-row justify-between w-full">
                    <Filterinterpreter />
                    <Filterinterpreter />
                    <Filterinterpreter />
                </div>
            </div>

            <table className="table-auto w-10/12 my-[4.5rem]">
                <thead className="border-b-2 text-xs overflow-hidden not-italic font-semibold text-left">
                    <tr>
                        <th className="flex flex-row justify-between py-3 px-4 relative cursor-pointer">
                            <MyDropdown sorting={sorting} />
                        </th>
                        <th className="py-3 px-4">หมวดหมู่</th>
                        <th className="py-3 px-4">ชนิดของคำ</th>
                        <th className="py-3 px-4">คำอธิบาย</th>
                        <th className="py-3 px-4">จัดโดย</th>
                        <th className="flex flex-row justify-between py-3 px-4 cursor-pointer">
                            วันที่ <ArrowsUpDownIcon className='size-4 text-blue-500' />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(0, 20).map((Test, index) => (
                        <tr
                            key={index}
                            onClick={() => handleRowClick(index)}
                            className={`text-sm text-gray-600 border-b-2 cursor-pointer ${activeRowIndex === index ? 'bg-secondary-content' : 'hover:bg-gray-200'}`}
                        >
                            <td className="py-5 px-4">{Test.d1}</td>
                            <td className="py-5 px-4">{Test.d5}</td>
                            <td className="py-5 px-4">{Test.d3}</td>
                            <td className="py-5 px-4">{Test.d4}</td>
                            <td className="py-5 px-4">{Test.d5}</td>
                            <td className="py-5 px-4">{Test.d6}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
