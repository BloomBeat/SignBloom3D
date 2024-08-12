import React from "react";

const Navbaruser = () => {
    return (
      <nav className="bg-white shadow-md">
        <div className="px-12">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo */}
              {/* <img className="h-8 w-auto" src="./public/SignBloom3DLogo.png" alt="Logo" /> */}
              <div className="text-xl font-bold bg-gradient-to-r from-[#64558E_65.5%] to-[#EBDDFF_98.5%] bg-clip-text text-transparent">
                SignPose3D
              </div>
            </div>
  
            <div className="flex items-center">
              {/* Navigation Links */}
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">คำศัพท์</a>
                <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">สนับสนุน</a>
                <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">เกี่ยวกับเรา</a>
              </div>
  
              {/* Buttons */}
              <div className="ml-6 flex items-center">
                <button className="bg-primary-base text-primary-content hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium">ลงทะเบียน</button>
                <button className="ml-4 bg-secondary-base text-secondary-content  hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium">เข้าสู่ระบบ</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };

export default Navbaruser;


