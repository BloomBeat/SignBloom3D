import React from "react";
import {Link} from "react-router-dom";
import { HomeIcon } from "@heroicons/react/20/solid"; 

const Navbaruser = () => {
    return (
      <nav className="bg-white shadow-md">
        <div className="px-12">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo */}
              {/* <img className="h-8 w-auto" src="./public/SignBloom3DLogo.png" alt="Logo" /> */}
              <Link to="/">
                <HomeIcon className='size-5 text-primary-500'/>
              </Link>
            </div>
  
            <div className="flex items-center">
              {/* Navigation Links */}
              <div className="md:ml-6 md:flex md:space-x-8 text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium ">
                <Link to="/vocabulary">คำศัพท์</Link>
                <Link to="/support" >สนับสนุน</Link>
                <Link to="/aboutus">เกี่ยวกับเรา</Link>
              </div>
  
              {/* Buttons */}
              <div className="ml-6 flex items-center">
                <Link to="/register">
                  <button className="bg-primary-base text-primary-content hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium">ลงทะเบียน</button>
                </Link>
                <Link to="/login">
                  <button className="ml-4 bg-secondary-base text-secondary-content  hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium">เข้าสู่ระบบ</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };

export default Navbaruser;

