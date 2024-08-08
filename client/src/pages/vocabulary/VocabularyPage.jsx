import { React, useState } from "react";
import Searchbar from "../../components/Searchbar";
import Filterinterpreter from "../../components/FilterWordtype";

// Test Data
const headers = [
    { id:"d1",name: 'คำ' },
    { id:"d2",name: 'หมวดหมู่' },
    { id:"d3",name: 'ชนิดของคำ' },        
    { id:"d4",name: 'คำอธิบาย' },
    { id:"d5",name: 'จัดโดย' },
    { id:"d6",name: 'วันที่' },
]

const TestData = [
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "กหมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "จหมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "คหมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "ตหมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "ๅหมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "/หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
    { d1: "หมูปิ้ง", d2: "อาหารคาว", d3: "คำนาม", d4: "หมูเสียบไม้เเล้วนำไปย่าง", d5: "ล่ามโทรทัศน์", d6: "ล่ามโทรศัพท์", d7: "2-7-2024" },
]

export const Vocabulary = () => {
    const [data, setData] = useState(TestData);
    const [activeRowIndex, setActiveRowIndex] = useState(null);
    const [order, setOrder] = useState("ASC");

    const handleRowClick = (index) => {
        setActiveRowIndex(index);
    }

    const sorting = (col) => {
        if (order == 'ASC') {
            const sorted = [...data].sort((a, b) =>
                a[col].localeCompare(b[col],'th') ? 1 : -1
            );
            setData(sorted);
            setOrder("DSC");
        };
        if (order == 'DSC') {
            const sorted = [...data].sort((a, b) =>
                b[col].localeCompare(a[col],'th') ? 1 : -1
            );
            setData(sorted);
            setOrder("ASC");
        };
    }

    return (
        <>
            <div className="flex justify-center items-center mt-10 flex-col">
                {/* Will change to css afterward */}
                {/* <img className="w-[25.75rem]" src="../../../public/SignBloom3DLogo.png" /> */}
                {/* Delete This / and uncomment for the PNG Logo */}
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
                    <thead className="border-b-2">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="text-xs overflow-hidden not-italic font-semibold text-left py-3 px-4" onClick={() => sorting(header.id)}>
                                    {header.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Need to change algo after add sort */}
                        {data.slice(0, 20).map((Test, index) => (
                            <tr
                                key={index}
                                onClick={() => handleRowClick(index)}
                                className={`text-sm text-gray-600 border-b-2 cursor-pointer ${activeRowIndex === index ? 'bg-secondary-content' : 'hover:bg-gray-200'
                                    }`}
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
        </>
    );
};
