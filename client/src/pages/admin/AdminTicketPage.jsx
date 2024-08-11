import React from "react";
import Searchbar from "../../components/Searchbar";
import FilterTime from "./components/FilterTime";
import FilterStatus from "./components/FilterStatus";
import SelectStatus from "./components/SelectStatus";

export const AdminTicketPage = () => {
    return (
        <div className="flex flex-col items-center mt-10 space-y-8">
            <div className="text-5xl font-bold text-primary-base">
                ปัญหาที่พบ
            </div>
            <div className="w-full lg:w-[57rem] space-y-5">
                <Searchbar />
                <div className="flex justify-between space-x-4">
                    <FilterStatus />
                   <FilterTime/>
                </div>
            </div>
            <div className="w-full overflow-visible">
                <table className="table-auto w-full ">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr className="bg-white justify-start items-center gap-2 font-bold">
                            <th >คำ</th>
                            <th >หมวดหมู่</th>
                            <th >ชนิดของคำ</th>
                            <th >รายละเอียด</th>
                            <th >สถานะ</th>
                            <th >วันที่</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border px-4 py-2 font-normal">
                            <th>หมูปิ้ง</th>
                            <th>อาหารคาว</th>
                            <th>คำนาม</th>
                            <th>นิ้วโป้งกลืนลงไปกับมือ</th>
                            <th >
                                <SelectStatus/>
                            </th> 
                            <th> 2/7/2567</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
