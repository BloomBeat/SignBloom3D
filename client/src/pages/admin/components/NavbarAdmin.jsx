import React from "react";
import { FaRegUserCircle } from "react-icons/fa";


const AdminButton = () => {
  return (
    <div className="flex items-center space-x-2">
      <button className="flex items-center bg-primary-base text-primary-content hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium">
        <span className="mr-2">ผู้ดูแลระบบ</span>
        <FaRegUserCircle className="text-primary-content text-lg" />
      </button>
    </div>
  );
};


const NavbarAdmin = () => {
    
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo */}
              {/* <img className="h-8 w-auto" src="./public/SignBloom3DLogo.png" alt="Logo" /> */}
              <div className="text-xl font-bold bg-gradient-to-r from-[#64558E_65.5%] to-[#EBDDFF_98.5%] bg-clip-text text-transparent">
                SignPose3D
              </div>
            </div>
            {/* This empty div keeps the space in the middle */}
            <div className="flex-grow"></div>
  
            <div className="flex items-center">
              {/* Navigation Links */}
              <div className="hidden md:ml-6 md:flex ">
                <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">คำร้อง</a>
                <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">ยืนยันท่า</a>
                <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">ประวัติผู้ใช้</a>
              </div>
  
              {/* Buttons */}
              <div className="ml-6 flex items-center">

                <AdminButton/>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };

export default NavbarAdmin;

